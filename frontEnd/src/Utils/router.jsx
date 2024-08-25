import { createBrowserRouter } from "react-router-dom";
import Root from "../componants/Root";
import Home from "../componants/Home";
import Shop from "../componants/Shop";
import ProductPage from "../componants/ProductPage";
import Card from "../componants/Card";
import Login from "../componants/Login";
import GoogleCallback from "../componants/GoogleCallback";
import OrderPage from "../componants/OrderPage";
import OrderComplated from "../componants/orderComplated";
import IsGuest from "../componants/IsGuest";
import IsAdmin from "../componants/IsAdmin";
import Dashboard from "../componants/Dashboard/Dashboard";
import Products from "../componants/Dashboard/Products";
import ProductPageDashboard from "../componants/Dashboard/ProductPageDashboard";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children:[
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/shop",
        element: <Shop />,
      },
      {
        path: "/product/:id",
        element: <ProductPage />,
      },
      {
        path: "/card",
        element: <Card />,
      },
      {
        path: "/login",
        element: <IsGuest OriginalComponent={Login}  />,
      },
      {
        path: "/googleCallBack",
        element: <GoogleCallback />,
      },
      {
        path: "/order",
        element: <OrderPage />,
      },
      {
        path: "/order/complated",
        element: <OrderComplated />,
      },
    ]
  },
  {
    path: "/dashboard",
    element: <IsAdmin OriginalComponent={Dashboard} />,
    children:[
      {
        path: "/dashboard/products",
        element: <Products />,
      },
      {
        path: "/dashboard/products/edit/:id",
        element: <ProductPageDashboard />,
      }
    ],
  }
]);

