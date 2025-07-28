import React, { useContext, useState, useEffect } from 'react'
import { assets } from '../assets/assets'
import { PlaylistContext } from '../context/PlaylistContext';
import { ArtistFollowContext } from '../context/ArtistFollowContext';


const DisplayInfo = ({TopImage, Type, Name, Desc, Likes, ObjectId, Songs = 0, Followers = 0, Playlists = 0}) => {

    const {Liked, LikePlaylist, fetchLiked} = useContext(PlaylistContext);
    

    const {isFollowed, Followed, follow, unFollow} = useContext(ArtistFollowContext);
  
    if (Type == "Playlist"){
        useEffect(()=>{fetchLiked(ObjectId);}, [ObjectId]);
    }
    
    else if(Type == "Artist"){
        useEffect(()=>{
            isFollowed(ObjectId);
        }, [ObjectId]);
    }



  return (
    <div className='mt-10 flex gap-8 flex-row items-center'>
                <img className="w-30 rounded md:w-48" src={TopImage} alt="" />
                <div className='flex flex-col'>
                    <p>{Type}</p>
                    <h2 className='text-2xl font-bold mb-1 md:text-7xl md:mb-4'>{Name}</h2>
                    <h4 className='hidden md:block'>{Desc}</h4>
                    <p className='flex md:mt-1'>
                        
                        {(Likes > 0)?<span>{Likes} likes |</span>: ''}
                        {(Songs > 0)?<span> | {Songs} Songs</span>: ''}
                        {(Playlists > 0)?<span> | {Playlists} Playlists</span>: ''}
                        {(Followers > 0)?<span> | {Followers} Followers</span>: ''}
                    </p>
                    {
                        (Type=="Playlist")?
                            <div className='flex flex-row'>
                            <button className='bg-white text-black text-[15px] px-2 py-1 rounded-2xl cursor-pointer w-20 mt-5 mr-3 flex flex-row items-center' onClick={()=>{LikePlaylist(ObjectId)}}> <img src={ (!Liked)?assets.dark_heart_empty: assets.dark_heart_fill} className='h-4 mr-1' alt="Like"/> { (!Liked) ? "Like": "Liked"}</button>
                            </div>
                        : ""
                    }

                    {
                        (Type=="Artist")?
                            <div className='flex flex-row'>
                                {(!Followed)?
                                    <button className='bg-white text-black text-[15px] px-2 py-1 rounded-2xl cursor-pointer w-20 mt-5 mr-3 flex flex-row items-center' onClick={()=>{follow(ObjectId)}}> + Follow </button>
                                :
                                    <button className='bg-white text-black text-[15px] px-2 py-1 rounded-2xl cursor-pointer w-20 mt-5 mr-3 flex flex-row items-center' onClick={()=>{unFollow(ObjectId)}}> UnFollow </button>
                                }
                            </div>
                        : ""
                    }

            
                </div>
            </div>
  )
}

export default DisplayInfo