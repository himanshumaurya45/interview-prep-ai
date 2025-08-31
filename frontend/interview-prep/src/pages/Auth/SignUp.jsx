import React from 'react'
import {useNavigate} from 'react-router-dom';
import Input from '../../components/Inputs/input';
import ProfilePhotoSelector from '../../components/Inputs/ProfilePhotoSelector';
import { validateEmail } from '../../utils/helper';

const SignUp = ({setCurrentPage}) => {
  const [profilePic,setProfilePic]=React.useState(null);
  const[fullName,setFullName]=React.useState("");
  const[email,setEmail]=React.useState("");
  const[password,setPassword]=React.useState("");
  const [error,setError]=React.useState(null);

  const handleSignUp=async(e)=> {
    e.preventDefault();

    let profileImageURL="";
    if(!fullName){
      setError("Please enter your full name");
      return;
    }
    if(!validateEmail(email)){
      setError("Please enter your email address");
      return;
    }
    if(!password || password.length < 8){
      setError("Password must be at least 8 characters long");
      return;
    }

    setError("");

    //Sign up API call
    try {
      
    } catch (error) {
      if(error.response && error.response.data && error.response.data.message){
        setError(error.response.data.message);
      } else {
        setError("An error occurred in signUp. Please try again.");
      }
    }
  }

  const navigate=useNavigate();
  return (
    <div className='w-[90vw] md:w-[33vw] p-7 flex flex-col justify-center'>
      <h3 className='text-lg font-semibold text-black'>Create an account</h3>
      <p className='text-xs text-slate-700 mt-[5px] mb-6'>
        Join us today by entering your details below.
      </p>
      <form onSubmit={handleSignUp}>
        <ProfilePhotoSelector image={profilePic} setImage={setProfilePic}/>
        <div className='grid grid-cols-1 md:grid-cols-1 gap-2'>
          <Input
          value={fullName}
          onChange={({target}) => setFullName(target.value)}
          label="Full Name"
          placeholder="Enter your full name"
          type="text"
          />
          
          <Input
          value={email}
          onChange={({target}) => setEmail(target.value)}
          label="Email Address"
          placeholder="john@example.com"
          type="email"
          />

          <Input
          value={password}
          onChange={({target}) => setPassword(target.value)}
          label="Password"
          placeholder="Enter your password"
          type="password"
          />
        </div>

        {error && <p className='text-red-500 text-xs pb-2.5'>{error}</p>}
        <button className='btn-primary' type='submit'>SIGN UP</button>
        <p className='text-[13px] text-slate-800 mt-3'>Already have an account?{" "}
          <button className='font-medium text-primary underline cursor-pointer' type="button" onClick={()=> {
            setCurrentPage("login");
          }}>Login</button>
        </p>
      </form>
    </div>
    )
}

export default SignUp