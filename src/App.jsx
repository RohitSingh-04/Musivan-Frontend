import React, { useContext } from 'react'
import Sidebar from './components/Sidebar'
import Player from './components/Player'
import Display from './components/Display'
import { PlayerContext } from './context/PlayerContext'
import Login from './components/Login'
import Logout from './components/Logout'

import { Routes, Route } from 'react-router-dom'

const App = () => {
  const { audioRef, track, endNext } = useContext(PlayerContext);

  return (
      <Routes>

        {/* Public Login Page */}
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />}/>

        {/* Main App Layout */}
        <Route
          path="/*"
          element={
            <div className="h-screen bg-black">
              <div className="h-[90%] flex">
                <Sidebar />
                <Display />
              </div>
              <Player />
              <audio ref={audioRef} src={track.url} preload='auto' onEnded={endNext}></audio>
            </div>
          }
        />

      </Routes>
  )
}

export default App
