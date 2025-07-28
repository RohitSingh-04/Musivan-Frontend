import { createContext, useContext, useState } from "react";
import { AuthContext } from '../context/AuthContext'
import { BackendContext } from '../context/BackendContext';

export const PlaylistContext = createContext();

const PlaylistContextProvider = (props) => {

    const [Liked, setLiked] = useState(false);

    const {BACKEND_URL} = useContext(BackendContext);
    const {axiosInstance} = useContext(AuthContext);
    const [PlaylistView, setPlaylistView] = useState([]);

    
  const fetchPlaylistSongs = async (id) => {
    try {
      const response = await axiosInstance.get(
        `${BACKEND_URL}/api/playlists/${id}`
      );
        setPlaylistView(response.data);
    } catch (error) {
        console.error("Error fetching playlist: your are not auth to access this item", error);
        setPlaylistView(error.response.data);
    }
  };

    const deletePlaylistSongs = async (playlistId, songId)=>{
    try {
      const data = {playlist_id: playlistId, song_id: songId}
      const response = await axiosInstance.delete(`${BACKEND_URL}/api/remove-playlist-song/`, {data: data});
      if (response.status === 200){
          fetchPlaylistSongs(playlistId);
        }
    }
      catch (error) {
        console.error("error: ", error);
      }
  }


    const LikePlaylist = async (ObjectId) => {
        try{
        const response = await axiosInstance.post(
            `${BACKEND_URL}/api/saved-playlists/${ObjectId}`
        );
        setLiked(response.data.saved);
        }
        catch(error){
        console.error("Error: your are not auth to access this item", error);
        }

    }

    const fetchLiked = async(id)=>{
        try{
            const LikedResponse = await axiosInstance.get(
              `${BACKEND_URL}/api/is-liked-playlist/${id}`
            );
            setLiked(LikedResponse.data.saved);
          }
        catch (error) {
          console.error("Error: your are not auth to access this item", error);
          setLiked(false);
        }
      }

  const contextValue = {
    Liked, setLiked, LikePlaylist, fetchLiked, PlaylistView, setPlaylistView, deletePlaylistSongs, fetchPlaylistSongs}

  return (
    <PlaylistContext.Provider value={contextValue}>
      {props.children}
    </PlaylistContext.Provider>
  );
};

export default PlaylistContextProvider;