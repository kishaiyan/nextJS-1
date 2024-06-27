"use client";
import axios from "axios";
import { useState } from "react";
import { NextResponse } from "next/server";

export default function sendResetEmail(){
  const [email,setEmail]=useState("")

  const emailReset=async()=>{
   try {
    await axios.put("/api/users/login",{ email })
    return NextResponse.json({message:"Reset Link sent to your email"})
   } catch (error:any) {
      return NextResponse.json({error:"Something went wrong"})
   }
  }

  return(
    <div>
      <h1>Forgotten Your Password?</h1>
      <p>Help us with your email to reset the password to your account</p>
      <input type="text" placeholder="abc@some.com" value={email} onChange={(e)=>{setEmail(e.target.value)}} className="text-black m-4 p-2"/>
      <button onClick={emailReset}>submit</button>
    </div>
  )
}