import React, { useContext, useState, useEffect } from 'react'
import Navbar from './Navbar'
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { BackendContext } from '../context/BackendContext';
import DisplayInfo from './DisplayInfo';
import { assets } from '../assets/assets';
import DisplayList from './DisplayList';
const DisplayLikedPlaylists = () => {

  const [likedPlaylists, setLikedPlaylists] = useState([]);
  const {axiosInstance, user} = useContext(AuthContext);
  const {BACKEND_URL} = useContext(BackendContext);
  const navigate = useNavigate();


  useEffect(()=>{
   const fetchLikedPlaylists = async () => {
    try {
      const response = await axiosInstance.get(
        `${BACKEND_URL}/api/saved-playlists/`
      );

      setLikedPlaylists(response.data);

    } catch (error) {
      console.error("Error fetching playlist: your are not auth to access this item", error);
    }
  };
  fetchLikedPlaylists();
  },[user]);

  return (
      <>

      <Navbar/>
      <DisplayInfo TopImage = {assets.favs} Type="favorite" Name="Your Liked Playlist" Desc = "Your favorite playlist are ready to play." Playlists={likedPlaylists.length} />

      <div className='grid grid-cols-3 sm:grid-cols-3 mt-10 mb-4 pl-2 text-[#a7a7a7]'>
            <p><b className='mr-4'>#</b>Title</p>
            <p>Created by</p>
            <p className='hidden sm:block'>Date Added</p>
        </div>
        <hr />
        {
            likedPlaylists.map((item, index)=>(
              <DisplayList loadFx = {()=>{navigate(`/album/${item.id}`);}} index = {index} Image  = {item.image} UserId = {item.user} Name = {item.name} key = {index} Playlists = {item.length}/>
            ))
        }

      </>
  )
}

export default DisplayLikedPlaylists