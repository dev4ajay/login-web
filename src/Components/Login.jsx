import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Image from "../image/2024_01_11_PowerYourFuture_House1_Table_AP_0152-4ajrvS.tmp_.jpg";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from 'firebase/auth';
import { toast } from 'react-toastify';
import { Eye, EyeSlash } from 'react-bootstrap-icons'; // Optional: Use icons for show/hide
import Google from './Google';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [errors, setErrors] = useState({});

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const validate = () => {
    const errors = {};
    if (!email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Email address is invalid';
    }
    if (!password) {
      errors.password = 'Password is required';
    } else if (password.length < 4) {
      errors.password = 'Password must be at least 4 characters long';
    }
    return errors;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    } else {
      setErrors({});
    }
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("User logged in successfully!", {
        position: "top-center"
      });
      setEmail('');
      setPassword('');
    } catch (error) {
      console.error("Error logging in:", error);
      toast.error(error.message, {
        position: "bottom-center"
      });
    }
  };

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-lg-6 mb-2 mt-2'>
          <img src={Image} alt='img-full' className='rounded-xl' />
        </div>
        <div className='col-lg-6 bg mt-2 mb-2'>
          <h2 className='text-center text-xl mt-4 m-2'>Welcome To Login </h2>
          <form className="max-w-sm mx-auto mt-4 mb-2" onSubmit={handleLogin}>
            <div className="mb-2">
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
              <input
                type="email"
                name='email'
                id="email"
                className={`bg-gray-50 border border-gray-300 text-blue-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${errors.email ? 'border-red-500' : ''}`}
                placeholder="name@flowbite.com"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
              {errors.email && <div className="text-red-500 mt-2">{errors.email}</div>}
            </div>
            <div className="mb-2">
              <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
              <div className="relative">
                <input
                  type={passwordVisible ? 'text' : 'password'}
                  id="password"
                  className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${errors.password ? 'border-red-500' : ''}`}
                  placeholder='************'
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 text-blue-500 focus:outline-none"
                >
                  {passwordVisible ? <EyeSlash /> : <Eye />}
                </button>
                {errors.password && <div className="text-red-500 mt-2">{errors.password}</div>}
              </div>
            </div>
            <div className="flex items-start mb-2">
              <div className="flex items-center h-5">
                <input id="remember" required type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" />
              </div>
              <label htmlFor="remember" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Remember me</label>
            </div>
            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login</button>
            {/* <span className='text-center mt-2 mb-2'>----------------or continue with -------------------</span> */}

         <Google/>
                        
            <p className="mt-6 text-center">
              Not a member?
              <Link to="/signup" className="focus:outline-none text-darkblue-600 text-decoration-none">Signup</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
