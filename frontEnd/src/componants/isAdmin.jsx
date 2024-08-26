import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Toastify from 'toastify-js'

export default function isAdmin({ OriginalComponent }) {

    const isAdmin = localStorage.getItem("isAdmin");
    const navigate = useNavigate();

    useEffect(() => {
        if (isAdmin == null || isAdmin == "false" || isAdmin == "undefined") {
            navigate('/');
            Toastify({
                text: "ليس لديك صلاحية الدخول",
                className: "text-1xl",
                position: "center",
                style: {
                    background: "linear-gradient(107.2deg, rgb(150, 15, 15) 10.6%, rgb(247, 0, 0) 91.1%)",
                    marginTop: "10vh",
                    width: "70%",
                },
            }).showToast();
        }
    }, [isAdmin]);

    if (isAdmin === null || isAdmin === "true") {
        return <OriginalComponent />;
    }

    return null;

}
