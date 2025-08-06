import React, {useContext, useEffect, useState, useRef} from 'react'
import { BackendContext } from '../context/BackendContext';
import { AuthContext } from '../context/AuthContext';
import { assets } from '../assets/assets';

const PagesTopBanner = ({current, total}) => {
    
    const {BACKEND_URL} = useContext(BackendContext);
    const page_progress = useRef();

    useEffect(
        ()=>{
            page_progress.current.style.width = (current/total)*100+"%";
        }, []
    );

    return (
        <div className='w-full flex flex-col items-center'>
            <img src={`${BACKEND_URL}/static/img/favicon.ico/`} alt="Musivan Icon" className='w-9'/>
            <div className='w-full bg-zinc-400 h-[2px] mt-2'>
                <hr className='h-[2px] bg-[#1ed760] w-full bg-green-800 rounded-full' ref={page_progress}/>
            </div>
        </div>
        )
}

const PagesTopInfo = ({current, total, back, Title})=>{

    return (
        <div className='flex flex-row items-center w-full my-5'>
            <button className='h-4 cursor-pointer' onClick={back} title='back'><img src={assets.arrow_left} alt="" className='h-5'/></button>
            <div className='flex flex-col ml-4'>
                <span className='text-sm text-zinc-200'>Steps {current} of {total}</span>
                <span className='text-white'>{Title}</span>
            </div>
        </div>
    )
}

const Page0_SetEmail = ({next}) => {
    const [error, setError]  = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const {BACKEND_URL} = useContext(BackendContext);
    const {axiosInstance} = useContext(AuthContext);
    const userInput = useRef();

    const isEmailExists = async (email)=>{
        const response =await axiosInstance.post(`${BACKEND_URL}/api/email-eligibility/`, {"email": email});
        console.log(response.data)
        if (!response.data.valid){
            setError(true);
            setErrorMessage(response.data.error);
            return false;
        }
        else{
            setError(false);
            setErrorMessage("");
            return true;
        }
    }

    const checkEmailValidity = ()=>{
        const email_regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (!email_regex.test(userInput.current.value)){
            setError(true);
            setErrorMessage("This email is invalid. Make sure it's written like example@email.com")
        }
        else{
            setError(false);
            setErrorMessage('');
        }
        

    }

    const page1NextBtnClick = () => {
        if(isEmailExists(userInput.current.value)){
            next();
        }

    }
    return (
        <div className='w-full flex flex-col items-center px-[0px] py-[32px] min-[320px]:w-[320px]'>
            <img src={`${BACKEND_URL}/static/img/favicon.ico/`} alt="Musivan Icon" className='w-9'/>
                <h1 className='text-white text-5xl text-center my-4'>Sign up to start listening</h1>
                <div className='w-full my-4'>
                    <h6 className='text-white'>Email address</h6>
                    <input type="email" id="email" className={`text-white border-1 w-full h-10 px-3 rounded-[4px] hover:border-white ${(error)?" border-red-300":"border-zinc-400"}`} placeholder="name@domain.com" onChange={checkEmailValidity} ref={userInput}/>
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
    )
}

const Page1_SetPassword = ({back, next}) => {
    
    const passwordInput = useRef();
    const [visible, setVisible] = useState(false);
    const [error, setError] = useState(false);
    const [ErrorMessage, setErrorMessage] = useState("");

    const changeVisibility = ()=>{
        setVisible(prev=>!prev);
    }

    const passwordValidity = ()=>{
        if (passwordInput.current.value == ""){
            setError(true);
            setErrorMessage("Please Enter the Password");
        }
        else{
            setError(false);
            setErrorMessage("");
            return true;
        }
    }

    const next_page_navigate = ()=>{
        if (passwordValidity()){
            next();
        }
    }

    return <>
    <div className='w-full flex flex-col items-center px-[0px] py-[32px] min-[320px]:w-[320px]'>
            <PagesTopBanner current={1} total={3}/>
            <PagesTopInfo current={1} total={3} back={back} Title="Create a password"/>
                <div className='w-full my-4'>
                    <h6 className='text-white'>Password</h6>
                    <div className='flex flex-col justify-left'>
                    <input type={(!visible)?'password':'text'} id="password" className={`text-white border-1 w-full h-10 px-3 rounded-[4px] hover:border-white  ${(error)?" border-red-300":"border-zinc-400"}`} placeholder="your password" ref={passwordInput} onChange={passwordValidity}/>
                    {
                        (error)?
                        <span className='text-red-300 text-[13px]'>X {ErrorMessage}</span>
                        :
                        ""
                    }
                    <span onClick={changeVisibility} className='text-[10px] text-zinc-400 hover:text-zinc-300 cursor-pointer w-'>{(visible?"Hide":"Show")}</span>
                    </div>
                    </div>
                    <button className='rounded-4xl bg-[#1ed760] text-black w-full py-2 cursor-pointer' onClick={next_page_navigate}>Next</button>
                    <hr className='border-1 border-zinc-600 w-full my-10'/>
                    <span className='text-white py-7'>Already have an account? Login here</span>
                    </div>
    </>
}


