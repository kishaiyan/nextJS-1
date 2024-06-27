import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest,NextResponse } from "next/server";
import User from "@/models/userModel";
import { dbConnect } from "@/dbConfig/dbConfig";


dbConnect();

export async function GET(request:NextRequest){

  try {
   const userID = await getDataFromToken(request);
   const user = await User.findOne({ _id: userID}).select("-password -isAdmin")
   return NextResponse.json({
    message:"User Found",
    data:user
   },{status:202})
  } 
  catch (error:any) {
    return NextResponse.json({
      error:error.message
    },{
      status:400
    })
  }
}