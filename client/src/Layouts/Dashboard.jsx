import { useContext } from 'react'
import { AuthContext } from '../Providers/AuthProviders'
import { NavLink, Outlet } from 'react-router-dom'
import {
  FaHome,
  FaShoppingBag,
  FaStar,
  FaUser,
  FaUserFriends,
  FaShoppingCart
} from 'react-icons/fa'
import { FiPlusSquare } from 'react-icons/fi'
import { MdOutlineProductionQuantityLimits, MdLogout } from 'react-icons/md'
import Navbar from '../Shared/Navbar'

export default function Dashboard () {
  const { user, logout } = useContext(AuthContext)

  const adminLinks = (
    <>
      <li>
        <h1 className='font-bold uppercase'>{user?.role} Dashboard</h1>
      </li>
      <li>
        <NavLink to='/dashboard/profile'>
          <FaUser />
          Profile
        </NavLink>
      </li>
      <li>
        <NavLink to='/dashboard/allusers'>
          <FaUserFriends></FaUserFriends>
          All Users
        </NavLink>
      </li>
      <li>
        <NavLink to='/dashboard/addproduct'>
          <FiPlusSquare />
          Add Product
        </NavLink>
      </li>
      <li>
        <NavLink to='/dashboard/manageproduct'>
          <MdOutlineProductionQuantityLimits />
          Manage Product
        </NavLink>
      </li>
      <li>
        <NavLink to='/dashboard/allorder'>
          <FaShoppingBag></FaShoppingBag>
          All Order
        </NavLink>
      </li>
    </>
  )

  const userLinks = (
    <>
      <li>
        <h1 className='font-bold uppercase'>{user?.role} Dashboard</h1>
      </li>
      <li>
        <NavLink to='/dashboard/profile'>
          <FaUser></FaUser>
          Profile
        </NavLink>
      </li>
      <li>
        <NavLink to='/dashboard/mywishlist'>
          <FaStar></FaStar>
          My WishList
        </NavLink>
      </li>
      <li>
        <NavLink to='/dashboard/myoderlist'>
          <FaShoppingCart></FaShoppingCart>
          My OrderList
        </NavLink>
      </li>
    </>
  )

  let links
  if (user?.role === 'admin') {
    links = adminLinks
  } else {
    links = userLinks
  }

  return (
    <div className=''>
      <Navbar></Navbar>
      <div className='drawer lg:drawer-open'>
        <input type='checkbox' id='my-drawer-2' className='drawer-toggle' />
        <div className='flex-none drawer-content'>
          <label
            htmlFor='my-drawer-2'
            className='lg:hidden m-2 p-2 btn btn-ghost btn-square'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              className='inline-block w-6 h-6 stroke-current'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M4 6h16M4 12h16M4 18h16'
              ></path>
            </svg>
          </label>
          <div className='bg-gradient-to-br from-[#fdfdfd] to-[#6e6e6e] p-5 min-h-screen'>
            <Outlet></Outlet>
          </div>
        </div>
        <div className='pt-16 lg:pt-0 drawer-side'>
          <label
            htmlFor='my-drawer-2'
            aria-label='close sidebar'
            className='drawer-overlay'
          ></label>
          <ul className='bg-base-200 bg-gradient-to-br from-[#ead7fd] to-[#c899f5] p-4 w-64 min-h-full menu'>
            {links}
            <div className='divider'></div>
            <li>
              <NavLink to='/'>
                <FaHome /> Home
              </NavLink>
            </li>
            <li>
              <button
                onClick={logout}
                className='bg-red-600 hover:bg-red-700 focus:bg-red-700 px-4 py-2 rounded-md focus:outline-none'
              >
                <MdLogout /> Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
