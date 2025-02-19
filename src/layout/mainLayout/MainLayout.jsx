import React from 'react'
import Navbar from '../../share/NavBar/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../../share/Footer/Footer'

export default function MainLayout() {
  return (
    <div className='max-w-7xl mx-auto'>
        <Navbar></Navbar>
        <Outlet></Outlet>
        <Footer></Footer>
    </div>
  )
}
