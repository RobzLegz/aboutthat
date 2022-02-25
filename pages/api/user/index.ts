import connectDB from "../../../src/utils/connectDB";
import Users from "../../../src/models/userModel";
import auth from "../../../src/middleware/auth";

connectDB();

export default async (req: any, res: any) => {
    switch(req.method){
        case "GET":
            await getAllUsers(req, res);
            break;
        case "PUT":
            await updateUserInfo(req, res);
            break;
        case "DELETE":
            await deleteProfile(req, res);
            break;
    }
}

const getAllUsers = async (req: any, res: any) => {
    try{
        const users = await Users.find();

        res.json(users);
    }catch(err: any){
        return res.status(500).json({err: err.message});
    }
}

const updateUserInfo = async (req: any, res: any) => {
    try{
        const {name, username, email, course, avatar} = req.body;

        const user = await auth(req, res);

        await user.updateOne({
            name: name,
            username: username,
            email: email,
            course: course,
            avatar: avatar
        });

        res.json("Updated successfuly");
    }catch(err: any){
        return res.status(500).json({err: err.message});
    }
}


const deleteProfile = async (req: any, res: any) => {
    try{
        const user = await auth(req, res);

        await Users.findByIdAndDelete({id: user._id.toString()})

        res.json("Delete successful");
    }catch(err: any){
        return res.status(500).json({err: err.message});
    }
}