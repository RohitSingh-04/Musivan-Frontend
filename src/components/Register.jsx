import React, {useContext, useEffect, useState, useRef} from 'react'
import { BackendContext } from '../context/BackendContext';
import { AuthContext } from '../context/AuthContext';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';

class userData {
    
    constructor(){
        this.email = null;
        this.first_name = null;
        this.last_name = null;
        this.age = null;
        this.password = null;
        this.username = null;
        this.gender = null;
    }

    setInit(BACKEND_URL, axiosInstance){
        this.axiosInstance = axiosInstance;
        this.BACKEND_URL = BACKEND_URL;
    }

    validateEmail(email, setError, setErrorMessage){
        const email_regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (!email_regex.test(email)){
            setError(true);
            setErrorMessage("This email is invalid. Make sure it's written like example@email.com")
            return false;
        }
        else{
            setError(false);
            setErrorMessage('');
            return true;
        }
    }

    async isEmailExists(email, setError, setErrorMessage){
        const response =await this.axiosInstance.post(`${this.BACKEND_URL}/api/email-eligibility/`, {"email": email});
        if (!response.data.valid){
            setError(true);
            setErrorMessage(response.data.error);
            return false;
        }
        else{
            setError(false);
            setErrorMessage("")
            return true;
        }
    }

    setEmail(email, setError, setErrorMessage){
        const validity = this.validateEmail(email, setError, setErrorMessage);
        
        if (validity){
            this.email = email;
            return true;
        }
        else{
            return false;
        }

    }

    async isUserExists(username, setError, setErrorMessage){
        const response =await this.axiosInstance.post(`${this.BACKEND_URL}/api/is-username-valid/`, {"username": username});
        if (!response.data.valid){
            setError(true);
            setErrorMessage(response.data.error);
            return false;
        }
        else{
            setError(false);
            setErrorMessage("")
            return true;
        }
    }

    setUsername(username, setError, setErrorMessage){
        if (this.isUserExists(username, setError, setErrorMessage)){
            this.username = username;
            return true;
        }
        else{
            this.username = "";
            return false;
        }
    }

    validatePassword(password, setError, setErrorMessage){
        if (password == ""){
            setError(true);
            setErrorMessage("Please Enter the Password");
            return false;
        }
        else{
            setError(false);
            setErrorMessage("");
            return true;
        }
    }

    setPassword(password, setError, setErrorMessage){
        const valid = this.validatePassword(password, setError, setErrorMessage);
        if (valid){
            this.password = password;
            return true;
        }
        return false;
    }

    
     nameValidity(name, setError, setErrorMessage){
        if (name.length > 0){
            setError(false);
            setError("");
            return true;
        } 
        else{
            setError(true);
            setErrorMessage("X Invalid Name");
            return false;
        }
    }

     dobValidity(dob, setError, setErrorMessage){
        const date = new Date(dob);
        if (isNaN(date)){
            setError(true);
            setErrorMessage("Invalid Date");
            return false;
        }

        let age = this.calculateAge(new Date(dob));

        if (age < 4 || age > 131){
            setError(true);
            setErrorMessage("X Invalid Age! Age must be between 5 and 130.")
            return false;
        }

        else{
            setError(false);
            setErrorMessage("");
            return true;
        }
    }

    calculateAge(date){
        var ageDiff = Date.now() - date.getTime();
        var ageDate = new Date(ageDiff);
        return (ageDate.getUTCFullYear() - 1970);
    }


    setUserData(userName, userDob, userGender, setError, setErrorMessage){
        if (!this.nameValidity(userName, setError, setErrorMessage)){
            return false;
        }
        else{
            let Name = userName.split(" ");
            this.first_name = Name[0];
            this.last_name = "";
            if (Name.length>1){
                this.last_name = Name[Name.length - 1]
            }
        }

        if (!this.dobValidity(userDob, setError, setErrorMessage)){
            return false;
        }
        else{
            this.age = this.calculateAge(new Date(userDob));
        }

        console.log(userGender)
        if (userGender === ""){
            setError(true);
            setErrorMessage("please select a gender!");
            return false;
        }

        else{
            this.gender = userGender;
            setError(false);
            setErrorMessage("");
        }
        return true;
    }

