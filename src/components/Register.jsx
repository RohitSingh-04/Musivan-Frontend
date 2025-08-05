import React, {useContext, useEffect, useState} from 'react'
import { BackendContext } from '../context/BackendContext';
import { AuthContext } from '../context/AuthContext';
const page1_setPassword = () => {
    
}

const Register = () => {
    
    const [error, setError]  = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const [hasData, setHasData] = useState(false);
    const {BACKEND_URL} = useContext(BackendContext);
    const {axiosInstance, user} = useContext(AuthContext);
    
    const isEmailExists = async (email)=>{
        const response =await axiosInstance.post(`${BACKEND_URL}/api/email-eligibility/`, {"email": email});
        console.log(response.data)
        if (!response.data.valid){
            setError(true);
            setErrorMessage(response.data.error);
        }
    }

    const checkEmailValidity = ()=>{
        let userInput = document.getElementById("email").value ;

        if(userInput.length > 0){
            setHasData(true);
        }else{
            setHasData(false);
        }

        const email_regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (!email_regex.test(userInput)){
            console.log("yes")
            setError(true);
            setErrorMessage("This email is invalid. Make sure it's written like example@email.com")
            return;
        }

        
        setError(false);
        setErrorMessage('');

    }

    const page1NextBtnClick = () => {
        let userInput = document.getElementById("email").value ;
        isEmailExists(userInput);
    }

  return (
    <div className='w-screen h-screen flex flex-col items-center bg-black'>
        <div className='w-full flex flex-col items-center px-[0px] py-[32px] min-[320px]:w-[320px]'>
            <img src={`${BACKEND_URL}/static/img/favicon.ico/`} alt="Musivan Icon" className='w-9'/>
            <h1 className='text-white text-5xl text-center my-4'>Sign up to start listening</h1>
            <div className='w-full my-4'>
                <h6 className='text-white'>Email address</h6>
                <input type="email" id="email" className={`text-white border-1 w-full h-10 px-3 rounded-[4px] hover:border-white ${(error)?" border-red-300":"border-zinc-400"}`} placeholder="name@domain.com" onChange={checkEmailValidity}/>
                {
                    (error)?
                    <span className='text-red-300 text-[13px]'>! {errorMessage}</span>
                    :
                    ""
                }
            </div>
            <button className='rounded-4xl bg-[#1ed760] text-black w-full py-2 cursor-pointer' onClick={page1NextBtnClick}>Next</button>
            <hr className='border-1 border-zinc-600 w-full my-10'/>
            <span className='text-white py-7'>Already have an account? Login here</span>
        </div>
    </div>
  )
}

export default Register