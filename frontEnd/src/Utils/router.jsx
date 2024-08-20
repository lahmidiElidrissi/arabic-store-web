import { createBrowserRouter } from "react-router-dom";
import Root from "../componants/Root";
import Home from "../componants/Home";
import Shop from "../componants/Shop";
import ProductPage from "../componants/ProductPage";
import Card from "../componants/Card";
import Login from "../componants/Login";
import GoogleCallback from "../componants/GoogleCallback";
import OrderPage from "../componants/OrderPage";

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
        element: <Login />,
      },
      {
        path: "/googleCallBack",
        element: <GoogleCallback />,
      },
      {
        path: "/order",
        element: <OrderPage />,
      },
    ]
  },
]);

