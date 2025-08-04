import { createContext, useContext, useEffect, useRef, useState } from "react";
import { BackendContext } from "./BackendContext";
import { AuthContext } from "./AuthContext";

export const PlayerContext = createContext();

const PlayerContextProvider = (props) => {
  
  const {BACKEND_URL} = useContext(BackendContext);
  
  const { axiosInstance } = useContext(AuthContext);

  const audioRef = useRef();
  const seekBg = useRef();
  const seekBar = useRef();

  const [isFav, setisFav] = useState(false);
  const [favData, setfavData]= useState([]);

  const [track, setTrack] = useState([]);
  const [playStatus, setPlayStatus] = useState(false);
  const [time, setTime] = useState({ currentTime: { second: 0, minute: 0 }, totalTime: { second: 0, minute: 0 } });

  const [queue, setQueue] = useState([]);
  const [queuePointer, setqueuePointer] = useState(0);

  const [shuffleState, setshuffleState] = useState(false);
  const [loopState, setloopState] = useState(false);

  const PlayState = {Random: "Random", Playlist: "Playlist", Artist: "Artist", Liked: "Liked" }
  const [playFrom, setplayFrom] = useState(PlayState.Random)

  const [artistSongsData, setArtistSongsData] = useState(null);
  const [playlistData, setPlaylistData] = useState(null);
  const [currentPlaying, setcurrentPlaying] = useState(0);

  const [TimeoutInstance, setTimeoutInstance] = useState(null);
  const [TimerTime, setTimerTime] = useState(null);

  const [Volume, setVolume] = useState(1);

  const randomSong = async()=>{
        const response = await axiosInstance.get(`${BACKEND_URL}/api/next/`);
        return response.data;
      }

  const getSong = async(id)=>{
      
      const response = await axiosInstance.get(`${BACKEND_URL}/api/song/${id}`);

      if (response.status != 200){
        console.log(response)
        throw new Error(`HTTP error! status: ${response.status} ${response.data}`);
      }

      loadSong(response.data);

    }

  const play = () => {
    audioRef.current.play();
    setPlayStatus(true);
    //fade in logic
    if (audioRef.current.volume < Volume){
      try{
        audioRef.current.volume += 0.1;
        play();
      }
      catch (IndexSizeError){
        audioRef.current.volume = 1;
      }
    }
  };

  const pause = () => {
    setPlayStatus(false);
    if (audioRef.current.volume <= 0){
      audioRef.current.pause();
    return ;
  }
  //fade out logic
    setTimeout(()=>{
      try{
        audioRef.current.volume -= 0.2; 
        pause();
      }
      catch(IndexSizeError){
        audioRef.current.volume = 0;
        pause();
      }
    }, 50);
  };

  const loadPlaylist = async (albumsData, played_from = 0) => {
    setplayFrom(PlayState.Playlist);
    setPlaylistData(albumsData);
    setcurrentPlaying(played_from);

    loadSong(albumsData[played_from].songs);
    
  }

  const loadLiked = async(likesData, played_from = 0)=>{

    setplayFrom(PlayState.Liked);
    setfavData(likesData);
    setcurrentPlaying(played_from);
    loadSong(likesData[played_from].song)
      
  }

  

  const loadArtist = async(artistData, played_from = 0)=>{
    setplayFrom(PlayState.Artist);
    setArtistSongsData(artistData);
    setcurrentPlaying(played_from);

    loadSong(artistData.songs[played_from]);
  }

  // Function to load a new song
  const loadSong = async (song) => {

    try{
      const response = await axiosInstance.get(`${BACKEND_URL}/api/favs/${song.id}`);
      setisFav(response.data.fav);
    }

    catch (error){
      if (error.response && error.response.status === 401){
        console.error("Authentication Failed try to login again")
      }
    }


    setTrack(song);

    seekBar.current.style.width = 0;
    // Set a timeout to allow the audioRef.current.src to update before playing
    // This is often needed when changing src programmatically
    await new Promise(resolve => setTimeout(resolve, 50)); 
    if(playStatus){
      play();
    }
    else{
      pause();
    }
  }

  const previous = async () => {
    if(playFrom === PlayState.Random){
        if (queuePointer != 0){
            let updatedqueuePointer = queuePointer - 1;
            setqueuePointer(updatedqueuePointer);
            loadSong(queue[updatedqueuePointer]);
        }
      }
    else if (playFrom === PlayState.Playlist){
      let newPlaying = (((currentPlaying-1) == -1)? playlistData.length-1 : currentPlaying-1);
      setcurrentPlaying(newPlaying);
      await loadSong(playlistData[newPlaying].songs);
    }

    else if (playFrom === PlayState.Artist){
      let newPlaying = (((currentPlaying-1) == -1)? artistSongsData.songs.length-1 : currentPlaying-1);
      setcurrentPlaying(newPlaying);
      await loadSong(artistSongsData.songs[newPlaying]);
    }

    else if (playFrom === PlayState.Liked){
      let newPlaying = (((currentPlaying-1) == -1)? favData.length-1 : currentPlaying-1);
      setcurrentPlaying(newPlaying);
      await loadSong(favData[newPlaying].song);
    }
  }

    const endNext = async () => {

      //shuffle loop and rotate functionality if needed will do it in future
      await next();

    }

    const next = async () => {

      if(playFrom === PlayState.Random){

        let updatedqueuePointer = queuePointer+1;
        setqueuePointer(updatedqueuePointer);

        if(updatedqueuePointer > queue.length - 1){
          let song = await randomSong();
          loadSong(song);
          setQueue([...queue, song]);
        }

        else{
          loadSong(queue[updatedqueuePointer]);
        }

        console.log(queue, queuePointer)
        
      }
      else if (playFrom === PlayState.Playlist){
        setQueue([]);
        if (shuffleState){
          let newPlaying = Math.floor(Math.random() * playlistData.length)
          setcurrentPlaying(newPlaying);
          await loadSong(playlistData[newPlaying].songs);
          return;
        }
        else if(loopState){
          audioRef.current.currentTime = 0;
          audioRef.current.play();
          return
        }
        let newPlaying = ((currentPlaying+1)%playlistData.length);
        setcurrentPlaying(newPlaying);
        await loadSong(playlistData[newPlaying].songs);
      }

      else if (playFrom === PlayState.Artist){
        setQueue([]);
        if (shuffleState){
          let newPlaying = Math.floor(Math.random() * artistSongsData.songs.length)
          setcurrentPlaying(newPlaying);
          await loadSong(artistSongsData.songs[newPlaying]);
          return;
        }
        else if(loopState){
          audioRef.current.currentTime = 0;
          audioRef.current.play();
          return
        }
        let newPlaying = ((currentPlaying+1)%artistSongsData.songs.length);
        setcurrentPlaying(newPlaying);
        await loadSong(artistSongsData.songs[newPlaying]);
      }

      else if (playFrom === PlayState.Liked){
        setQueue([]);

        if (shuffleState){
          let newPlaying = Math.floor(Math.random() * favData.length)
          setcurrentPlaying(newPlaying);
          await loadSong(favData[newPlaying].song);
          return;
        }
        else if(loopState){
          audioRef.current.currentTime = 0;
          audioRef.current.play();
          return
        }
        let newPlaying = ((currentPlaying+1)%favData.length);
        setcurrentPlaying(newPlaying);
        await loadSong(favData[newPlaying].song);
      }
  }
  //effect to play new song
  useEffect(()=>{
    next();
  }, []);

  // Effect for handling time updates and metadata loading
  useEffect(() => {
    const audio = audioRef.current;

    // Exit if audio element isn't ready
    if (!audio) return;

    // --- Event Handlers ---
    const handleTimeUpdate = () => {
      // Update current time frequently
      setTime(prevTime => ({
        ...prevTime, // Keep totalTime as it only changes on metadata load
        currentTime: {
          second: Math.floor(audio.currentTime % 60),
          minute: Math.floor(audio.currentTime / 60)
        }
      }));

      // update progress bar 
      if (seekBar.current && audio.duration > 0) {
        seekBar.current.style.width = (audio.currentTime / audio.duration) * 100 + "%";
      }
    };

    const handleLoadedMetadata = () => {
      // Update total time only once when metadata is loaded
      setTime(prevTime => ({
        ...prevTime,
        totalTime: {
          second: Math.floor(audio.duration % 60),
          minute: Math.floor(audio.duration / 60)
        }
      }));
    };

    // --- Add Event Listeners ---
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);

    // --- Cleanup Function ---
    // This runs when the component unmounts or before the effect re-runs
    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
    };
  }, [audioRef, track]); // Add 'track' to dependencies to re-attach listeners if track changes

  // Function to seek audio
  const seekSong = async (e) => {
    if (audioRef.current && seekBg.current) {
      // Calculate new time based on click position
      const newTime = (e.nativeEvent.offsetX / seekBg.current.offsetWidth) * audioRef.current.duration;
      audioRef.current.currentTime = newTime;
      // You might want to automatically play after seeking if it was paused
      if (!playStatus) {
        play();
      }
    }
  };

  const like_song = async (e) => {
     const response = await axiosInstance.post(`${BACKEND_URL}/api/favs/${track.id}`);
     setisFav(response.data.fav);
  }
  

  const contextValue = {
    audioRef,
    seekBar,
    seekBg,
    track,
    setTrack,
    playStatus,
    setPlayStatus,
    time,
    setTime,
    play,
    pause,
    loadSong, // Add loadSong to context
    seekSong,
    next, previous, getSong, loadPlaylist, PlayState, playFrom, setplayFrom, playlistData, setPlaylistData, currentPlaying, setcurrentPlaying, endNext, setshuffleState, setloopState, shuffleState, loopState, loadArtist, artistSongsData, setArtistSongsData, isFav, like_song, loadLiked, favData, TimeoutInstance, setTimeoutInstance, TimerTime, setTimerTime
  };

  return (
    <PlayerContext.Provider value={contextValue}>
      {props.children}
    </PlayerContext.Provider>
  );
};

export default PlayerContextProvider;