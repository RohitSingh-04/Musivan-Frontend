import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { PlayerContext } from '../context/PlayerContext';
import { AuthContext } from '../context/AuthContext';
import { PlaylistContext } from '../context/PlaylistContext';
import PopUp from './PopUp';
import { useNavigate } from 'react-router-dom';
import SleepTimer from './SleepTimer';

const Player = () => {
    const [showModal, setShowModal] = useState(false);
    const [showTimer, setShowTimer] = useState(false);

    const {track, seekBar, seekBg, playStatus, play, pause, time, next, previous, seekSong, isFav, like_song, VolumeSeekBar, VolumeSeekBg, changeVolume } = useContext(PlayerContext);
    const {user} = useContext(AuthContext);
    const navigate = useNavigate();
  return (<>
    <div className='h-[10%] bg-blacl flex justify-between items-center text-white px-4'>
        <div className='hidden lg:flex items-center gap-4'>
            <img className='w-12' src={track.imageurl} alt="" />
            <div>
                <p  dangerouslySetInnerHTML={{ __html: track.name }}></p>
                <p  dangerouslySetInnerHTML={{ __html: track.album }}></p>
            </div>
        </div>
        <div className='flex flex-col items-center gap-1 m-auto'>

            <div className='flex gap-4'>
                
                <img className='w-4 cursor-pointer lg:hidden' src={ assets.up } onClick={()=>{navigate('/sidebar')}} title="Sidebar"/>

                <img className='w-4 cursor-pointer' src={ (user)? (isFav)?assets.heart_fill:assets.heart_empty :assets.heart_empty } onClick={like_song} title="Like"/>

                <img className='w-4 cursor-pointer'  onClick={previous} src={assets.prev_icon} alt="" />
                {
                    playStatus?
                    <img className='w-4 cursor-pointer' onClick={pause} src={assets.pause_icon} alt="" />
                    :    
                    <img className='w-4 cursor-pointer' onClick={play} src={assets.play_icon} alt="" />
                }
            
                <img className='w-4 cursor-pointer' onClick={next} src={assets.next_icon} alt="" />
                
                <img className='w-4 cursor-pointer' src={assets.plus_icon} title='add to playlist' onClick={() => setShowModal(true)}/>

                <img className='w-4 cursor-pointer' src={assets.timer_icon} title='Sleep Timer' onClick={() => setShowTimer(true)}/>
                
            </div>
            <div className='flex items-center gap-5'>

                <p>{time.currentTime.minute}:{(time.currentTime.second<10)?"0"+time.currentTime.second:time.currentTime.second}</p>

                <div ref = {seekBg} onClick={seekSong} className='w-[60vw] max-w-[500px] bg-slate-50 rounded-full cursor-pointer'>
                    <hr ref = {seekBar} className='h-1 border-none w-0 bg-green-800 rounded-full'/>
                </div>
                <p>{time.totalTime.minute}:{(time.totalTime.second<10)?"0"+time.totalTime.second:time.totalTime.second}</p>
            </div>
        </div>
            <div className='hidden lg:flex items-center gap-2 opacity-75'>
                
                <img className="w-4" src={assets.volume_icon} alt="" />

                <div className='w-20 bg-slate-50 h-1 rounded cursor-pointer' ref={VolumeSeekBg} onClick={changeVolume}>
                    <hr ref = {VolumeSeekBar} className='h-1 border-none w-full bg-green-800 rounded-full'/>
                </div>

                <img className="w-4" src={assets.zoom_icon} alt="" />
            </div>

    </div>
    {showModal && <PopUp onClose={() => setShowModal(false)} />}
        {showTimer && <SleepTimer onClose={()=>setShowTimer(false)}/>}
                </>
  )
}

export default Player