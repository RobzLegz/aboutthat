import { PostInterface } from "../interfaces/postInterface";

const getPostById = (posts: PostInterface[] | null, id: string | string[]) => {
    if(!posts){
        return null;
    }

    const post = posts.find(u => u._id === id);

    if(!post){
        return null;
    }

    return post;
}

export default getPostById;