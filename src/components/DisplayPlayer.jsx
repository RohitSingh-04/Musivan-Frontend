import React, { useContext } from 'react'
import Navbar from './Navbar'
import { PlayerContext } from '../context/PlayerContext';
import Player from './Player';
import { useNavigate } from 'react-router-dom';

const DisplayPlayer = () => {
    const navigate = useNavigate();
    const {track, playStatus} = useContext(PlayerContext);
  return (
    <>
    <Navbar />
    <div className="min-h-screen flex items-center justify-center text-white">
      <div className='flex flex-col items-center justify-center'>
        <img
          className={`rounded-full w-80 rotating-image ${!playStatus ? 'paused' : ''}`}
          src={track.imageurl}
          alt="Track"
        />
        <h1 className='text-center text-2xl mt-4'  dangerouslySetInnerHTML={{ __html: track.name }}></h1>
        <h5 className='text-center text-sm text-gray-400 mt-1'  dangerouslySetInnerHTML={{ __html: track.album }}></h5> 
        <p  className='text-center text-sm text-gray-400 mt-1' > {track.artist.map((item, index)=>(
          <>
          <span key={index} className='cursor-pointer hover:text-white' onClick={()=>{navigate(`/artist/${item.id}`)}} dangerouslySetInnerHTML={{ __html: item.name }}></span>
          <span>{index < track.artist.length - 1 && ', '}</span>
          </>
        ))}</p>
      </div>
    </div>

    </>
  )
}

export default DisplayPlayer