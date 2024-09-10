import React, { useEffect } from 'react'
import Hero from './Hero'
import Promotion from './Promotion'
import Products from './Products'
import { useOutletContext } from 'react-router-dom'

export default function Home() {

  const {setNavIsOpen} = useOutletContext()
    useEffect(() => {
        setNavIsOpen(false)
    }, [])

  return (
    
    <>
    <Hero />
    <Promotion />
    <Products />
    </>
  )
}
