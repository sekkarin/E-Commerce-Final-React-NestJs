import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/home/Home";

import SignUp from "../components/SignUp";
import Signin from "../components/Signin";
import UpdateProfile from "../pages/dashboard/UpdateProfile";
import ProtectedRoute from "../pages/Routes/ProtectRoute";
import Admin from "../pages/dashboard/Dashbord";
import AddProduct from "../pages/dashboard/addProduct";
import User from "../pages/dashboard/admin/User";
import Dashboard from "../pages/dashboard/admin/dashboard";
import ProductsList from "../pages/dashboard/ProductsList";
import  ProductList from '../pages/shop/ProductList'
import UpdateProduct from "../pages/dashboard/UpdateProduct";
import UsersList from "../pages/dashboard/Userslist";
import UserProduct from "../pages/dashboard/UpdateUser";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/shop",
        element: (
          <ProtectedRoute>
            <ProductList />
          </ProtectedRoute>
        ),
      },
      {
        path: "/update-profile",
        element: <UpdateProfile />,
      },
      {
        path: "/signin",
        element: <Signin />,
      },
    ],
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "dashboard",
    element: (
      <ProtectedRoute>
        <Admin />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "users",
        element: <User />,
      },
      {
        path: "admin",
        element: <Dashboard />,
      },
      {
        path: "addProduct",
        element: <AddProduct />,
      },
      {
        path: "product",
        element: <ProductsList />,
      },
      {
        path: "updateProduct",
        element: <UpdateProduct />,
      },
      {
        path: "usersList",
        element: <UsersList />,
      },
      {
        path: "userProduct",
        element: <UserProduct />,
      },
    ],
  },
]);

export default router;
