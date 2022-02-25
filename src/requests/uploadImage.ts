import verifyImage from "../middleware/verifyImage";

const uploadImage = async (file: any) => {
    const UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUD_UPDATE_PRESET;
    const CLOUDINARY_URL = process.env.NEXT_PUBLIC_CLOUDINARY_URL;

    const imageValid = verifyImage(file);

    if(file && file !== null && imageValid === true && CLOUDINARY_URL && UPLOAD_PRESET){
        let fileForm = new FormData();
        fileForm.append("file", file);
        fileForm.append("upload_preset", UPLOAD_PRESET);

        const res = await fetch(CLOUDINARY_URL, {
            method: "POST",
            body: fileForm, 
        });

        const resData = await res.json();

        const url = resData.secure_url;

        return url;
    }

    return "";
}

export default uploadImage;