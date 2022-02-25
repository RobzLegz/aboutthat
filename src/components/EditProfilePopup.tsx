import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { selectUser, UserInfo } from '../redux/slices/userSlice';
import { updateInfo } from '../requests/userRequests';

interface Props{
    setEditing: React.Dispatch<React.SetStateAction<boolean>>;
}

const EditProfilePopup: React.FC<Props> = ({setEditing}) => {
    const userInfo: UserInfo = useSelector(selectUser);

    const dispatch = useDispatch();

    const [name, setName] = useState(userInfo.info?.name);
    const [email, setEmail] = useState(userInfo.info?.email);
    const [username, setUsername] = useState(userInfo.info?.username);
    const [uploadFile, setUploadFile] = useState<any>(null);
    const [avatar, setAvatar] = useState(userInfo.info?.avatar);
    const [course, setCourse] = useState(userInfo.info?.course);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    if(!userInfo.info){
        return null;
    }

    const update = (e: any) => {
        e.preventDefault();

        if(!name || !username || !email || (!course && course !== "")){
            return setEditing(false);
        }

        if(name === userInfo.info?.name && email === userInfo.info?.email && username === userInfo.info?.username && course === userInfo.info?.course && avatar === userInfo.info?.avatar){
            return setEditing(false);
        }

        updateInfo(name, username, email, course, userInfo.info?.avatar, uploadFile, userInfo.token, dispatch, setLoading, setEditing);
    }

    const changeFile = (e: any) => {
        setError("");
        if(e.target.files && e.target.files[0]){
            const file = e.target.files[0];

            if(file.size > 1024 * 1024){
                return setError("File size too large!")
            }

            if(file.type !== "image/jpeg" && file.type !== "image/png"){
                return setError("Incorrect file format!")
            }

            setAvatar(URL.createObjectURL(e.target.files[0]))
            setUploadFile(e.target.files[0]);
        }
    }

    return (
        <div className="fixed top-0 left-0 z-40 w-full h-full bg-tpBg flex items-center justify-center">
            <form className="bg-white flex py-5 w-full sm:w-auto sm:px-40 flex-col items-center justify-center relative">
                {
                    error && (
                        <div className="w-full p-2 bg-red-700 flex items-center justify-center">
                            <p className="text-white">{error}</p>
                        </div>
                    )
                }
                
                <img 
                    src="/svg/close.svg" 
                    alt="edit" 
                    className="absolute top-4 right-4 w-6 h-6 cursor-pointer" 
                    onClick={() => setEditing(false)}
                />

                <h2 className="mb-10">Edit profile</h2>

                <div className="flex">
                    <input 
                        type="file" 
                        name="avatar" 
                        id="avatar" 
                        className="hidden"
                        accept="image/*"
                        onChange={(e) => changeFile(e)}
                    />

                    <label 
                        htmlFor="avatar"
                        className="w-[70px] sm:w-[90px] h-[110px] sm:h-[130px] mr-10"    
                    >
                        <img 
                            src={avatar} 
                            alt={`${username}'s RTK profile avatar`}
                            className="object-cover hover:opacity-75 duration-75 w-full h-full"
                        />
                    </label>

                    <div className="">
                        <div className="flex flex-col w-full mb-4">
                            <label htmlFor="username" className="mb-1">Username</label>

                            <input 
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="h-11"                        
                                type="text" 
                                placeholder="username"
                                name="username" 
                                id="username" 
                            />
                        </div>

                        <div className="flex flex-col w-full mb-4">
                            <label htmlFor="name" className="mb-1">name</label>

                            <input 
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="h-11"                        
                                type="text" 
                                placeholder="name"
                                name="name" 
                                id="name" 
                            />
                        </div>

                        <div className="flex flex-col w-full mb-4">
                            <label htmlFor="email" className="mb-1">Email</label>

                            <input 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="h-11"                        
                                type="text" 
                                placeholder="email"
                                name="email" 
                                id="email" 
                            />
                        </div>

                        <div className="flex flex-col w-full mb-4">
                            <label htmlFor="course" className="mb-1">Course</label>

                            <input 
                                value={course}
                                onChange={(e) => setCourse(e.target.value)}
                                className="h-11"                        
                                type="text" 
                                placeholder="course"
                                name="course" 
                                id="course" 
                            />
                        </div>

                        <button
                            onClick={(e) => update(e)}
                            type="submit"
                            className="bg-rtkBlue text-white h-10 w-20 md:w-36 cursor-pointer hover:bg-rtkBlue-darker duration-200 rounded-md"
                        >{loading ? "" : "Update"}</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default EditProfilePopup