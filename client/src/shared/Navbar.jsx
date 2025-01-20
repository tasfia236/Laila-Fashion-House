import { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo2.png';
import { AuthContext } from '../Providers/AuthProviders';
import { NavLink } from "react-router-dom";


export default function Navbar() {

  const { user, logout } = useContext(AuthContext);
  //console.log(user);

  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem('token') !== null;
  // const role = localStorage.getItem('role');

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const NavList = <>
    <li>
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive ? "text-pink700 font-bold" : ""
        }
      >
        Home
      </NavLink>
    </li>
    <li>
      <NavLink
        to="/product"
        className={({ isActive }) =>
          isActive ? "text-pink700 font-bold" : ""
        }
      >
        Product
      </NavLink>
    </li>
    <li>
      <NavLink
        to="/contact Us"
        className={({ isActive }) =>
          isActive ? "text-pink700 font-bold" : ""
        }
      >
        Contact Us
      </NavLink>
    </li>
  </>

  const NavList2 = <>
    <li>
      <Link to={`/dashboard/profile`}>
        Dashboard
      </Link>
    </li>
    <li><button onClick={handleLogout}>Logout</button></li>
  </>

  return (
    <div className="shadow-lg text-black navbar">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="lg:hidden btn btn-ghost">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="z-[1] mt-3 p-2 w-52 dropdown-content menu menu-sm">
            {NavList}
          </ul>
        </div>
        <ul className="lg:flex hidden px-1 menu menu-horizontal">
          {NavList}
        </ul>
      </div>

      {/* Center: LOGO */}
      <div className="navbar-center">
        <a href='/' className="text-xl btn btn-ghost">
          <img src={logo} className='h-[60px] lg:h-[70px]' />
          <p className="absolute -mr-28 -mb-14 font-bold text-gray-800 text-lg dark:text-white"> </p>
          {/* <span className="absolute -ml-28 text-pink700">Fashion</span> House */}
          {/* <div className='flex'>
            <img src={logo} className='h-[100px] lg:h-[45px]' />
            <p className="absolute -mb-12 -ml-28 font-bold text-gray-800 text-lg dark:text-white">
              <span className="text-pink700">Fashion</span> House

            </p>
          </div> */}
        </a>
      </div>

      {/* End: Search, Icon, Auth */}
      <div className="flex-none gap-2 navbar-end">
        <div className="flex items-center navbar-center">
          {/* <div className="form-control">
            <input type="text" placeholder="Search" className="input-bordered w-24 md:w-auto input" />
          </div> */}
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="lg:hidden avatar btn btn-circle btn-ghost">
              <div
                className="bg-gray-300 dark:bg-gray-600 rounded-full w-10 h-10 cursor-pointer overflow-hidden"
                title="User Profile"
              >
                <img
                  src="https://via.placeholder.com/40"
                  alt="User Avatar"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="z-[1] bg-base-100 shadow mt-3 p-2 rounded-box w-52 dropdown-content menu menu-sm">
              {isLoggedIn && (
                <>
                  {NavList2}
                </>
              )}
              {!user && <>
                <div className="flex justify-around gap-2">
                  <Link to='/signin'>
                    <button className="bg-[#7dd3fc] btn btn-sm">Sign In</button>
                  </Link>
                  <Link to='/signup'>
                    <button className="bg-[#f9a8d4] btn btn-sm">Sign Up</button>
                  </Link>
                </div>
              </>}
            </ul>
          </div>
          <ul className="lg:flex hidden px-1 menu menu-horizontal">
            {isLoggedIn && (
              <>
                {NavList2}
              </>
            )}
          </ul>
          {!user && <>
            <div className="lg:flex gap-3 hidden">

              <Link to='/signin'>
                <button className="bg-[#be185d] text-white btn btn-sm">Sign In</button>
              </Link>
              <Link to='/signup'>
                <button className="bg-transparent hover:bg-[#be185d] text-black hover:text-white btn btn-sm">Sign Up</button>

              </Link>
            </div>
          </>}
        </div>
      </div>
    </div >
  )
}
