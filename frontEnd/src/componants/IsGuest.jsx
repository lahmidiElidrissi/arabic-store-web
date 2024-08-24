import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function IsGuest({ OriginalComponent }) {
  const isAuth = localStorage.getItem("isAuth");
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuth !== null && isAuth !== "false") {
      navigate('/');
    }
  }, [isAuth, navigate]);

  if (isAuth === null || isAuth === "false") {
    return <OriginalComponent />;
  }

  return null;
}
