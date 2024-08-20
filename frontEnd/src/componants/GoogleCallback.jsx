import { useEffect } from "react";
import axiosHttpClient from "../Utils/api";
import { useNavigate } from "react-router-dom";
import Loader from "./loader";
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
                // empty card for reload products
                dispatch(emptyCard());

                Toastify({
                    text: "تم تسجيل الدخول بنجاح بواسطة جوجل",
                    position: "center",
                    style : {
                        background: "linear-gradient(to right, rgb(182, 244, 146), rgb(51, 139, 147))",
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
