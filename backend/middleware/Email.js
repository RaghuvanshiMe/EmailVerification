import { Verification_Email_Template } from "../libs/EmailTemplate.js";
import { transporter } from "./Email.config.js";


export const SendVerificationCode = async(email,verificationCode)=>{
    try {
        const response = await transporter.sendMail({
              from: '"Raghuvanshi" <mihirsingh8383@gmail.com>',
              to: email,
              subject: "Verify your Email",
              text: "Verify Your Email",
              html:Verification_Email_Template.replace("{verificationCode}", verificationCode),
            });
            console.log('Email send successfully',response)
    } catch (error) {
        console.log('Email error')
    }
}
