import connectDB from "../../../src/utils/connectDB";
import Posts from "../../../src/models/postModel";
import auth from "../../../src/middleware/auth";

connectDB();

export default async (req: any, res: any) => {
    switch(req.method){
        case "GET":
            await getPosts(req, res);
            break;
        case "POST":
            await createPost(req, res);
            break;
    }
}

const createPost = async (req: any, res: any) => {
    try{
        const { text, media } = req.body;

        if(!text && !media){
            return res.status(400).json({err: "Can't submit an empty post"}); 
        }

        const user = await auth(req, res);
        if(!user){
            return res.status(400).json({err: "Unauthorized"}); 
        }

        const newPost = new Posts({
            text: text,
            media: media,
            user: user._id
        });

        await newPost.save();

        res.json(newPost);    
    }catch(err: any){
        return res.status(500).json({err: err.message});
    }
}

const getPosts = async (req: any, res: any) => {
    try{
        const user = await auth(req, res);
        if(!user){
            return res.status(400).json({err: "Unauthorized"}); 
        }

        const posts = await Posts.find().sort({createdAt: -1});

        res.json(posts);
    }catch(err: any){
        return res.status(500).json({err: err.message});
    }
}