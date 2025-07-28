import React, { useContext } from 'react'
import { PlayerContext } from '../context/PlayerContext'
const SongsItem = ({name, image, album, id}) => {
    const {getSong} = useContext(PlayerContext);
  return (
    
    <div onClick = {()=>{getSong(id)}} className='min-w-[180px] p-2 px-3 rounded cursor-pointer hover:bg-[#ffffff26]'>
        <img className='rounded sm:w-[150px]' src={image} alt="" />
        <p className='font-bold mt-2 mb-1'>{name}</p>
        <p className='text-slate-200 text-sm'>{album}</p>

    </div>
  )
}

export default SongsItem    