import React from 'react'
import { useLocation } from 'react-router-dom';

export default function OrderComplated() {
  const url = useLocation().state?.url;
  window.location.href = url;
  return (
    <div className='text-3xl m-5'>orderComplated</div>
  )
}
