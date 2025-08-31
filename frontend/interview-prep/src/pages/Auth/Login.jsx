import React from 'react'
import Input from '../../components/Inputs/input';
import { useNavigate } from 'react-router-dom';
import { validateEmail } from '../../utils/helper';

const Login = ({setCurrentPage}) => {
  const [email,setEmail] = React.useState("");
  const [password,setPassword] = React.useState("");
  const [error,setError] = React.useState(null);

  const handleLogin=async(e)=> {
    e.preventDefault();

    if(!validateEmail(email)){
      setError("Please enter a valid email address");
      return;
    }

    if(!password || password.length < 8){
      setError("Password must be at least 8 characters long");
      return;
    }

    setError("");

    //Login API call
    try {
      
    } catch (error) {
      if(error.response && error.response.data && error.response.data.message){
        setError(error.response.data.message);
      } else {
        setError("An error occurred in login. Please try again.");
      }
    }
  }

  const navigate=useNavigate();
  return (
    <div className="w-[90vw] md:w-[33vw] p-7 flex flex-col justify-center">
      <h3 className="text-lg font-semibold text-black">Welcome Back</h3>
      <p className="text-xs text-slate-700 mt-[5px] mb-6">Please enter your details to login</p>

      <form onSubmit={handleLogin}>
        <Input 
        value={email} 
        onChange={({ target})=> setEmail(target.value)}
        label="Email address"
        placeholder="john@example.comt"
        type="email"
        />
        <Input 
        value={password}
        onChange={({target}) => setPassword(target.value)}
        label="Password"
        placeholder="Min 8 character"
        type="password"
        />

        {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}
        <button type='submit' className='btn-primary'>LOGIN</button>
        <p className='text-[13px] text-slate-800 mt-3'>Don't have an account?{" "}
          <button className='font-medium text-primary underline cursor-pointer' onClick={()=> {
            setCurrentPage("signUp");
          }}>SignUp
          </button>
        </p>
      </form>
    </div>
  )
}

export default Login