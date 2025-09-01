import React, { useContext, useEffect } from 'react'
import Sidebar from './components/Sidebar'
import Player from './components/Player'
import Display from './components/Display'
import { PlayerContext } from './context/PlayerContext'
import Login from './components/Login'
import Logout from './components/Logout'
import { Routes, Route } from 'react-router-dom'
import Register from './components/Register'

const App = () => {
  const { audioRef, track, endNext, Volume } = useContext(PlayerContext);

  // Set the real visible height on mobile devices
  useEffect(() => {
    const setAppHeight = () => {
      const appHeight = window.innerHeight;
      document.documentElement.style.setProperty('--app-height', `${appHeight}px`);
    };

    setAppHeight();
    window.addEventListener('resize', setAppHeight);
    return () => window.removeEventListener('resize', setAppHeight);
  }, []);

  return (
    <Routes>

      {/* Public Login Page */}
      <Route path="/login" element={<Login />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="/register" element={<Register/>}/>

      {/* Main App Layout */}
      <Route
        path="/*"
        element={
          <div className="bg-black" style={{ height: 'var(--app-height)' }}>
            <div className="h-[90%] flex">
              <div className='hidden lg:flex'>
                <Sidebar />
              </div>
              <Display />
            </div>
            <Player />
            <audio ref={audioRef} src={track.url} preload='auto' onEnded={endNext} onChange={()=>{audioRef.current.volume = Volume}}></audio>
          </div>
        }
      />

    </Routes>
  )
}

export default App
