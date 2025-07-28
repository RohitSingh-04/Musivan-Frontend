import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import PlayerContextProvider from './context/PlayerContext.jsx'
import BackendContextProvider, { BackendContext } from './context/BackendContext.jsx'
import AuthContextProvider from './context/AuthContext.jsx'
import PlaylistContextProvider from './context/PlaylistContext.jsx'
import SearchContextProvider from './context/SearchContext.jsx'
import ArtistFollowContextProvider from './context/ArtistFollowContext.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <BackendContextProvider>
        <AuthContextProvider>
          <ArtistFollowContextProvider>
          <SearchContextProvider>
          <PlaylistContextProvider>
          <PlayerContextProvider>
            <App />
          </PlayerContextProvider>
          </PlaylistContextProvider>
          </SearchContextProvider>
          </ArtistFollowContextProvider>
        </AuthContextProvider>
      </BackendContextProvider>
    </BrowserRouter>
  </StrictMode>,
)
