import React, { useContext, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PlaylistInfo from './PlaylistInfo';
import { AuthContext } from '../context/AuthContext';
import { BackendContext } from '../context/BackendContext';

const AddPlaylist = () => {
    
    const playlistName = useRef();
    const playlistURL = useRef();
    const [imageBase64, setimageBase64] = useState(null);
    const playlistDesc = useRef();
    const global = useRef();
    const navigate = useNavigate();
    const {axiosInstance, user} = useContext(AuthContext);
    const {BACKEND_URL} = useContext(BackendContext);

    const createPlaylist = async()=>{
       try {
        if (user){

          const data = {name: playlistName.current.value, desc: playlistDesc.current.value, showglobal: global.current.checked, imageURL: playlistURL.current.value, imageB: imageBase64}
          if ((data.imageURL || data.imageB) && data.name && data.desc){
            const response = await axiosInstance.post(`${BACKEND_URL}/api/playlists/`, data);
            if (response.status == 200){
              navigate("/");
            }
          }
          else{
            throw new Error("Please fill all the details");
          }
          
        } 
        else{
          throw new Error("user is not authenticated");
          
        }
      }
        catch (error) {
          console.error("error: ", error);
        }
    }

  return (
    <>
     <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
        <div className="bg-white dark:bg-[#1e1e1e] rounded-xl w-[550px] shadow-lg relative p-4">
            <button onClick={()=>{navigate(-1)}} className="absolute top-1 right-3 text-gray-600 cursor-pointer hover:text-black dark:text-gray-400 dark:hover:text-red-500">
            ✕
            </button>
            
        <div className='flex flex-col '>
            <PlaylistInfo Title={"Add Playlist"} playlistName={playlistName} playlistDesc={playlistDesc} playlistURL={playlistURL} global={global} setimageBase64 = {setimageBase64}/>
            <button className='cursor-pointer bg-white text-black rounded-2xl px-5 py-1 my-3 mx-50' onClick={createPlaylist}>
                create
            </button>
        </div>
            
        </div>
    </div>
    </>
  )
}

export default AddPlaylist