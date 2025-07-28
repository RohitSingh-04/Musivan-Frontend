import React, { useContext, useEffect, useState } from 'react'
import Navbar from './Navbar'
import { useParams } from 'react-router-dom'
import { assets } from '../assets/assets'
import { AuthContext } from '../context/AuthContext'
import { BackendContext } from '../context/BackendContext'
import { PlayerContext } from '../context/PlayerContext'
import { ArtistFollowContext } from '../context/ArtistFollowContext'

import DisplayInfo from './DisplayInfo'
import DisplayList from './DisplayList'
const DisplayArtist = () => {
    const {id} = useParams();
    const [Artist, setArtist] = useState({});
    const {axiosInstance} = useContext(AuthContext);
    const {BACKEND_URL} =  useContext(BackendContext);
    const {loadArtist} = useContext(PlayerContext);
    const { setcurrentArtistFollow, Followed } = useContext(ArtistFollowContext);

    useEffect(()=>{

        const fetchArtist = async (id)=>{
            try {
                const response = await axiosInstance.get(
                    `${BACKEND_URL}/api/artists/${id}`
                );
                setArtist(response.data);
                } catch (error) {
                console.error("Error fetching playlist:", error);
                }
        };  
        
        fetchArtist(id);

    }
        , [id]

    )

  return (
    <>
    <Navbar/>
    <DisplayInfo TopImage={(Artist.image===null || Artist.image==="")?assets.default_artist:Artist.image}  Type="Artist" Name={Artist.name} Desc="" Followers = {Artist.followers} Songs = {Artist.songs_count} ObjectId={id}/>
    
    <div className='grid grid-cols-3 sm:grid-cols-3 mt-10 mb-4 pl-2 text-[#a7a7a7]'>
        <p><b className='mr-4'>#</b>Art</p>
        <p>Title</p>
        <p className='hidden sm:block'>Date Added</p>
    </div>
    <hr />
    {
        (Artist.songs)?
        Artist.songs.map((item, index)=>(

            <DisplayList index = {index} Image = {item.imageurl} Name = {item.name} Album = {item.album} loadFx={()=>{loadArtist(Artist, index); setcurrentArtistFollow(Followed)}}/>
            
        )):""
    }
    
    </>
  )
}

export default DisplayArtist