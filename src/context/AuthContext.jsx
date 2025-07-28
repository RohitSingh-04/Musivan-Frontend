// AuthContext.jsx

import { createContext, useContext, useState, useEffect } from "react";
import { BackendContext } from "./BackendContext";
import { createAxiosInstance } from "./axiosInstance";

export const AuthContext = createContext();

const AuthContextProvider = (props) => {
  const { BACKEND_URL } = useContext(BackendContext);

  const [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem("authTokens") ? JSON.parse(localStorage.getItem("authTokens")) : null
  );
  const [user, setUser] = useState(null);

  const logoutUser = () => {
    setAuthTokens(null);
    localStorage.removeItem("authTokens");
    setUser(null);
    // window.location.href = "/login"; // optional redirect
  };

  const axiosInstance = createAxiosInstance(logoutUser);

  const loginUser = async (username, password) => {
      try{
    
        const response = await axiosInstance.post(`/api/token/`, { username, password });
    
        if (response.status === 200) {
          setAuthTokens(response.data);
          localStorage.setItem("authTokens", JSON.stringify(response.data));
          return true;
        }
        return false;
  }
  catch(error){
        if (error.response) {
            console.error('Login failed. Status:', error.response.status);
            console.error('Error data:', error.response.data);

            if (error.response.status === 401) {
  
                console.error('Invalid username or password.');
  
            } else {
  
                console.error('Server error during login.');
            }
        } else if (error.request) {
            console.error('No response received from server. Network issue?');
        } else {
            console.error('Error setting up login request:', error.message);
        }
        return false; 
  }
  };

  const getUser = async () => {
    if (!authTokens) return;
    try {
      const response = await axiosInstance.get(`/api/get-user/`);
      setUser(response.data);
    } catch {
      setUser(null);
    }
  };

  useEffect(() => {
    getUser();
  }, [authTokens]);

  const contextValue = {
    loginUser,
    logoutUser,
    getUser,
    user,
    authTokens,
    axiosInstance, // export your axiosInstance too!
  };

  return <AuthContext.Provider value={contextValue}>{props.children}</AuthContext.Provider>;
};

export default AuthContextProvider;
