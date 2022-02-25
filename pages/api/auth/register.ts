import connectDB from "../../../src/utils/connectDB";
import valid from "../../../src/utils/valid";
import bcrypt from "bcrypt";
import Users from "../../../src/models/userModel";

connectDB();

export default async (req: any, res: any) => {
    switch(req.method){
        case "POST":
            await register(req, res)
            break;
    }
}

const register = async (req: any, res: any) => {
    try{
        const { username, password } = req.body;

        const passwordHash = await bcrypt.hash(password, 12);

        const newUser = new Users({
            username: username, 
            password: passwordHash
        });

        await newUser.save();

        res.json({msg: "Register Success!"});
    }catch(err: any){
        return res.status(500).json({err: err.message});
    }
}