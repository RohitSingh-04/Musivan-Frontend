import React, { useContext } from 'react'
import { PlayerContext } from '../context/PlayerContext'
import { songsData, assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';
const ArtistsItem = ({name, image, id}) => {
    const {loadSong} = useContext(PlayerContext);
    const navigate = useNavigate();
  return (
    <div onClick = {()=>{navigate(`/artist/${id}`)}} className='min-w-[180px] p-2 px-3 rounded cursor-pointer hover:bg-[#ffffff26]'>
        
        <img className='rounded-full sm:w-[150px]' src={(image===null || image==="")?assets.default_artist:image} alt="" />
        <p className='font-bold mt-2 mb-1 text-center'>{name}</p>

    </div>
  )
}

export default ArtistsItem;    