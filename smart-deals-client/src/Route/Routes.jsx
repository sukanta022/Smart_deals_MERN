import { createBrowserRouter } from "react-router";
import RootLayout from "../Layout/RootLayout";
import Login from "../Pages/Login";


import Register from "../Pages/Register";
import AllProductsPage from "../Pages/AllProductsPage";
import PrivateRoute from "./PrivateRoutes";
import MyProducts from "../Pages/MyProducts";
import HomePage from "../Pages/HomePage";
import ProductDetails from "../Pages/ProductDetails";
import MyBids from "../Pages/MyBids";
export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children : [
        {
          index: true,
          Component: HomePage
        },
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
          element: <PrivateRoute><MyBids></MyBids></PrivateRoute>
        },
        {
          path: '/myProducts',
          element: <PrivateRoute><MyProducts></MyProducts></PrivateRoute>
        },
        {
          path: '/productDetails/:id',
          loader: ({params}) => fetch(`http://localhost:3000/products/${params.id}`),
          Component: ProductDetails
        }
    ]
  },
]);