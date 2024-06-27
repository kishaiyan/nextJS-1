"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { NextResponse } from "next/server";
import React,{useState,useEffect} from "react";

export default function ResetPassword(){
  const router=useRouter();
  const [newPassword,setNewPassword]=useState("")
  const [confirmPassword,setConfirmPassword]=useState("")
  const [token,setToken]=useState("")
  useEffect(()=>{
    const incomingToken=window.location.search.split("=")[1];
    setToken(incomingToken || "");
  },[])
  
  const resetPassword = async()=>{
    try {
      if(newPassword!==confirmPassword){
        console.log("password doesn't match")
      }
      const response=await axios.put("/api/users/resetpassword",{token,newPassword})
      console.log(response);
    } catch (error:any) {
      console.log(error.message)
      return NextResponse.json(error.message)
    }
  }

  return(
    <div>
      <h1 className="text-center justify-center">Reset your password</h1>
      <input type="password" placeholder="New Password" value={newPassword} onChange={(e)=>{setNewPassword(e.target.value)}} className="text-black p-2 my-5 mx-2 text-center justify-center"/>
      <br></br>
      <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e)=>{setConfirmPassword(e.target.value)}} className="text-black p-2 my-5 mx-2 text-center justify-center"/>
      <button onClick={resetPassword}>Submit</button>
    </div>
  )
}