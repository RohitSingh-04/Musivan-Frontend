import React, { useEffect, useRef } from 'react'
import DisplayHome from './DisplayHome'
import { Routes, Route, useLocation } from 'react-router-dom';
import DisplayAlbum from './DisplayAlbum';
import DisplayPlayer from './DisplayPlayer';
import DisplayArtist from './DisplayArtist';
import DisplayUser from './DisplayUser';
import DisplayLikedSongs from './DisplayLikedSongs';
import DisplayLikedPlaylists from './DisplayLikedPlaylists';
import DisplaySearch from './DisplaySearch';
import DisplaySidebar from './DisplaySidebar';
import AddPlaylist from './AddPlaylist';
const Display = () => {

  const displayRef = useRef();
  const location = useLocation();

  const isAlbum = location.pathname.includes("album");
  const bgcolor = "#2a4365";

  useEffect(()=>{
    if (isAlbum){
      displayRef.current.style.background = `linear-gradient(${bgcolor}, #121212)`;
    }
    else{
      displayRef.current.style.background = "#121212";
    }
  })

  return (
    <div ref={displayRef} className='w-[100%] m-2 px-6 pt-4 rounded bg-[#121212] text-white overflow-auto lg:w-[75%] lg:ml-0'>

        <Routes>
            <Route path="/" element={<DisplayHome/>} />
            <Route path="/album/:id" element = {<DisplayAlbum/>} />
            <Route path="/artist/:id" element = {<DisplayArtist/>}/>
            <Route path="/player" element = {<DisplayPlayer/> }/>
            <Route path="/profile" element={<DisplayUser/>}/>
            <Route path="/liked-songs" element={<DisplayLikedSongs/>}/>
            <Route path="/liked-playlist" element={<DisplayLikedPlaylists/>}/>
            <Route path="/search" element={<DisplaySearch/>}/>
            <Route path="/sidebar" element={<DisplaySidebar/>}/>
            <Route path="/addPlaylist" element={<AddPlaylist/>}/>

        </Routes> 

    </div>
  )
}

export default Display