import {dbConnect} from "@/dbConfig/dbConfig"
import User from '@/models/userModel';
import { NextRequest,NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { sendEmail } from "@/helpers/mailer";

dbConnect()

export async function POST(request:NextRequest){
  try {
    const reqBody = await request.json() 
    const {email,password}=reqBody;
    console.log(reqBody)

    //check if user exists
    const user=await User.findOne({email})
    if(!user){
      return NextResponse.json({message:"User doesnot exist"},{status:400})
    }
    const validPassword =await bcryptjs.compare(password,user.password)
    if(!validPassword){
      return NextResponse.json({message:"Invalid Password! Try again"},{status:400})
    }
    
    //Create token data
    const tokenData={
      id:user._id,
      username:user.username,
      email:user.email,
    }
    //Create token with the DATA created
    const token = await jwt.sign(tokenData,process.env.TOKEN_SECRET!,{expiresIn: "1d"})

    const response = NextResponse.json({
      message:"Login Successful",
      success:true,
    })

    response.cookies.set("token",token,{
      httpOnly:true,
    })

    return response;

  } catch (error:any) {
    return NextResponse.json({error:error.message},{status:500})
  }
}
export async function PUT(request:NextRequest){
  try {
    const reqBody=await request.json();
    const {email}=reqBody
    const user = await User.findOne({email})
    console.log(user)
    if(!user){
      return NextResponse.json({error:"Email doesnt match with any account"},{status:400})
    }
    await sendEmail({email:user.email,emailType:"RESET",userId:user._id})
    return NextResponse.json({
      message:"Reset Link has been sent to your email",
      success:true
    },{status:200})
    
  } catch (error:any) {
    return NextResponse.json({error:error.message})
  }
}