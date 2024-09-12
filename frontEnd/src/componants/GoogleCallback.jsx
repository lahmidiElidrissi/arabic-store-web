import { useEffect } from "react";
import axiosHttpClient from "../Utils/api";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";
import { emptyCard } from "../Utils/cardSlice";
import { useDispatch } from "react-redux";
import Toastify from 'toastify-js'


const GoogleCallback = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const code = params.get('code');

        axiosHttpClient.get(`${import.meta.env.VITE_URL_BACKEND}/login/google/callback?code=${code}`)
            .then(response => {
                // set the access token
                localStorage.setItem('access_token', response.data.token);
                // set the auth is true
                localStorage.setItem('isAuth', true);
                // set isAdmin true or false
                localStorage.setItem("isAdmin", response.data.isAdmin)
                // empty card for reload products
                dispatch(emptyCard());

                Toastify({
                    text: "تم تسجيل الدخول بنجاح بواسطة جوجل",
                    position: "center",
                    style : {
                        background: "linear-gradient(90deg, rgba(22,200,22,1) 0%, rgba(38,170,3,1) 43%, rgba(36,213,0,1) 100%)",
                        marginTop: "10vh",
                        width: "70%",
                    },
                }).showToast();

                navigate('/');
            })
            .catch(error => {
                console.error('Google login failed', error);
            });
            
    }, []);

    return ( <Loader /> );
};

export default GoogleCallback;
