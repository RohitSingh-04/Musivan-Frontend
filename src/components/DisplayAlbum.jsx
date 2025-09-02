import React, { useContext, useEffect, useState } from 'react'
import Navbar from './Navbar'
import { useNavigate, useParams } from 'react-router-dom';
import { assets } from '../assets/assets';
import { PlayerContext } from '../context/PlayerContext';
import { BackendContext } from '../context/BackendContext';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import DisplayInfo from './DisplayInfo';
import DisplayList from './DisplayList';
import { PlaylistContext } from '../context/PlaylistContext';

const DisplayAlbum = () => {

  const {id} = useParams();
  const {user} = useContext(AuthContext);
  const {loadPlaylist} = useContext(PlayerContext);
  const {BACKEND_URL} = useContext(BackendContext);
  const {PlaylistView, deletePlaylistSongs, fetchPlaylistSongs} = useContext(PlaylistContext);

  useEffect(()=>{
  fetchPlaylistSongs(id);
  },[id]);

  return (
    <>
        <Navbar/>
        <DisplayInfo TopImage={(PlaylistView.length > 0) ? (PlaylistView[0].name.relative != null)?BACKEND_URL+PlaylistView[0].name.relative:PlaylistView[0].name.image : null} Type="Playlist" Name={(PlaylistView.length > 0) ? PlaylistView[0].name.name : ""} Desc={(PlaylistView.length > 0) ? PlaylistView[0].name.desc : ""} Likes = {(PlaylistView.length > 0) ? PlaylistView[0].name.likes : 0} Songs = {PlaylistView.length} ObjectId={id}/>
        
        <div className='grid grid-cols-3 sm:grid-cols-3 mt-10 mb-4 pl-2 text-[#a7a7a7]'>
            <p><b className='mr-4'>#</b>Art</p>
            <p>Title</p>
            <p className='hidden sm:block'>Date Added</p>
        </div>
        <hr />

        {
            PlaylistView.map((item, index)=>(
                <DisplayList key={index} index = {index} Image = {item.songs.imageurl} Name = {item.songs.name} Album = {item.songs.album} loadFx={()=>{loadPlaylist(PlaylistView, index)}} deleteFx={()=>{deletePlaylistSongs(item.name.id, item.songs.id)}} DeleteBtn={item.name.user == user?.id}/>
            )
            )
        }
    </>
  )
}

export default DisplayAlbum