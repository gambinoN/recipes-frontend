import React, { useState } from 'react';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch('http://localhost:3001/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, email, password }),
    });

    if (response.ok) {
      console.log('User registered successfully!');
    } else {
      console.error('Registration failed!');
    }
  };

  return (
    <>
      <div className='flex flex-col lg:flex-row h-[94vh]'>
        <div className='h-full flex flex-half flex-col justify-center px-7 px-[144px]'>
          <h3 className='text-[48px] mb-7 lg:mb-12 font-anton uppercase'>Register Account</h3>
          <form onSubmit={handleSubmit} className='flex flex-col space-y-4'>
            <label>
              Username
            </label>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Enter your username" className='px-5 py-4 font-roboto' />
            <label>
              Email
            </label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email address"  className='px-5 py-4 font-roboto' />
            <label>
              Password
            </label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password"  className='px-5 py-4 mb-7 lg:mb-12 font-roboto' />
            <button type="submit" className='w-fit text-left font-anton uppercase text-lg px-4 py-3 bg-olive text-white cta'><span>Register</span></button>
          </form>
        </div>
        <div className='h-full flex flex-half '>
          <img src={'/food.avif'} alt='Food' className='h-full w-full object-cover' />
        </div>
      </div>
    </>
    
  );
};

export default Register;
