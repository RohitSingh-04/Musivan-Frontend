import React, { useState, useMemo, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { BackendContext } from '../context/BackendContext';
import { PlayerContext } from '../context/PlayerContext';

const PlaylistItem = ({ playlist, onClick }) => (
  <div
    onClick={onClick}
    className="px-4 py-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition text-white flex flex-row items-center "
  >
    <img src={playlist?.image} className='w-10 rounded' alt="" />
    <span className='ml-5'>{playlist?.name}</span>
  </div>
);

const CreatePlaylistPopUp = ({ onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const { user, axiosInstance } = useContext(AuthContext);
  const { BACKEND_URL } = useContext(BackendContext);
  const {track} = useContext(PlayerContext);

  const [playlists, setPlaylist] = useState([]);

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const response = await axiosInstance.get(`${BACKEND_URL}/api/get-users-playlists/`);
        setPlaylist(response.data);
      } catch (error) {
        console.error("error: ", error);
        setPlaylist([]); 
      }
    };
    fetchPlaylists();
  }, []);

  const filteredPlaylists = useMemo(() => {
    return playlists.filter((playlist) =>
      playlist.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, playlists]); 

  const addSongs = async (playlistId)=>{
    try {
      if (user){
        const data = {playlist_id: playlistId, song_id: track.id}
        const response = await axiosInstance.post(`${BACKEND_URL}/api/add-playlist-song/`, data);
        
      } 
      else{
        new Error("user is not authenticated");
      }
    }
      catch (error) {
        console.error("error: ", error);
      }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white dark:bg-[#1e1e1e] rounded-xl w-full max-w-md shadow-lg relative p-4">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-1 right-3 text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-red-500"
        >
          ✕
        </button>

        {/* Search bar */}
        <input
          type="text"
          placeholder="Search playlists..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-[#2c2c2c] text-black dark:text-white mt-3"
        />

        {/* Playlist list */}
        <div className="max-h-64 overflow-y-auto">
          {filteredPlaylists.length > 0 ? (
            filteredPlaylists.map((playlist, index) => (
              <PlaylistItem
                key={index}
                playlist={playlist}
                onClick={() => {addSongs(playlist.id); onClose();}}
              />
            ))
          ) : (
            <p className="text-gray-500 text-center py-4">No playlists found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreatePlaylistPopUp;
