import { NextResponse } from "next/server";


export async function GET(){
  try {
    const response = NextResponse.json({
      message:"Logout Successful",
      success:true
    }) 
    response.cookies.set("token","", {
      httpOnly:true,
      expires:new Date(0)
    })
    return response;
  } catch (error:any) {
    return NextResponse.json({message:"Logout Failed"},{status:500})
    console.log("Logout Failed",error)
  }
}