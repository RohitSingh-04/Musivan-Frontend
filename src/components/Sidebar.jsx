import React, { useContext, useEffect, useState } from 'react'
import {assets} from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { PlayerContext } from '../context/PlayerContext'
import { AuthContext } from '../context/AuthContext'
import { BackendContext } from '../context/BackendContext'
import SidebarListTop from './SidebarListTop'
import SidebarListItem from './SidebarListItem'
import { PlaylistContext } from '../context/PlaylistContext'
import { ArtistFollowContext } from '../context/ArtistFollowContext'


const Sidebar = () => {
    const {PlayState, playFrom, setplayFrom, playlistData, setPlaylistData, currentPlaying, setcurrentPlaying, loadPlaylist, setshuffleState, setloopState, shuffleState, loopState, artistSongsData, favData, loadLiked} = useContext(PlayerContext);
    const { BACKEND_URL } = useContext(BackendContext);
    const {axiosInstance} = useContext(AuthContext);
    const {Liked, LikePlaylist, loadArtist} = useContext(PlaylistContext);

    const [playlists, setPlaylists] = useState([]);

    const getplaylists = async () => {
    try {
      const response = await axiosInstance.get(`${BACKEND_URL}/api/get-users-playlists/`);
      setPlaylists(response.data);
    } catch (error){
        
        console.error("error: ", error);

      setPlaylists([]);
    }
  };

    useEffect(()=>{
        getplaylists();
    }, []);

const navigate = useNavigate();
  return (
    <div className="w-[400px] h-full p-2 flex-col gap-2 text-white hidden lg:flex">
        <div className="bg-[#121212] h-[15%] rounded flex flex-col justify-around">
            <div onClick={()=>{navigate('/')}} className="flex items-center gap-3 pl-8 cursor-pointer">
                <img className="w-6" src={assets.home_icon} alt="" />
                <p className="font-bold">Home</p>
            </div>

            <div onClick={()=>{navigate('/player')}} className="flex items-center gap-3 pl-8 cursor-pointer">
                <img  className="w-6" src={assets.player_icon} alt="" />
                <p className="font-bold">Player</p>
            </div>
            <div onClick={()=>{navigate('/search')}} className="flex items-center gap-3 pl-8 cursor-pointer">
                <img  className="w-6" src={assets.search_icon} alt="" />
                <p className="font-bold">Search</p>
            </div>
            
        </div>
        <div className='bg-[#121212] h-[85%] rounded flex flex-col'>
            <div className='p-4 flex items-center justify-between'>
                <div className='flex items-center gap-3'>
                    <img className="w-8" src={assets.stack_icon} alt="" /><p className='font-semibold'>Your Playlist</p>
                </div>

                <div className='flex items-center gap-3'>
                    <img className="w-5" src={assets.arrow_icon} alt="" />
                    <img className="w-5 cursor-pointer" src={assets.plus_icon} alt="add" title='add playlist' />
                </div>
            </div>
            
            {(playlists.length === 0)? (
            <div className='p-4 bg-[#242424] m-2 rounded font-semibold flex flex-col items-start justify-start gap-1 pl-4'>
                <h1>Create your first playlist</h1>
                <p className='font-light'>it's easy we will help you </p>
                <button className='px-4 py-1.5 bg-white text-[15px] text-black rounded-full mt-4'>Create Playlist</button>
            </div>)
            :(
            <div className='cursor-pointer flex-grow overflow-y-auto'>
                {
                
                playlists.map((item, index)=>(
                    <div className='flex flex-row items-center w-full hover:bg-[#121212]' key={index} onClick={()=>navigate(`/album/${item.id}`)}>
                                    <img className='w-[60px] p-3 rounded' src={item.image} alt="" />
                                    <p className='font-normal text-sm' dangerouslySetInnerHTML={{ __html: item.name }}></p>
                    </div>
                ))
                }
            </div>)
        }
            
            {(playFrom === PlayState.Playlist)?
            <div className='p-4 bg-[#242424] m-2 rounded font-semibold flex flex-col items-start justify-start gap-1 pl-4 flex flex-col flex-grow overflow-hidden h-[160vh]'>

                <SidebarListTop ListHeading={`Playing - ${playlistData[currentPlaying].name.name}`} ListIcon={playlistData[currentPlaying].name.image} likes = {playlistData[currentPlaying].name.likes}/>
                
                <div className='cursor-pointer flex-grow overflow-y-auto'>
                    {
                        playlistData?.map((item, index)=>(
                            <div onClick={()=>{loadPlaylist(playlistData, index)}} className='flex flex-row items-center w-full hover:bg-[#121212]' key={index}>
                                <img className='w-[60px] p-3 rounded' src={item.songs.imageurl} alt="" />
                                <h6 dangerouslySetInnerHTML={{ __html: item.songs.name }}></h6>
                            </div>
                        ))
                    }
                </div>

                <div className='flex flex-row'>
                  <button className='bg-white text-black text-[15px] px-2 py-1 rounded-2xl cursor-pointer w-20 mt-5 mr-3 flex flex-row items-center' onClick={()=>{LikePlaylist(playlists[0]?.id)}}> <img src={(Liked)?assets.dark_heart_fill:assets.dark_heart_empty} className='h-4 mr-1' alt="Like"/>{(Liked)?"Liked":"Like"}</button>
                </div>
            </div>
            :
            (playFrom === PlayState.Artist)?
                
                <div className='p-4 bg-[#242424] m-2 rounded font-semibold flex flex-col items-start justify-start gap-1 pl-4 flex flex-col flex-grow overflow-hidden h-[160vh]'>
                    <SidebarListTop ListHeading={`${artistSongsData.name}'s Songs`} ListIcon={artistSongsData.image} Followers = {artistSongsData.followers}  onClick={()=>{navigate(`/artist/${artistSongsData.id}`)}}/>
                
                    <div className='cursor-pointer flex-grow overflow-y-auto'>
                        {
                            artistSongsData?.songs?.map((item, index)=>(
                                <div onClick={()=>{loadArtist(playlistData, index)}} className='flex flex-row items-center w-full hover:bg-[#121212]' key={index}>
                                    <img className='w-[60px] p-3 rounded' src={item.imageurl} alt="" />
                                    <h6 dangerouslySetInnerHTML={{ __html: item.name }}></h6>
                                </div>
                            ))
                        }
                    </div>
                   
                </div>
            : (playFrom === PlayState.Liked)? 
                <div className='p-4 bg-[#242424] m-2 rounded font-semibold flex flex-col items-start justify-start gap-1 pl-4 flex flex-col flex-grow overflow-hidden h-[160vh]'>
                    <SidebarListTop ListHeading={`Your Liked Songs`} ListIcon={assets.favs}  />
                
                    <div className='cursor-pointer flex-grow overflow-y-auto'>
                        {   
                            favData?.map((item, index)=>(
                                <SidebarListItem loadFx = {()=>{loadLiked(favData, index)}} Image = {item.song.imageurl} Name = {item.song.name} index = {index}/>
                            ))
                        }
                    </div>

                </div>
            : ""
            }
            
                 
        </div>

    </div>
    
  )
}

export default Sidebar  