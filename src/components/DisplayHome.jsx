import React, { useContext, useEffect, useState } from 'react'
import Navbar from './Navbar'
import { albumsData, songsData } from '../assets/assets'
import AlbumItem from './AlbumItem'
import SongsItem from './SongsItem'
import NavHomeFilters from './NavHomeFilters'
import ArtistsItem from './ArtistsItem'
import { PlayerContext } from '../context/PlayerContext'
import { BackendContext } from '../context/BackendContext'


const DisplayHome = () => {

  const [artistData, setartistData] = useState([]);
  const [mostLiked, setmostLiked] = useState([]);
  const [mostLikedPlaylist, setmostLikedPlaylist] = useState([]);
  const {BACKEND_URL} = useContext(BackendContext);
  useEffect(()=>{

    const fetchTopArtists = async()=>{
      
      const response = await fetch(`${BACKEND_URL}/api/artists/`);

      if (!response.ok){
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setartistData(data);

    }

    const fetchMostLiked = async()=>{
      const response = await fetch(`${BACKEND_URL}/api/most-liked/`);

      if (!response.ok){
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setmostLiked(data);
    }

    const fetchMostLikedPlaylists=async()=>{
      const response = await fetch(`${BACKEND_URL}/api/most-liked-playlist/`);

      if (!response.ok){
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setmostLikedPlaylist(data);
    }

    fetchTopArtists();
    fetchMostLiked();
    fetchMostLikedPlaylists();
  }, []);

  return (
    <>
    <Navbar/>
    <NavHomeFilters/>
    <div className='mb-4'>
        <h1 className='my-5 font-bold text-2xl'>Featured Charts</h1>
        <div className='flex overflow-auto '>
        {mostLikedPlaylist.map((item, index)=>(<AlbumItem key={index} name={item.name} image={item.image} id={item.id} desc={item.desc}/>))}
        </div>

    </div>

    <div className='mb-4'>
        <h1 className='my-5 font-bold text-2xl'>Most Liked Songs</h1>
        <div className='flex overflow-auto '>
        {mostLiked.map((item, index)=>(<SongsItem key={index} name={item.name} image={item.imageurl} id={item.id} album={item.album}/>))}
        </div>

    </div>

    <div className='mb-4'>
        <h1 className='my-5 font-bold text-2xl'>Most Followed Artists</h1>
        <div className='flex overflow-auto '>
        {artistData.map((item, index)=>(<ArtistsItem key={index} name={item.name} image={item.image} id={item.id} />))}
        </div>

    </div>
    </>
  )
}

export default DisplayHome