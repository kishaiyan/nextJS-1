"use client";
import Link from "next/link";
import React, { useEffect,useState } from "react";
import {useRouter} from 'next/navigation';
import axios from 'axios';
import {toast, Toaster} from "react-hot-toast";

export default function SignupPage(){
  const router=useRouter();
  const [user,setUser]= useState({
    email:"",
    password:"",
    username:"",
  })
  const [buttondisabled,setButtondisabled]=useState(true);
  const [loading,setLoading]=useState(false)
  
  const onSignUp = async ()=>{
    try {
      setLoading(true)
      const response = await axios.post("api/users/signup",user)
      console.log("Signup success",response.data);
      router.push("/login");
    } catch (error:any) {
      console.log("Signup failed: ",error.response);
      toast.error(error.response.data.error)
    }
    finally{
      setLoading(false)
    }
  }

  useEffect(() => {
    if(user.email.length>0 && user.username.length>0 && user.password.length>0)
      {
        setButtondisabled(false);
      }
      else{
        setButtondisabled(true);
      }
  }, [user])



 return(
  
  <div className="flex flex-col items-center justify-center min-h-screen py-2">
    <Toaster
    position="top-center"
    reverseOrder={false}
    />
    <h1 className="text-center text-white text-2xl">{loading? "Processsing" : "SignUp"}</h1>
    <label htmlFor="username">Username</label>
    <input
    className="p-2 text-black border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
      id="username"
      type="text"
      value={user.username}
      onChange={(e)=>setUser({
        ...user,
        username:e.target.value
      })}
      placeholder="username"
      />
      <label htmlFor="email">email</label>
    <input
    className="p-2 border text-black border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
      id="email"
      type="text"
      value={user.email}
      onChange={(e)=>setUser({
        ...user,
        email:e.target.value
      })}
      placeholder="email"
      />
      <label htmlFor="password">password</label>
    <input
    className="p-2 border text-black border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
      id="password"
      type="password"
      value={user.password}
      onChange={(e)=>setUser({
        ...user,
        password:e.target.value
      })}
      placeholder="password"
      />
      <button 
      onClick={onSignUp}
      className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 " >
        {buttondisabled ? "Cannot SignUp" : "SignUp"}
      </button>
      <Link className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600" href="/login">Login Here</Link>
  </div>
 )
}