const Page2_SetUserData = ({back, next}) => {
    
    const nameInput = useRef();
    const dobInput = useRef();

    const [error, setError] = useState(false);
    const [ErrorMessage, setErrorMessage] = useState("");

    const next_page_navigate = ()=>{
        if (validate()){
            next();
        }
    }

    const nameValidity = ()=>{
        return nameInput.current.value.length > 0;
    }

    const dobValidity = ()=>{
        console.log(dobInput)
    }

    const validate = () => {
        return true;
    }

    return (
        <>
        <div className='w-full flex flex-col items-center px-[0px] py-[32px] min-[320px]:w-[320px]'>
            <PagesTopBanner current={2} total={3}/>
            <PagesTopInfo current={2} total={3} back={back} Title="Tell us about yourself"/>
                    <div className='flex flex-col justify-left pt-2'>
                <div className='w-full my-4'>
                    <h6 className='text-white'>Name</h6>
                    <span className='text-zinc-400 text-[14px]'>This name will appear on your profile</span>
                    <input type="text" className={`my-2 text-white border-1 w-full h-10 px-3 rounded-[4px] hover:border-white border-zinc-400`} placeholder="your name" ref={nameInput} onChange={nameValidity}/>

                    <h6 className='text-white'>Date of birth</h6>
                    <span className='text-zinc-400 text-[14px]'>this DOB will help us suggest songs by your age!</span>
                    <input type="date" className={`my-2 text-white border-1 w-full h-10 px-3 rounded-[4px] hover:border-white  ${(error)?" border-red-300":"border-zinc-400"}`} ref={dobInput} onChange={dobValidity}/>

                    <h6 className='text-white'>Gender</h6>
                    <span className='text-zinc-400 text-[14px]'>We use your gender to help personalize our content recommendations and ads for you.</span>
                    <div className='text-white text-[14px] flex flex-row justify-between'>
                        <div className='flex flex-row items-center'>
                            <input type="radio" value="Male" id="Male" name="gender"/>
                            <label htmlFor="Male" className='px-2'>Male</label>
                        </div>
                        <div className='flex flex-row items-center'>
                            <input type="radio" value="Female" id="Female" name="gender"/>
                            <label htmlFor="Female" className='px-2'>Female</label>
                        </div>
                        <div className='flex flex-row items-center'>
                            <input type="radio" value="Others" id="Others" name="gender"/>
                            <label htmlFor="Others" className='px-2'>Others</label>
                        </div>
                    </div>


                    {
                        (error)?
                        <span className='text-red-300 text-[13px]'>X {ErrorMessage}</span>
                        :
                        ""
                    }
                    </div>
                    </div>
                    <button className='rounded-4xl bg-[#1ed760] text-black w-full py-2 cursor-pointer' onClick={next_page_navigate}>Next</button>
                    <hr className='border-1 border-zinc-600 w-full my-10'/>
                    <span className='text-white py-7'>Already have an account? Login here</span>
        </div>
        </>
    )
}

const Page3_AccountActivation = ({collectedData}) => {
    
    const otpInput = useRef();
    const [error, setError] = useState(false);
    const [ErrorMessage, setErrorMessage] = useState("");


    const otpValidity = ()=>{
        if (! otpInput.current.length == 4){
            setError(true);
            setErrorMessage("otp should be of 4 charachters");
            return false;
        };
        return true;
    }

    const finish = ()=>{

    }

    return <>
    <div className='w-full flex flex-col items-center px-[0px] py-[32px] min-[320px]:w-[320px]'>
            <PagesTopBanner current={3} total={3}/>
            <PagesTopInfo current={3} total={3}  Title="Enter OTP"/>
                <div className='w-full my-4'>
                    <h1 className='text-white text-5xl text-center my-4'>Enter the 4-digit code sent to you at {collectedData?.email}</h1>
                    <div className='flex flex-col justify-left'>
                    <input type="number" className={`text-white border-1 w-full h-10 px-3 rounded-[4px] hover:border-white  ${(error)?" border-red-300":"border-zinc-400"}`} placeholder="XXXX" ref={otpInput} onChange={otpValidity} limit="4"/>
                    {
                        (error)?
                        <span className='text-red-300 text-[13px]'>X {ErrorMessage}</span>
                        :
                        ""
                    }
                    </div>
                    </div>
                    <button className='rounded-4xl bg-[#1ed760] text-black w-full py-2 cursor-pointer' onClick={finish}>Finish</button>
                    <hr className='border-1 border-zinc-600 w-full my-10'/>
                    <span className='text-white py-7'>Already have an account? Login here</span>
                    </div>
    </>
}

const Register = () => {
    const {user} = useContext(AuthContext);
    const [Page, setPage] = useState(0);
    var collectedData = {};

  return (

      <div className='w-screen h-screen flex flex-col items-center bg-black'>
      {
          (Page === 0)?
            <Page0_SetEmail next={()=>{setPage(1)}} />
            :(Page === 1)?
            <Page1_SetPassword next={()=>{setPage(2)}} back={()=>{setPage(0)}} />
            :(Page === 2)?
            <Page2_SetUserData next={()=>{setPage(3)}} back={()=>{setPage(2)}} />
            :(Page === 3)?
            <Page3_AccountActivation data = {collectedData} />
            :""
            
            }
                </div>
  )
}

export default Register