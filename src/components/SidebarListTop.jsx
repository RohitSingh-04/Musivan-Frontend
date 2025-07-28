import React, { useContext } from 'react'
import { assets } from '../assets/assets';
import { PlayerContext } from '../context/PlayerContext';

const SidebarListTop = ({ListHeading, ListIcon, likes, Followers, onClick = null} ) => {

    const {setshuffleState, setloopState, setplayFrom, PlayState, shuffleState, loopState} = useContext(PlayerContext);
  return (
    <>
                    <div className='flex flex-row items-center w-full justify-between'>
                        <img onClick={onClick} className='rounded sm:w-[50px] mr-5' src={ListIcon} alt="" />
                        <div className='w-full flex flex-row items-center justify-around'>
                        <h1 onClick={onClick}>{ListHeading}</h1>
                        <div className='flex flex-row items-center justify-around'>
                            <img className='w-4 cursor-pointer mx-3' src={assets.shuffle_icon} alt="shuffle" title='shuffle' onClick={()=>{
                                setshuffleState(!shuffleState);
                                (loopState)? setloopState(false): ""
                            }}/>
                            <img className='w-4 cursor-pointer mx-3' src={assets.loop_icon} alt="loop" title='loop' onClick={()=>{
                                setloopState(!loopState); 
                                (shuffleState)?setshuffleState(false):""
                            }}/>
                        </div>
                        </div>
                        <img className='w-5 cursor-pointer ' onClick={()=>{setplayFrom(PlayState.Random); setPlaylistData(null); setcurrentPlaying(0); }} src={assets.cross} alt="" title='close' />
                    </div>{
                    (likes >= 0)?
                    <p className='font-light'>{likes} likes</p>:
                    (Followers >= 0)?
                    <p className='font-light'>{Followers} Followers</p>:""
                    }
                            </>
                    
  )
}

export default SidebarListTop