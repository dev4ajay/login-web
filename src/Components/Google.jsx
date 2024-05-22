import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import React from 'react'
import { FcGoogle } from "react-icons/fc";
import { auth } from '../firebase';
import { toast } from 'react-toastify';
const Google = () => {
    function googleLogin(){
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth ,provider).then(async(result)=>{
            console.log(result);
            if(result.user){
            toast.success("User logged in successfully" ,{
                position:"top-center"
            })

            }else{
                toast.error("Invalid email")
            }
        })
    }
  return (
    <div>
          <div onClick={googleLogin}
                                className="mt-3 mb-2 transition-colors focus:ring-2 p-1 disabled:cursor-not-allowed bg-white hover:bg-gray-100 w-full  text-gray-900 border border-gray-200 disabled:bg-gray-300 disabled:text-gray-700 rounded-lg  " style={{cursor:"pointer"}}>
                                <span
                                    className="flex items-center justify-center gap-1 font-medium py-1 px-2.5 text-base false">
                                      <FcGoogle/>
                                
                                    Sign in with Google
                                </span>
                            </div>
    </div>
  )
}

export default Google