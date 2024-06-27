import {dbConnect} from "@/dbConfig/dbConfig"
import User from '@/models/userModel';
import { NextRequest,NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";


dbConnect()




export async function POST(request:NextRequest){
  try {
    const reqBody=await request.json();
    const {username,email,password} = reqBody

    console.log(reqBody);
    //check if the user exist
    const user=await User.findOne({email})
    if(user){
      return NextResponse.json({error:"User already exists"},{status:400})
    }

    //hashPassowrd
    const salt=await bcryptjs.genSalt(10)
    const hashedPassword=await bcryptjs.hash(password,salt)

    const newUser = new User({
      username,
      email,
      password:hashedPassword
    })
    const savedUser=await newUser.save()
   
    //Sending Verification Email to the user once created
    await sendEmail({email:savedUser.email,emailType:"VERIFY",userId:savedUser._id})

    return NextResponse.json({
      message:"User Created Successfully",
      success:true,
    
    })

  } catch (error:any) {
    return NextResponse.json({error:error.message},{status:500})
  }
}
