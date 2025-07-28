import { createContext, useContext, useRef, useState } from "react";
import { AuthContext } from '../context/AuthContext'
import { BackendContext } from '../context/BackendContext';

export const SearchContext = createContext();

const SearchContextProvider = (props) => {
    
    const searchBarRef = useRef();
    const [Query, setQuery] = useState("");
    const [SearchResults, setSearchResults] = useState(null);
    const {axiosInstance} = useContext(AuthContext);
    const {BACKEND_URL} = useContext(BackendContext);
    

    const searchData = async (event)=>{
        event.preventDefault();
        setQuery(searchBarRef.current.value);
        
        try{

           const response = await axiosInstance.get(`${BACKEND_URL}/api/search`, {
  params: { q: searchBarRef.current.value }
});

            setSearchResults(response.data);
            console.log(response.data)
            }


        catch(error){
            console.error("error in fetching the search results", error)
        }
        
    }

  const contextValue = {searchBarRef, Query, SearchResults, searchData}

  return (
    <SearchContext.Provider value={contextValue}>
      {props.children}
    </SearchContext.Provider>
  );
};

export default SearchContextProvider;