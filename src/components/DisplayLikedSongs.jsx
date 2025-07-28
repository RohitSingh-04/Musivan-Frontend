import React, { useContext, useEffect, useState } from 'react'
import Navbar from './Navbar'
import { AuthContext } from '../context/AuthContext';
import { PlayerContext } from '../context/PlayerContext';
import { BackendContext } from '../context/BackendContext';
import { assets } from '../assets/assets';
import DisplayInfo from './DisplayInfo';
import DisplayList from './DisplayList';

const DisplayLikedSongs = () => {

  const [likedSongs, setLikedSongs] = useState([]);

  const {axiosInstance, user} = useContext(AuthContext);
  const {loadLiked, } = useContext(PlayerContext);
  const {BACKEND_URL} = useContext(BackendContext);
  
  useEffect(()=>{
   const fetchLikedSongs = async () => {
    try {
      const response = await axiosInstance.get(
        `${BACKEND_URL}/api/favs/`
      );
      setLikedSongs(response.data);

    } catch (error) {
      console.error("Error fetching playlist: your are not auth to access this item", error);
    }
  };
  fetchLikedSongs();
  },[user]);

  return (
    <>
        <Navbar/>
        <DisplayInfo TopImage = {assets.favs} Type="favorite" Name="Your Liked Songs" Desc = "Your favorite songs are ready to play." Songs={likedSongs.length} />
        
        <div className='grid grid-cols-3 sm:grid-cols-3 mt-10 mb-4 pl-2 text-[#a7a7a7]'>
            <p><b className='mr-4'>#</b>Title</p>
            <p>Album</p>
            <p className='hidden sm:block'>Date Added</p>
        </div>
        <hr />
        {
            likedSongs.map((item, index)=>(
              <DisplayList loadFx = {()=>{loadLiked(likedSongs, index);}} index = {index} Image  = {item.song.imageurl} Name = {item.song.name} Album = {item.song.album} key = {index}/>
            ))
        }
    </>
  )
}

export default DisplayLikedSongs