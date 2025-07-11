import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios'
import {toast} from "react-toastify"


const Login = () => {
  const [currentState, setCurrentState] = useState('Login');
  const {token,setToken,navigate,backendUrl}=useContext(ShopContext)
 const [name, setName] = useState('');
 const [password, setPassword] = useState('');
 const [email, setEmail] = useState('');
  const onSubmitHandler = async (event) => {
    event.preventDefault();
      
    try {

      if(currentState==="Sign Up"){
         const response=await axios.post(backendUrl+ "/api/user/register",{name,email,password})     
     
      if(response.data.success){
          setToken(response.data.token)
         localStorage.setItem("token",response.data.token)
      }
      else{
          toast.error(response.data.message)
      }
      }
      else{
    const response=await axios.post(backendUrl+ "/api/user/login",{email,password})
    if(response.data.success){
          setToken(response.data.token)                       
         localStorage.setItem("token",response.data.token)

      }
      else{
          toast.error(response.data.message)
      }
      
     }
      
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }


  };


  useEffect(()=>{
    if(token){
      navigate('/')

    }

  },[token])


  

  return (
 
      <form
        onSubmit={onSubmitHandler}
        className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 text-gray-700 gap-4'
      >
        {/* Title */}
        <div className='inline-flex items-center gap-2 mb-2 mt-10'>
          <p className='text-3xl font-semibold'>{currentState}</p>
          <hr className='border-none h-[2px] w-8 bg-gray-800' />
        </div>

        {/* Name input (for Sign Up only) */}
        {currentState === 'Login' ? null : (
          <input
          onChange={(e)=>setName(e.target.value)}
            type='text'
            className='w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-black'
            placeholder='Name'
            required
          />
        )}

        {/* Email */}
        <input
         onChange={(e)=>setEmail(e.target.value)}
          type='email'
          className='w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-black'
          placeholder='Email'
          required
        />

        {/* Password */}
        <input
         onChange={(e)=>setPassword(e.target.value)}
          type='password'
          className='w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-black'
          placeholder='Password'
          required
        />

        {/* Forgot password & toggle login/signup */}
        <div className='w-full flex justify-between text-sm -mt-2 text-gray-600'>
          <p className='cursor-pointer hover:underline'>FORGOT YOUR PASSWORD?</p>
          {currentState === 'Login' ? (
            <p onClick={() => setCurrentState('Sign Up')} className='cursor-pointer hover:underline'>
              Create Account
            </p>
          ) : (
            <p onClick={() => setCurrentState('Login')} className='cursor-pointer hover:underline'>
              Login Here
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button className='bg-black text-white font-light px-8 py-2 mt-2 rounded hover:bg-gray-800 transition'>
          {currentState === 'Login' ? 'Sign In' : 'Sign Up'}
        </button>
      </form>

  );
};

export default Login;
