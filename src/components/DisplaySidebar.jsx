import React from 'react'
import Sidebar from './Sidebar'
import Navbar from './Navbar';

const DisplaySidebar = () => {
  return (
    <>
    <Navbar />
    <div className='flex flex-row justify-center lg:hidden'>
    <Sidebar/>
    </div>
    </>
  )
}

export default DisplaySidebar;