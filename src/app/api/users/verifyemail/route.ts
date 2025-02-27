import { dbConnect } from "@/dbConfig/dbConfig";
import { NextRequest,NextResponse } from "next/server";
import User from "@/models/userModel";




dbConnect()

export async function POST(request:NextRequest){
  try {
    const reqBody=await request.json();
    console.log(reqBody);
    const {token}=reqBody;
    const user= await User.findOne({verifyToken:token,verifyTokenExpiry: {$gt:Date.now()}})
    if(!user){
      return NextResponse.json({error:"Invalid Token"},{status:400})
    }
    user.isVerified = true;
    user.verifyToken = undefined
    user.verifyTokenExpiry=undefined
    await user.save()
    console.log(user)
    
    return NextResponse.json({message:"Successfully Verified your account",success:true,},{status:201})

  } catch (error:any) {
    return NextResponse.json({
      error:error.message
    },{status:500})
  }
}