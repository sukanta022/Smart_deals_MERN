import { createBrowserRouter } from "react-router";
import RootLayout from "../Layout/RootLayout";
import Login from "../Pages/Login";


import Register from "../Pages/Register";
import AllProductsPage from "../Pages/AllProductsPage";
import PrivateRoute from "./PrivateRoutes";
import MyProducts from "../Pages/MyProducts";
export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children : [
        {
            path: '/login',
            Component: Login
        },
        {
          path: '/register',
          Component: Register
        },
        {
          path: '/allProducts',
          Component: AllProductsPage
        },
        {
          path: '/myBids',
          element: <PrivateRoute><AllProductsPage></AllProductsPage></PrivateRoute>
        },
        {
          path: '/myProducts',
          element: <PrivateRoute><MyProducts></MyProducts></PrivateRoute>
        }
    ]
  },
]);