    async sendOTP(setError, setErrorMessage){
        console.log(this.email)
        const response =await this.axiosInstance.post(`${this.BACKEND_URL}/api/send-otp/`, {"email": this.email});
        if (!response.data.sent){
            setError(true);
            setErrorMessage(response.data.error);
            return false;
        }
        else{
            setError(false);
            setErrorMessage("")
            return true;
        }
    }
    
    async save(otp, setError, setErrorMessage){
        const response =await this.axiosInstance.post(`${this.BACKEND_URL}/api/register/`, {"email": this.email, "username": this.username, "first_name": this.first_name, "last_name": this.last_name, "password": this.password, "age": this.age, "gender": this.gender, "otp": otp});
        if (!response.data.created){
            if(response.data.refresh){
                this.sendOTP(setError, setErrorMessage);
                setError(true);
                setErrorMessage(response.data.error);
                return false
            }
            setError(true);
            setErrorMessage(response.data.error);
            return false;
        }
        else{
            setError(false);
            setErrorMessage("")
            return true;
        }
    }

}

const collectedUserData = new userData();

const PagesTopBanner = ({current, total}) => {
    
    const page_progress = useRef();

    useEffect(
        ()=>{
            page_progress.current.style.width = (current/total)*100+"%";
        }, []
    );

    return (
        <div className='w-full flex flex-col items-center'>
            <img src={assets.logo} alt="Musivan Icon" className='w-9'/>
            <div className='w-full bg-zinc-400 h-[2px] mt-2'>
                <hr className='h-[2px] bg-[#1ed760] w-full bg-green-800 rounded-full' ref={page_progress}/>
            </div>
        </div>
        )
}

const PagesTopInfo = ({current, total, back, Title})=>{

    return (
        <div className='flex flex-row items-center w-full my-5'>
            {
            (back)?
            <button className='h-4 cursor-pointer' onClick={back} title='back'><img src={assets.arrow_left} alt="" className='h-5'/></button>
            :""
            }
            <div className='flex flex-col ml-4'>
                <span className='text-sm text-zinc-200'>Steps {current} of {total}</span>
                <span className='text-white'>{Title}</span>
            </div>
        </div>
    )
}

const PageFooter = ()=>{
    const navigate = useNavigate();
    return (
        <>
            <hr className='border-1 border-zinc-600 w-full my-10'/>
            <span className='text-white py-7'>Already have an account? <button className='cursor-pointer text-grey-400 underline' onClick={()=>{navigate("/login")}}>Login here</button></span>
        </>
    )


}

const Page0_SetEmail = ({next, data}) => {
    const [error, setError]  = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const userInput = useRef();

    const page1NextBtnClick = async (data) => {
        const success = await data.isEmailExists(userInput.current.value, setError, setErrorMessage);
        if(success){
            const set = data.setEmail(userInput.current.value, setError, setErrorMessage);

            if (set){
                next();
            }
        }

    }

    useEffect(()=>{
        userInput.current.value = (data.email)?`${data.email}`:"";
    }, []);

    return (
        <div className='w-full h-screen flex flex-col items-center px-[0px] py-[32px] min-[320px]:w-[320px]'>
            <img src={assets.logo} alt="Musivan Icon" className='w-9'/>
                <h1 className='text-white text-5xl text-center my-4'>Sign up to start listening</h1>
                <div className='w-full my-4'>
                    <h6 className='text-white'>Email address</h6>
                    <input type="email" id="email" className={`text-white border-1 w-full h-10 px-3 rounded-[4px] hover:border-white ${(error)?" border-red-300":"border-zinc-400"}`} placeholder="name@domain.com" onChange={()=>{data.validateEmail(userInput.current.value, setError, setErrorMessage)}} ref={userInput}/>
                    {
                        (error)?
                        <span className='text-red-300 text-[13px]'>! {errorMessage}</span>
                        :
                        ""
                    }
                    </div>
                    <button className='rounded-4xl bg-[#1ed760] text-black w-full py-2 cursor-pointer' onClick={()=>{page1NextBtnClick(data)}}>Next</button>
                    <PageFooter/>
                    </div>
    )
}

