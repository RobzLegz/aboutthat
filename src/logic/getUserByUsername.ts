import { UserInterface } from "../interfaces/userInterface";

const getUserByUsername = (users: UserInterface[] | null, username: string | string[] | undefined) => {
    if(!users || !username){
        return null;
    }

    const user = users.find(u => u.username === username);

    if(!user){
        return null;
    }

    return user;
}

export default getUserByUsername;