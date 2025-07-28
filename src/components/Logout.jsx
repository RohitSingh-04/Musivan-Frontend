import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext';

const Logout = () => {

    const {logoutUser} = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(()=>{
        logoutUser();
        navigate("/");
    }, [])

  return (
    <div>Logging out...</div>
  )
}

export default Logout