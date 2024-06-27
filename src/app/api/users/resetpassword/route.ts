import { dbConnect } from "@/dbConfig/dbConfig";
import User from '@/models/userModel';
import bcryptjs from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

dbConnect();

export async function PUT(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { token, newPassword } = reqBody;

 
    const user = await User.findOne({forgotPasswordToken:token,forgotPasswordtokenExpiry:{$gt:Date.now()}});
    
    if (!user) {
      return NextResponse.json({ error: "Invalid token or user not found" }, { status: 400 });
    }

    // Hash the new password
    const hashedPassword = await bcryptjs.hash(newPassword, 10);
    user.password = hashedPassword;
    user.forgotPasswordToken=undefined;
    user.forgotPasswordtokenExpiry=undefined;
    await user.save();

    return NextResponse.json({ message: "Password reset successfully" });
    
  } catch (error:any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
