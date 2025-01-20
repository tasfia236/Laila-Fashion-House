import { createBrowserRouter } from 'react-router-dom'
import { MainLayout } from '../Layouts/MainLayout'
import Home from '../Components/Home/Home'
//import UserDashboard from "../Pages/Dashboard/User/UserDashboard";
//import AdminDashboard from "../Pages/Dashboard/Admin/AdminDashboard";
import SignIn from '../Components/Auth/SignIn'
import SignUp from '../Components/Auth/SignUp'
import AllProductsNewpage from '../Components/AllProducts/AllProductsNewPage'
import SingleProductDetails from '../Components/SingleProductDetails/SingleProductDetails'

import Dashboard from '../Layouts/Dashboard'
import Profile from '../Components/Dashboard/Profile/Profile'
import AllUser from '../Components/Dashboard/Admin/ManageUser/AllUser'
import AddProduct from '../Components/Dashboard/Admin/AddProducts/AddProduct'
import ManageProduct from '../Components/Dashboard/Admin/ManageProoduct/ManageProduct'
import { UpdateProduct } from '../Components/Dashboard/Admin/ManageProoduct/UpdateProduct'

const routes = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: '/',
        element: <Home></Home>
      },
      // {
      //     path: '/all-product',
      //     element: <Products></Products>
      // },
      {
        path: '/product',
        element: <AllProductsNewpage />
      },
      {
        path: '/product/:id',
        element: <SingleProductDetails />
      },
      {
        path: '/signin',
        element: <SignIn></SignIn>
      },
      {
        path: '/signup',
        element: <SignUp></SignUp>
      }

      //      {
      //     path: '/user-dashboard',
      //     element: <UserDashboard></UserDashboard>,
      // },
      // {
      //     path: '/admin-dashboard',
      //     element: <AdminDashboard></AdminDashboard>,
      // },
      // {
      //     path: '/admin-dashboard/profile',
      //     element: <Profile></Profile>
      // }
    ]
  },
  {
    path: '/dashboard',
    element: <Dashboard></Dashboard>,
    children: [
      {
        path: 'profile',
        element: <Profile></Profile>
      },
      //Admin Dashboard
      {
        path: 'allusers',
        element: <AllUser></AllUser>
      },
      {
        path: 'addproduct',
        element: <AddProduct></AddProduct>
      },
      {
        path: 'manageproduct',
        element: <ManageProduct></ManageProduct>
      },
      {
        path: 'manageproduct/dashboard/updateproduct/:id',
        element: <UpdateProduct></UpdateProduct>,
        loader: ({ params }) => fetch(`http://localhost:4000/product/data/${params.id}`)
      }
    ]
  }
])

export default routes
