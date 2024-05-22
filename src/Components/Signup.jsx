import React ,{useState} from 'react'
import { Link } from 'react-router-dom'
import Img from "../image/How-to-Improve-Website-Speed.jpg"
import { toast } from 'react-toastify'
import { createUserWithEmailAndPassword } from "firebase/auth";


import { auth, db } from "../firebase";
import { Eye, EyeSlash,  } from 'react-bootstrap-icons'; // Optional: Use icons for show/hide

import { setDoc, doc } from "firebase/firestore";
import Google from './Google';
const Signup = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email , setEmail] = useState("");
  const [name , setName] = useState("");
  const [errors, setErrors] = useState({});

  const [password , setPassword] = useState("");
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
    if (!name) {
      errors.name = 'Name is required';
    } else if (name.length < 3) {
      errors.name = 'Name must be at least 3 characters long';
    }
    if (!password) {
      errors.password = 'Password is required';
    } else if (password.length < 4) {
      errors.password = 'Password must be at least 4 characters long';
    }
    return errors;
  };
  const handleSignUp = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        toast.success("User signed up successfully!", {
          position: "top-center"
        });
        setEmail('');
        setPassword('');
        setName('');
        const user = userCredential.user;
        await setDoc(doc(db, "Users", user.uid), {
          email: user.email,
          name: name,
        });
        // Reset form values after successful sign-up
      
      } catch (error) {
        console.error("Error signing up:", error);
        toast.error(error.message, {
          position: "bottom-center"
        });
      }
    } else {
      setErrors(validationErrors);
    }
  };
  return (
    <div className='container'>
      <div className='row'>
        <div className='col-lg-6  mt-2 mb-2 bg'>

    <h1 className='text-center text-xl mt-4 m-2 '>Welcome To Signup </h1>
<form className="max-w-sm mx-auto mt-4 mb-2  p-3" onSubmit={handleSignUp}>
<div className="mb-2">
    <label for="name"  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Name</label>
    <input type="name" value={name} isInvalid={!!errors.name} name='name' onChange={(e)=>setName(e.target.value)} id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="....." />
    <div className={`text-red-500 mt-2 ${errors.name ? 'block' : 'hidden'}`}>
  {errors.name}
</div>
  </div>
  <div className="mb-2">
    <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
    <input type="email" value={email} isInvalid={!!errors.email} id="email" name='email' onChange={(e)=>setEmail(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" />
    <div className={`text-red-500 mt-2 ${errors.email ? 'block' : 'hidden'}`}>
  {errors.email}
</div>
  </div>
  <div className="mb-2">
      <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        Your password
      </label>
      <div className="relative">
        <input
          type={passwordVisible ? 'text' : 'password'}
          id="password"
          value={password}
          placeholder='************'
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        
          isInvalid={!!errors.password}
          onChange={(e)=>setPassword(e.target.value)}
        />
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 text-blue-500 focus:outline-none"
        >
          {passwordVisible ? <EyeSlash /> : <Eye />}
        </button>
        <div className={`text-red-500 mt-2 ${errors.password ? 'block' : 'hidden'}`}>
  {errors.password}
</div>
      </div>
    </div>
  <div className="flex items-start mb-2">
    <div className="flex items-center h-5">
      <input id="remember" type="checkbox" value="" required className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" />
    </div>
    <label for="remember" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Remember me</label>
  </div>
  <button type="submit" className="text-white bg-blue-700   hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full  px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Signup</button>
  {/* <span className='text-center mt-2 mb-2'>----------------or continue with -------------------</span> */}

            <Google/>           
  <p className="mt-6 text-center">
      Not a member?
      <Link
        to="/"
        className=" focus:outline-none text-darkblue-600 text-decoration-none"
        >Login</Link>
    </p>
</form>

        </div>
        <div className='col-lg-6 mt-2 mb-2'>
          <img src={Img} alt='img-sign' className='rounded-xl sign-img'  />
        </div>
        </div>  



    </div>
  )
}

export default Signup