import { UserInterface } from "../interfaces/userInterface";

const getUserById = (users: UserInterface[] | null, userId: string) => {
    if(!users){
        return null;
    }

    const user = users.find(u => u._id === userId);

    if(!user){
        return null;
    }

    return user;
}

export default getUserById;