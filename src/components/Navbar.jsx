import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

const Navbar = () => {
  const { user } = useContext(AuthContext);
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const navigate = useNavigate();
  return (
    <>
      <div className='w-full flex justify-between items-center font-semibold'>

        <div className='flex items-center gap-2'>

          <img onClick={() => { navigate(-1) }} className="w-8 bg-black p-2 rounded-2xl cursor-pointer" src={assets.arrow_left} alt="" />
          <img onClick={() => { navigate(1) }} className="w-8 bg-black p-2 rounded-2xl cursor-pointer" src={assets.arrow_right} alt="" />

        </div>

        <div className='flex items-center gap-4'>
          <a className="bg-white text-black text-[15px] px-4 py-1 rounded-2xl hidden md:block cursor-pointer" href={BACKEND_URL + "/about/devinfo/"} target="_blank" rel="noopener noreferrer">
            Developer
          </a>
          <a className='bg-black py-1 px-3 rounded-2xl text-[15px] cursor-pointer' href={BACKEND_URL} target="_blank" rel="noopener noreferrer">Django App</a>
          {(user) ? <p className='bg-blue-500 text-black w-7 h-7 rounded-full flex items-center justify-center cursor-pointer' onClick={() => { navigate("/profile") }}>{user.username.slice(0, 2).toUpperCase()} </p> : <p className='bg-white text-black text-[15px] px-4 py-1 rounded-2xl cursor-pointer' onClick={() => { navigate("/login") }}>Login</p>}
        </div>
      </div>


    </>
  )
}

export default Navbar