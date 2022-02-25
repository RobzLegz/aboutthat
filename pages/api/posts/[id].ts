import connectDB from "../../../src/utils/connectDB";
import Posts from "../../../src/models/postModel";
import auth from "../../../src/middleware/auth";

connectDB();

export default async (req: any, res: any) => {
    switch(req.method){
        case "PUT":
            await updatePost(req, res);
            break;
        case "DELETE":
            await deletePost(req, res);
            break;
    }
}

const updatePost = async (req: any, res: any) => {
    try{
        const {text, media} = req.body;

        const {id} = req.query;

        const user = await auth(req, res);
        if(!user){
            return res.status(400).json({err: "Unauthorized"}); 
        }
        
        await Posts.findByIdAndUpdate({_id: id, user: user._id}, {
            text,
            media
        });

        res.json("Updated successfuly");
    }catch(err: any){
        return res.status(500).json({err: err.message});
    }
}

const deletePost = async (req: any, res: any) => {
    try{
        const {id} = req.query;

        const user = await auth(req, res);
        if(!user){
            return res.status(400).json({err: "Unauthorized"}); 
        }
        
        await Posts.findByIdAndDelete({_id: id, user: user._id});

        res.json("Delete successful");
    }catch(err: any){
        return res.status(500).json({err: err.message});
    }
}