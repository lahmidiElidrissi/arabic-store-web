import { Outlet, useLocation } from "react-router-dom";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../Utils/cardSlice";
import axiosHttpClient from "../Utils/api";

export default function RootLayout() {

  const dispatch = useDispatch();
  const status = useSelector((state) => state.card.status);
  const error = useSelector((state) => state.card.error);
  const location = useLocation();

  useEffect(() => {
    const handleNavigation = () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth' // for smooth scrolling
      });
    };
    handleNavigation(); 
  }, [location]); 

  
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }

    // add login request
    if ( localStorage.getItem("access_token") == null ) {
      getTokenWithGuestUser();
    }
    
  }, [status]);

  async function getTokenWithGuestUser(){
    const response = await axiosHttpClient.get(`${import.meta.env.VITE_URL_BACKEND}/create/guest/user`);
    response.data.token && localStorage.setItem("access_token", response.data.token);
    localStorage.setItem("isAuth", false)
    localStorage.setItem("isAdmin" , false);
    await axiosHttpClient.get(
      `${import.meta.env.VITE_URL_BACKEND_2}/sanctum/csrf-cookie`
    );
  }
  

  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}
