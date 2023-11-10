import React from 'react'
import axios from 'axios';
import { useState } from 'react';

const Register = () => {

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [Password, setPaswword] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);

    try {
      const res = await axios.post('/user/register', {
        username,
        email,
        Password
      });
      res.data && window.location.replace('/login')
    } catch (error) {
      setError(true); 
    }
  };
  return (

  <>
    <div className='justify-center items-center flex flex-col bg-blue-500 h-screen'>
      <div className='my-4 text-2xl'>
        <h1>Register</h1>
      </div>
      
        <form onSubmit={handleSubmit} className='flex flex-col'>
          <label htmlFor="" className='mt-4'>Username</label>
          <input type="text"  onChange={(e) => setUsername(e.target.value)} placeholder='Enter Username'  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
          <label htmlFor="" className='mt-4'>Email</label>
          <input type="text"  onChange={(e) => setEmail(e.target.value)} placeholder='Enter Email'  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
          <label htmlFor="" className='mt-4'>Password</label>
          <input type="password"  onChange={(e) => setPaswword(e.target.value)} placeholder='Enter Password' className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
          <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 mt-4 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Register</button>
        </form>
        <button className='text-md'>
          Login
        </button>
        {error && <span style={{color:"red", marginTop:"10px"}}>Something went wrong!</span>}
    </div>
  </>

  )
}

export default Register