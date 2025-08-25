import React, { useContext, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import PlaylistInfo from './PlaylistInfo';
import { AuthContext } from '../context/AuthContext';

const AddPlaylist = () => {
    
    const playlistName = useRef();
    const playlistURL = useRef();
    const playlistDesc = useRef();
    const global = useRef();
    const navigate = useNavigate();
    const {axiosInstance, user} = useContext(AuthContext);

  return (
    <>
     <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
        <div className="bg-white dark:bg-[#1e1e1e] rounded-xl w-[550px] shadow-lg relative p-4">
            <button onClick={()=>{navigate(-1)}} className="absolute top-1 right-3 text-gray-600 cursor-pointer hover:text-black dark:text-gray-400 dark:hover:text-red-500">
            ✕
            </button>
            
        <div className='flex flex-col '>
            <PlaylistInfo Title={"Add Playlist"} playlistName={playlistName} playlistDesc={playlistDesc} playlistURL={playlistURL} global={global}/>
            <button className='cursor-pointer bg-white text-black rounded-2xl px-5 py-1 my-3 mx-50'>
                create
            </button>
        </div>
            
        </div>
    </div>
    </>
  )
}

export default AddPlaylist