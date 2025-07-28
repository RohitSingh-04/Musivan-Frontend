import React, { useContext } from 'react'
import Navbar from './Navbar'
import SearchBar from './SearchBar'
import { SearchContext } from '../context/SearchContext'
import SongsItem from './SongsItem'
import AlbumItem from './AlbumItem'
import ArtistsItem from './ArtistsItem'
const DisplaySearch = () => {
      
  const {SearchResults, Query} = useContext(SearchContext);

  return (
    <>
    <Navbar/>
    <SearchBar/>
    {SearchResults?.songs?.length?
    <div className='mb-4'>
        <h1 className='my-5 font-bold text-2xl'>{Query} Related Songs</h1>
        <div className='flex overflow-auto '>
        {SearchResults.songs.map((item, index)=>(<SongsItem key={index} name={item.name} image={item.imageurl} id={item.id} album={item.album}/>))}
        </div>
    </div>:""
    }
    {SearchResults?.playlists?.length?

      <div className='mb-4'>
        <h1 className='my-5 font-bold text-2xl'>Featured Charts</h1>
        <div className='flex overflow-auto '>
        {SearchResults.playlists.map((item, index)=>(<AlbumItem key={index} name={item.name} image={item.image} id={item.id} desc={item.desc}/>))}
        </div>
      </div>:""
    }

    {
      SearchResults?.artists?.length?
      <div className='mb-4'>
        <h1 className='my-5 font-bold text-2xl'>Most Followed Artists</h1>
        <div className='flex overflow-auto '>
        {SearchResults.artists.map((item, index)=>(<ArtistsItem key={index} name={item.name} image={item.image} id={item.id} />))}
        </div>

    </div>:""
    }
    </>
  )
}

export default DisplaySearch