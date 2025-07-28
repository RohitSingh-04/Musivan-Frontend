import { createContext, useContext, useState } from "react";
import { BackendContext } from "./BackendContext";
import { AuthContext } from "./AuthContext";

export const ArtistFollowContext = createContext();

const ArtistFollowContextProvider = (props) => {

  const [currentartistFollow, setcurrentArtistFollow] = useState(false);
  const [Followed, setFollowed] = useState(false);
  const {BACKEND_URL} = useContext(BackendContext);
  const {axiosInstance} = useContext(AuthContext);

  const isFollowed = async(ArtistId)=>{
            try {
                const response = await axiosInstance.get(
                    `${BACKEND_URL}/api/follow/${ArtistId}/`
                );
                setFollowed(response.data.followed);

                } catch (error) {
                console.error("Error fetching playlist:", error);
                
                return false;
                }
        };

  const follow = async (ArtistId)=>{
      try {
                const response = await axiosInstance.post(
                    `${BACKEND_URL}/api/follow/${ArtistId}/`
                );

                if (response.data.added){
                  setFollowed(true);
                }

                } catch (error) {
                console.error("Error fetching playlist:", error);
                
                return false;
                }

  }

  const unFollow = async (ArtistId)=>{
      try {
          const response = await axiosInstance.delete(
              `${BACKEND_URL}/api/follow/${ArtistId}/`
          );

          if (response.data.removed){
            setFollowed(false);
          }

          } catch (error) {
          console.error("Error fetching playlist:", error);
          
          return false;
          }

  }

  const contextValue = {
    currentartistFollow, setcurrentArtistFollow, isFollowed, Followed, setFollowed, follow, unFollow
  };

  return (
    <ArtistFollowContext.Provider value={contextValue}>
      {props.children}
    </ArtistFollowContext.Provider>
  );
};

export default ArtistFollowContextProvider;