const Page0_5_SetUsername = ({next, back, data}) => {
    const [error, setError]  = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const usernameInput = useRef();

    const pageNextBtnClick = async (data) => {
        const set = data.setUsername(usernameInput.current.value, setError, setErrorMessage);
        if (set){
            next();
        }
    }

    useEffect(()=>{
        usernameInput.current.value = (data.username)?`${data.username}`:"";
    }, []);

    return (
        <div className='w-full h-screen flex flex-col items-center px-[0px] py-[32px] min-[320px]:w-[320px]'>
                <PagesTopBanner current={0} total={3}/>
                <PagesTopInfo current={0} total={3} back={back} Title="Choose a username"/>
                <div className='w-full my-4'>
                    <h6 className='text-white'>Username</h6>
                    <input type="text" className={`text-white border-1 w-full h-10 px-3 rounded-[4px] hover:border-white ${(error)?" border-red-300":"border-zinc-400"}`} placeholder="username" ref={usernameInput}/>
                    {
                        (error)?
                        <span className='text-red-300 text-[13px]'>! {errorMessage}</span>
                        :
                        ""
                    }
                    </div>
                    <button className='rounded-4xl bg-[#1ed760] text-black w-full py-2 cursor-pointer' onClick={()=>{pageNextBtnClick(data)}}>Next</button>
                    <PageFooter/>
                    </div>
    )
}

const Page1_SetPassword = ({back, next, data}) => {
    
    const passwordInput = useRef();
    const [visible, setVisible] = useState(false);
    const [error, setError] = useState(false);
    const [ErrorMessage, setErrorMessage] = useState("");

    const changeVisibility = ()=>{
        setVisible(prev=>!prev);
    }

    const next_page_navigate = ()=>{
        if (data.setPassword(passwordInput.current.value, setError, setErrorMessage)){
            next();
        }
    }

    return <>
    <div className='w-full h-screen flex flex-col items-center px-[0px] py-[32px] min-[320px]:w-[320px]'>
            <PagesTopBanner current={1} total={3}/>
            <PagesTopInfo current={1} total={3} back={back} Title="Create a password"/>
                <div className='w-full my-4'>
                    <h6 className='text-white'>Password</h6>
                    <div className='flex flex-col justify-left'>
                    <input type={(!visible)?'password':'text'} id="password" className={`text-white border-1 w-full h-10 px-3 rounded-[4px] hover:border-white  ${(error)?" border-red-300":"border-zinc-400"}`} placeholder="your password" ref={passwordInput} onChange={()=>{data.validatePassword(passwordInput.current.value, setError, setErrorMessage)}}/>
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
                    <PageFooter/>
                    </div>
    </>
}


