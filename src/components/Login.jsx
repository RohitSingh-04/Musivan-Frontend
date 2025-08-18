import React, { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);

  const {loginUser} = useContext(AuthContext);

  const login = async ()=>{
    let loged = await loginUser(username, password);
    if (loged){
      navigate('/');
    }
    else{
      document.getElementById("passwd").value = "";
      alert ("Invalid Cred!");
    }
  }

  return (
    <div className='w-[100vw] h-[100vh] flex items-center justify-center'>
      <div className='flex flex-col items-center bg-slate-700 rounded p-10 h-[40vh]'>
        <h1 className='text-white'>Login</h1>
        <input type="text" placeholder='username' className='border-green-700 border m-2 p-2 rounded-2xl text-white' onChange={(e)=>{setUsername(e.target.value)}}/>
        <input type="password" placeholder='password' id="passwd" className='border-green-700 border m-2 p-2 rounded-2xl text-white' onChange={(e)=>{setPassword(e.target.value)}}/>
        <button className='bg-[#00FF00] text-black text-[15px] px-4 py-1 rounded-2xl cursor-pointer w-[10vh]' onClick={login}>Login</button>
        <div><span className='text-white'>Don't have an account? <button className='cursor-pointer underline' onClick={()=>{navigate("/register")}}>Register Here</button></span></div>
      </div>
    </div>
  )
}

export default Login