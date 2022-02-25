const valid = (username: string, name: string, email: string, password: string) => {
    if(!username || !name || !email || !password){
        return "Please fill in all fields.";
    }

    if(username.length < 4){
        return "Your username can't be that short.";
    }

    if(username.length > 20){
        return "Your username can't be that long.";
    }

    if(name.length > 30){
        return "Your name can't be that long.";
    }

    if(!validateEmail(email)){
        return "Invalid email.";
    }

    if(password.length < 6){
        return "Password must be at least 6 characters.";
    }
}

const validateEmail = (email: string) => {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|((kcrtk+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

const validatePhoneNumber = (phoneNumber: string) => {
    if(phoneNumber.length === 8){
        return true;
    }

    return false;
}

const validateAddress = (address: string) => {
    if(address.length < 7){
        return false;
    }
    return true;
}

export default valid;

export {
    validateEmail,
    validatePhoneNumber,
    validateAddress,
};