"use client";
import axios from 'axios';
import Link from "next/link";
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function ProfilePage(){
  const router=useRouter()
  const [data,setData]=useState("empty")
  const logOut = async ()=>{
   try {
    const response = await axios.get("/api/users/logout")
    toast.success("Logged off successfully")
    router.push("/login")
   } catch (error:any) {
    console.log(error.message)
    toast.error(error.message)
   }
  }
  const getUserDetails = async()=>{
    try {
      const response=await axios.get("/api/users/me")   
      console.log(response.data);
      setData(response.data.data._id)
    } catch (error:any) {
      console.log(error.message)
    }
  }
  return(
    <>
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
    <Toaster
    position="top-center"
    reverseOrder={false}
    />
      <h1>Profile</h1>
      <hr />
      <p>profile page</p>
      <h2 className="p-1">{data === "empty" ? "Nothing" : <Link href={`/profile/${data}`}>{data}</Link> }</h2>
      <button
      onClick={logOut}
      className="bg-blue-400 mt-4 px-4 py-2 rounded hover:bg-blue-700">
        Logout
      </button>
      <button
      onClick={getUserDetails}
      className="bg-green-700 mt-4 px-4 py-2 rounded hover:bg-green-900">
       Details
      </button>
    </div>
    </>
  )
}