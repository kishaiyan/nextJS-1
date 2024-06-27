"use client";
import { useEffect, useState } from "react"
import Link from "next/link";
import {useRouter} from "next/navigation";
import axios from "axios";
import {toast, Toaster} from "react-hot-toast";

export default function LoginPage() {
  const router=useRouter();

  const [user,setUser]=useState({
    email:"",
    password:"",
  })

  const [buttondisabled,setButtondisabled]=useState(true);
  const [loading,setLoading]=useState(false);


  useEffect(()=>{
    if(user.email.length>0 && user.password.length>0){
      setButtondisabled(false)
    }else{
      setButtondisabled(true)
    }
  
  },[user])

  const tryLogin = async()=>{
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login",user);
      console.log("Login Success",response)
      toast.success("Login Success")
      router.push("/profile")

    } catch (error:any) {
      console.log("Login failed",error.message);
      toast.error(error.message);
    
    }finally{
      setLoading(false);
    }
  }
  

 

  return(
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Toaster
      position="top-center"
      reverseOrder={false}
      />
    <h1 className="text-center text-white text-2xl">Login</h1>
    <label htmlFor="username">Email</label>
    <input
    className="p-2 text-black border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
      id="username"
      type="text"
      value={user.email}
      onChange={(e)=>setUser({
        ...user,
        email:e.target.value
      })}
      placeholder="username"
      />
      <label htmlFor="email">Password</label>
    <input
    className="p-2 border text-black border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
      id="email"
      type="password"
      value={user.password}
      onChange={(e)=>setUser({
        ...user,
        password:e.target.value
      })}
      placeholder="email"
      />
      <button 
      onClick={tryLogin}
      className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600" >
        {buttondisabled? "Enter Credentials":"Login"}
      </button>
      <Link className="p-2 mb-4 text-blue focus:outline-none focus:border-gray-600" href="/sendreset">Forgot password?</Link>
      <Link className="p-2 mb-4 focus:outline-none focus:border-gray-600" href="/signup">Sign Up</Link>
      </div>
  )
}