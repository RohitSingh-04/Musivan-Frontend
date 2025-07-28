import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Navigate } from 'react-router-dom';
import Navbar from './Navbar';
import { assets } from '../assets/assets';
import DetailItem from './DetailItem';

const DisplayUser = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      <Navbar />
      <div>
        <div className='flex flex-col items-center p-4'>
          <p
            className='bg-blue-400 text-black w-40 h-40 rounded-full flex items-center justify-center cursor-pointer text-8xl'
            onClick={() => navigate("/profile")}
          >
            {user.username.slice(0, 2).toUpperCase()}
          </p>
          <p className='text-5xl pt-2'>{user.username}</p>
        </div>

        <div className="bg-[#1e1e1e] p-8 rounded-2xl shadow-lg max-w-sm mx-auto my-10 border border-gray-700">
          <div className="flex items-center justify-center mb-6">
            <img className="w-10 h-10 mr-4" src={assets.details} alt="User details icon" />
            <h2 className="text-2xl font-bold text-white">User Details</h2>
          </div>
          <div className="space-y-3 text-gray-300">
            <DetailItem label="Age" value={user.age} />
            <DetailItem label="Gender" value={user.gender} />
            <DetailItem label="Email" value={user.email} />
            <DetailItem label="First Name" value={user.first_name} />
            <DetailItem label="Last Name" value={user.last_name} />
          </div>
        </div>

        <div className='flex flex-row items-center justify-around'>
          <button className='bg-white text-black rounded-4xl p-2 cursor-pointer' onClick={() => {navigate('/liked-songs')}}>
            Liked Songs
          </button>
          <button className='bg-white text-black rounded-4xl p-2 cursor-pointer' onClick={() => {navigate('/liked-playlist')}}>
            Liked Playlists
          </button>
        </div>

        <div className='flex items-center justify-center p-4 rounded'>
          <button className='rounded-4xl bg-red-500 hover:bg-red-400 p-2 cursor-pointer' title='logout' onClick={() => navigate('/logout')}>
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default DisplayUser;
