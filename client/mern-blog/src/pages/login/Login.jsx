import React, { useRef, useContext } from 'react'
import axios from 'axios';
import { Context } from "../../context/Context";


const Login = () => {

  const userRef = useRef();
  const passwordRef = useRef();
  const {dispatch, isFetching}= useContext();

  const handleSubmit = async() => {

    e.preventDefault();
    dispatch({type: 'LOGIN_START'});

    try {
      const res = await axios.post('/user/login', {
        username: userRef.current.value,
        password: passwordRef.current.value
      });

      dispatch({type: 'LOGIN_SUCCESS', payload: res.data});
    } catch (error) {
      dispatch({type:'LOGIN_FAILURE'})
    }

  };
  return (
<div className='justify-center items-center flex flex-col bg-gray-200 h-screen'>
      <div className='my-4 text-2xl'>
        <h1>Login</h1>
      </div>
      <div>
        <form onSubmit={handleSubmit} className='flex flex-col'>
          <label htmlFor="" className='mt-4'>Username</label>
          <input type="text" ref={userRef} placeholder='Enter Username'  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
          <label htmlFor="" className='mt-4'>Password</label>
          <input type="password" ref={passwordRef} placeholder='Enter Password' className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
          <button type="submit" disabled={isFetching} className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 mt-4 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Login</button>
        </form>
      </div>
      <button>Register</button>
    </div>  
    )
}

export default Login