const Page2_SetUserData = ({back, next, data}) => {
    
    const nameInput = useRef();
    const dobInput = useRef();

    const [error, setError] = useState(false);
    
    const [ErrorMessage, setErrorMessage] = useState("");

    const [selectedGender, setSelectedGender] = useState("");

    const next_page_navigate = ()=>{
        if (data.setUserData(nameInput.current.value, dobInput.current.value, selectedGender, setError, setErrorMessage)){
            data.sendOTP(setError, setErrorMessage);
            next();
        }
    }


    return (
        <>
        <div className='w-full h-[100vh] flex flex-col items-center px-[0px] py-[32px] min-[320px]:w-[320px]'>
            <PagesTopBanner current={2} total={3}/>
            <PagesTopInfo current={2} total={3} back={back} Title="Tell us about yourself"/>
                    <div className='flex flex-col justify-left pt-2'>
                <div className='w-full my-4'>
                    <h6 className='text-white'>Name</h6>
                    <span className='text-zinc-400 text-[14px]'>This name will appear on your profile</span>
                    <input type="text" className={`my-2 text-white border-1 w-full h-10 px-3 rounded-[4px] hover:border-white border-zinc-400`} placeholder="your name" ref={nameInput} onChange={()=>{data.nameValidity(nameInput?.current?.value, setError, setErrorMessage)}}/>

                    <h6 className='text-white'>Date of birth</h6>
                    <span className='text-zinc-400 text-[14px]'>this DOB will help us suggest songs by your age!</span>
                    <input type="date" className={`my-2 text-white border-1 w-full h-10 px-3 rounded-[4px] hover:border-white border-zinc-400`} ref={dobInput} onChange={()=>{data.dobValidity(dobInput?.current?.value, setError, setErrorMessage)}}/>

                    <h6 className='text-white'>Gender</h6>
                    <span className='text-zinc-400 text-[14px]'>We use your gender to help personalize our content recommendations for you.</span>
                    <div className='text-white text-[14px] flex flex-row justify-between'>
                        <div className='flex flex-row items-center'>
                            <input type="radio" value="Male" id="Male" name="gender" onChange={()=>{setSelectedGender("Male")}}/>
                            <label htmlFor="Male" className='px-2' checked={selectedGender === "Male"} >Male</label>
                        </div>
                        <div className='flex flex-row items-center'>
                            <input type="radio" value="Female" id="Female" name="gender" onChange={()=>{setSelectedGender("Female")}}/>
                            <label htmlFor="Female" className='px-2' checked = {selectedGender === "Female"} >Female</label>
                        </div>
                        <div className='flex flex-row items-center'>
                            <input type="radio" value="Others" id="Others" name="gender" onChange={()=>{setSelectedGender("Others")}}/>
                            <label htmlFor="Others" className='px-2' checked = {selectedGender === "Others"} >Others</label>
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
                    <PageFooter/>
        </div>
        </>
    )
}

const Page3_AccountActivation = ({login, collectedData}) => {
    
    const otpInput = useRef();
    const [error, setError] = useState(false);
    const [ErrorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const otpValidity = ()=>{
        if (! otpInput.current.length == 4){
            setError(true);
            setErrorMessage("otp should be of 4 charachters");
            return false;
        };
        return true;
    }

    const finish = async ()=>{
        if (otpValidity()){
            let data = await collectedData.save(otpInput.current.value, setError, setErrorMessage)
            if(data){
                login(collectedData.username, collectedData.password);
                navigate("/");
            }
        }
    }

    return <>
    <div className='w-full flex flex-col items-center px-[0px] py-[32px] min-[320px]:w-[320px]'>
            <PagesTopBanner current={3} total={3}/>
            <PagesTopInfo current={3} total={3}  Title="Enter OTP"/>
                <div className='w-full my-4'>
                    <h1 className='text-white text-5xl text-center my-4'>Enter the 4-digit code sent to you at</h1>
                    <h5 className='text-white text-xl text-center my-4'>{collectedData.email}</h5>
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
                    <PageFooter/>
                    </div>
    </>
}
const Register = () => {
    const {user, loginUser} = useContext(AuthContext);
    const [Page, setPage] = useState(0);
    const {BACKEND_URL} = useContext(BackendContext);
    const {axiosInstance} = useContext(AuthContext);
    const navigate=useNavigate();

    useEffect(()=>{
        collectedUserData.setInit(BACKEND_URL, axiosInstance);
    }, [axiosInstance, BACKEND_URL]);

    useEffect(()=>{
        if (user){
            navigate("/");
        }
    })

  return (

      <div className='w-screen h-full flex flex-col items-center bg-black'>
      {
          (Page === 0)?
            <Page0_SetEmail next={()=>{setPage(0.5)}} data={collectedUserData} />
            :(Page === 0.5)?
            <Page0_5_SetUsername next={()=>{setPage(1)}} back={()=>{setPage(0)}} data={collectedUserData} />
            :(Page === 1)?
            <Page1_SetPassword next={()=>{setPage(2)}} back={()=>{setPage(0.5)}} data={collectedUserData} />
            :(Page === 2)?
            <Page2_SetUserData next={()=>{setPage(3)}} back={()=>{setPage(1)}} data={collectedUserData} />
            :(Page === 3)?
            <Page3_AccountActivation collectedData={collectedUserData} login={loginUser} />
            :""
            
            }
                </div>
  )
}

export default Register