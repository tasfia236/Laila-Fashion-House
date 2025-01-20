import { useContext, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2';
import bgImg from "../../assets/pic1.jpg"
import logo from '../../assets/logo.jpg';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import { AuthContext } from '../../Providers/AuthProviders';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { app } from '../../firebase/firebase';

export default function SignIn() {
  const { login } = useContext(AuthContext);
  // const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  const location = useLocation();
  const googleProvider = new GoogleAuthProvider();
  const auth = getAuth(app);

  const from = location.state?.from?.pathname || "/";

  const handleLogin = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const data = { email, password }
    //  console.log(data);

    setLoading(true);
    axiosPublic.post('/auth/signin', data)
      .then((res) => {
        const token = res.data.token;
        if (token) {
          login(token); // Pass the token to the login function
          Swal.fire({
            title: 'Login Successful.',
            showClass: {
              popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
              popup: 'animate__animated animate__fadeOutUp'
            }
          });
          navigate(from, { replace: true });
        } else {
          console.error('No token received:', res);
        }
      })
      .catch((err) => {
        console.error('Login failed:', err);
        setLoading(false);
      });

  }

  const handleGoogleClick = () => {
    signInWithPopup(auth, googleProvider)
      .then(result => {
        console.log(result);
        const userInfo = {
          email: result.user?.email,
          username: result.user?.displayName,
          photo: result.user?.photoURL,
          password: '123456',
          role: 'user'
        }
        axiosPublic.post('/auth/signin', userInfo)
          .then(res => {
            console.log(res.data);
            login(res.data.token);
            if (res.data.token.success) {
              Swal.fire({
                title: "User Logged In Successfully",
                icon: "success",
                showClass: {
                  popup: `
          animate__animated
          animate__fadeInUp
          animate__faster
        `
                },
                hideClass: {
                  popup: `
          animate__animated
          animate__fadeOutDown
          animate__faster
        `
                }
              });
              navigate(location?.state ? location.state : '/')
            }
          })
      })
      .catch(error => {
        console.error(error);
      })
  }

  return (
    <div>
      <div className='flex justify-center items-center min-h-[calc(100vh-306px)]'>
        <div className='flex bg-white shadow-lg mx-auto mt-20 rounded-lg w-full max-w-sm lg:max-w-4xl overflow-hidden'>
          <div
            className='lg:block hidden bg-cover bg-center lg:w-1/2'
            style={{
              backgroundImage: `url(${bgImg})`,
            }}
          ></div>

          <div className='px-6 md:px-8 py-8 w-full lg:w-1/2'>
            <div className='flex justify-center mx-auto'>
              <img
                className='w-auto h-7 sm:h-8'
                src={logo}
                alt=''
              />
            </div>

            <p className='mt-3 text-center text-gray-600 text-xl'>
              Welcome back!
            </p>

            <div className='flex justify-center items-center hover:bg-gray-50 mt-4 border rounded-lg text-gray-600 transform transition-colors duration-300 cursor-pointer'>
              <div className='px-4 py-2'>
                <svg className='w-6 h-6' viewBox='0 0 40 40'>
                  <path
                    d='M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.045 27.2142 24.3525 30 20 30C14.4775 30 10 25.5225 10 20C10 14.4775 14.4775 9.99999 20 9.99999C22.5492 9.99999 24.8683 10.9617 26.6342 12.5325L31.3483 7.81833C28.3717 5.04416 24.39 3.33333 20 3.33333C10.7958 3.33333 3.33335 10.7958 3.33335 20C3.33335 29.2042 10.7958 36.6667 20 36.6667C29.2042 36.6667 36.6667 29.2042 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z'
                    fill='#FFC107'
                  />
                  <path
                    d='M5.25497 12.2425L10.7308 16.2583C12.2125 12.59 15.8008 9.99999 20 9.99999C22.5491 9.99999 24.8683 10.9617 26.6341 12.5325L31.3483 7.81833C28.3716 5.04416 24.39 3.33333 20 3.33333C13.5983 3.33333 8.04663 6.94749 5.25497 12.2425Z'
                    fill='#FF3D00'
                  />
                  <path
                    d='M20 36.6667C24.305 36.6667 28.2167 35.0192 31.1742 32.34L26.0159 27.975C24.3425 29.2425 22.2625 30 20 30C15.665 30 11.9842 27.2359 10.5975 23.3784L5.16254 27.5659C7.92087 32.9634 13.5225 36.6667 20 36.6667Z'
                    fill='#4CAF50'
                  />
                  <path
                    d='M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.7592 25.1975 27.56 26.805 26.0133 27.9758C26.0142 27.975 26.015 27.975 26.0158 27.9742L31.1742 32.3392C30.8092 32.6708 36.6667 28.3333 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z'
                    fill='#1976D2'
                  />
                </svg>
              </div>

              <span className='px-4 py-3 w-5/6 font-bold text-center'>
                <button type="button" onClick={handleGoogleClick}>Sign in with Google</button>
              </span>
            </div>

            <div className='flex justify-between items-center mt-4'>
              <span className='border-b w-1/5 lg:w-1/4'></span>

              <div className='text-center text-gray-500 text-xs hover:underline uppercase'>
                or login with email
              </div>

              <span className='dark:border-gray-400 border-b w-1/5 lg:w-1/4'></span>
            </div>
            <form onSubmit={handleLogin}>
              <div className='mt-4'>
                <label
                  className='block mb-2 font-medium text-gray-600 text-sm'
                  htmlFor='LoggingEmailAddress'
                >
                  Email Address
                </label>
                <input
                  id='email'
                  autoComplete='email'
                  name='email'
                  className='block bg-white focus:ring-opacity-40 px-4 py-2 border focus:border-blue-400 rounded-lg focus:ring focus:ring-blue-300 w-full text-gray-700 focus:outline-none'
                  type='email'
                />
              </div>

              <div className='mt-4'>
                <div className='flex justify-between'>
                  <label
                    className='block mb-2 font-medium text-gray-600 text-sm'
                    htmlFor='loggingPassword'
                  >
                    Password
                  </label>
                </div>

                <input
                  id='password'
                  autoComplete='password'
                  name='password'
                  placeholder='******'
                  className='block bg-white focus:ring-opacity-40 px-4 py-2 border focus:border-blue-400 rounded-lg focus:ring focus:ring-blue-300 w-full text-gray-700 focus:outline-none'
                  type='password'
                />
              </div>
              <div className='mt-6'>
                <button
                  type='submit'
                  className='bg-[#be185d] hover:bg-[#f9a8d4] hover:bg-gray-700 focus:ring-opacity-50 px-6 py-3 rounded-lg focus:ring focus:ring-gray-300 w-full font-medium text-sm text-white hover:text-neutral-950 capitalize tracking-wide transform transition-colors duration-300 focus:outline-none'
                >
                  Sign In
                </button>
              </div>
            </form>

            <div className='flex justify-between items-center mt-4'>
              <span className='border-b w-1/5 md:w-1/4'></span>

              <Link
                to='/signup'
                className='text-gray-500 text-xs hover:underline uppercase'
              >
                or sign up
              </Link>

              <span className='border-b w-1/5 md:w-1/4'></span>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}
