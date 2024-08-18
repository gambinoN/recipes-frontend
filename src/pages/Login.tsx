import React, { useState } from 'react';
import FormInput from '../components/FormInput';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const goToDashboard = () => navigate('/dashboard');

  const validateForm = (email: string, password: string): string | null => {
    if (!email || !password) {
      return 'All fields are required!';
    }
  
    if (!/\S+@\S+\.\S+/.test(email)) {
      return 'Invalid email format';
    }
  
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
  
    const error = validateForm(email, password);
    if (error) {
      setError(error);
      return;
    }
  
    setError('');  
  
    try {
      const response = await fetch('http://localhost:3001/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
  
      if (response.ok) {
        const data = await response.json()
        localStorage.setItem('token', data.token)
        goToDashboard()
      } else {
        const errorText = await response.text();

        setError(`Registration failed! ${errorText}`);
      }
    } catch (error) {
      setError('An unexpected error occurred. Please try again.');
    }
  };
  

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const password = e.target.value;
    setPassword(password);
  }

  return (
    <>
      <div className='flex flex-col lg:flex-row h-[94vh]'>
        <div className='h-full flex flex-half flex-col justify-center px-7 px-[144px]'>
          <h3 className='text-[48px] mb-7 lg:mb-12 font-anton uppercase'>Login</h3>
          <form onSubmit={handleSubmit} className='flex flex-col space-y-4'>
            <FormInput 
              label='Email'
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='Enter your email' />
            <FormInput 
              label='Password'
              type='password'
              value={password}
              onChange={handlePasswordChange}
              placeholder='Enter your password' />
            <button 
              type="submit" 
              className='w-fit text-left font-anton uppercase text-lg px-4 py-3 bg-olive text-white cta'
            ><span>
                Login
              </span>
            </button>
            {error && <p className="text-red-500">{error}</p>}
          </form>
        </div>
        <div className='h-full flex flex-half '>
          <img src={'/food.avif'} alt='Food' className='h-full w-full object-cover' />
        </div>
      </div>
    </>
    
  );
};

export default Login;
