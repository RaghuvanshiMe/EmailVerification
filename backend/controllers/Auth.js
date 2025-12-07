import { SendVerificationCode } from "../middleware/Email.js";
import Usermodel from "../models/user.js";
import bcrypt from "bcryptjs";

const register = async (req, res) => {
    try {
        const { email, password, name } = req.body;

        if (!email || !name || !password) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        const ExistsUser = await Usermodel.findOne({ email });
        if (ExistsUser) {
            return res.status(400).json({ success: false, message: "User already exists, please login" });
        }

        const hashPassword = bcrypt.hashSync(password, 10);
        const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

        const newUser = new Usermodel({
            email,
            name,
            password: hashPassword,
            verificationCode
        });

        await newUser.save();

        SendVerificationCode(newUser.email, verificationCode);

        return res.status(200).json({ success: true, message: "User registered successfully" });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};

const VerifyEmail = async (req, res) => {
    try {
        const { email, code } = req.body;

        if (!email || !code) {
            return res.status(400).json({ success: false, message: "Email and verification code are required" });
        }

        const user = await Usermodel.findOne({ email });

        if (!user) {
            return res.status(400).json({ success: false, message: "User not found" });
        }

        if (user.verificationCode !== code) {
            return res.status(400).json({ success: false, message: "Invalid or expired verification code" });
        }

        user.isVerified = true;
        user.verificationCode = "";
        await user.save();

        return res.status(200).json({ success: true, message: "Email verified successfully" });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};


export { register, VerifyEmail };  
