import connectDB from "../../../src/utils/connectDB";
import bcrypt from "bcrypt";
import Users from "../../../src/models/userModel";
import { createAccessToken, createRefreshToken } from "./../../../src/utils/generateToken";

connectDB();

export default async (req: any, res: any) => {
    switch(req.method){
        case "POST":
            await login(req, res)
            break;
    }
}

const login = async (req: any, res: any) => {
    try{
        const { username, password } = req.body;

        const user = await Users.findOne({ username: username });
        if(!user){
            return res.status(400).json({err: "This username does not exist."});
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({err: "Incorrect password."})
        }

        const access_token = createAccessToken({id: user._id});
        const refresh_token = createRefreshToken({id: user._id});

        res.json({
            msg: "Login Success!",
            access_token: access_token,
            refresh_token: refresh_token,
            user: user,
        });
    }catch(err: any){
        return res.status(500).json({err: err.message})
    }
}