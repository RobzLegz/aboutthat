const verifyImage = (file: any) => {
    if(!file){
        return"No files were uploaded."
    }

    if(file.size > 1024 * 1024){
        return"Size too large."
    }

    if(file.type !== "image/jpeg" && file.type !== "image/png"){
        return "File format is incorrect.";
    }

    return true;
}

export default verifyImage;