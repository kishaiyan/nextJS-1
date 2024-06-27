import nodemailer from "nodemailer";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";

export const sendEmail = async({email,emailType,userId}:any)=>{
  try {
    //Create a Hashed Token to send via email
    const hashedValue = await bcryptjs.hash(userId.toString(), 10)

    if(emailType==='VERIFY'){
    await User.findByIdAndUpdate(userId,
      {verifyToken:hashedValue,
      verifyTokenExpiry:Date.now()+ 36000000}
    )}
    else if(emailType==="RESET"){
      await User.findByIdAndUpdate(userId,{
        forgotPasswordToken:hashedValue,
        forgotPasswordtokenExpiry:Date.now()+36000000
      })
    }
    const transporter=nodemailer.createTransport({
     
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "3a1f6364d26205",
          pass: "d7d783e9c0d7a4"
        }
    })

    const mailOptions={
      from:"koolkicha@gmail.com",
      to:email,
      subject: emailType === "VERIFY"? "Verify Your Account" : "Reset Your Password",
      html: `<p>Click <a href="${process.env.DOMAIN}/${emailType==="VERIFY"?"verifyemail":"resetpassword"}?token=${hashedValue}"> here </a> to ${emailType === "VERIFY" ? "Verify your email":
      "Reset your password"} or Copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/verifyemail?${hashedValue}</p>`
    }
    const mailresponse = await transporter.sendMail(mailOptions);
    return mailresponse;
  } catch (error:any) {
    throw new Error(error.message);
  }
}
