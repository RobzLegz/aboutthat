import connectDB from "../../../src/utils/connectDB";
import Users from "../../../src/models/userModel";
import auth from "../../../src/middleware/auth";

connectDB();

export default async (req: any, res: any) => {
    switch(req.method){
        case "PUT":
            await updateUserInfo(req, res);
            break;
        case "DELETE":
            await deleteProfile(req, res);
            break;
    }
}

const updateUserInfo = async (req: any, res: any) => {
    try{
        const {username, avatar} = req.body;

        const user = await auth(req, res);

        await user.updateOne({
            username: username,
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