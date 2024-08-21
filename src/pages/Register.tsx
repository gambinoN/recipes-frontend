import React, { useState } from 'react';
import { passwordStrength } from 'check-password-strength'
import FormInput from '../components/FormInput';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordStrengthText, setPasswordStrengthText] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate();
  const goToLoginPage = () => navigate('/login');

  const validateForm = (username: string, email: string, password: string): string | null => {
    if (!username || !email || !password) {
      return 'All fields are required!';
    }
  
    if (!/\S+@\S+\.\S+/.test(email)) {
      return 'Invalid email format';
    }
  
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    setIsLoading(true); 
  
    const error = validateForm(username, email, password);
    if (error) {
      setError(error);
      setIsLoading(false); 
      return;
    }
  
    setError(''); 
  
    try {
      const response = await fetch('http://localhost:3001/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });
  
      if (response.ok) {
        setIsLoading(false); 
        goToLoginPage()
      } else {
        const errorText = await response.text();
        setError(`Login failed! ${errorText}`);
        setIsLoading(false); 
      }
    } catch (error) {
      setIsLoading(false);  
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const password = e.target.value;
    setPassword(password);
    const strength = passwordStrength(password).value;
    setPasswordStrengthText(strength)
  }

  return (
    <>
      <div className='flex flex-col lg:flex-row h-[94vh]'>
        <div className='h-full flex flex-half flex-col justify-center px-7 px-[144px]'>
          <h3 className='text-[48px] mb-7 lg:mb-12 font-anton uppercase'>Register Account</h3>
          <form onSubmit={handleSubmit} className='flex flex-col space-y-4'>
            <FormInput 
              label='Username'
              type='username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder='Enter your username' />
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
            <p>{passwordStrengthText}</p>
            <button 
              type="submit" 
              className='w-fit text-left font-anton uppercase text-lg px-4 py-3 bg-olive text-white cta'
              disabled={passwordStrengthText === 'Too weak' || isLoading}
            ><span>
                {isLoading ? 'Registering...' : 'Register'}
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

export default Register;
