import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { postInfo, selectPosts } from "../redux/slices/postSlice";
import { selectUser, UserInfo } from "../redux/slices/userSlice";
import { createPost } from "../requests/postRequests";

function HomeContainer() {
  const postInfo: postInfo = useSelector(selectPosts);
  const userInfo: UserInfo = useSelector(selectUser);

  const dispatch = useDispatch();

  if(!postInfo.posts && !userInfo.info){
    return null;
  }

  const [text, setText] = useState("");
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [media, setMedia] = useState("");
  const [file, setFile] = useState<any>(null);

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

      setMedia(URL.createObjectURL(e.target.files[0]))
      setFile(e.target.files[0]);
    }
  }

  return (
    <div className="w-full h-full flex justify-start items-center flex-col pt-20">
      <div className="w-[600px]">
        {
          userInfo.info && userInfo.info.role === "admin" && (
            <form className="bg-white w-full mb-4 rounded-md">
              <input 
                type="text" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full rounded-t-md p-2"
                placeholder="Add title"
              />

              <textarea 
                placeholder="Enter text"
                name="post" 
                id="post" 
                value={text}
                onChange={(e) => setText(e.target.value)}
                cols={20} 
                rows={6}
                className="w-full rounded-t-md p-2"
              ></textarea>

              {
                error && (
                  <div className="w-full p-2 bg-red-700 flex items-center justify-center">
                    <p className="text-white">{error}</p>
                  </div>
                )
              }

              <div className="w-full rounded-b-md flex items-end justify-end">
                <input 
                  type="file" 
                  name="post_file" 
                  id="post_file" 
                  className="hidden"
                  accept="image/*"
                  onChange={(e) => changeFile(e)}
                />

                {
                  media ? (
                    <label 
                        htmlFor="post_file"
                    >
                      <img 
                        src={media} 
                        alt="post file source" 
                        className="h-10 mr-2" 
                      />
                    </label>
                  ) : (
                    <label 
                      htmlFor="post_file"
                      className="bg-aboutThat_red text-white h-10 w-20 md:w-36 cursor-pointer duration-200 flex items-center justify-center"
                    >
                      add file
                    </label>
                  )
                }
                  
                <button
                  onClick={(e) => createPost(e, text, title, file, userInfo.token, dispatch, loading, setLoading, setError, setFile, setText, setTitle, setMedia)}
                  type="submit"
                  className="bg-aboutThat_red text-white h-10 w-20 md:w-36 cursor-pointer duration-200 rounded-br-md"
                >post</button>
              </div>
          </form>
          )
        }
      </div>
    </div>
  )
}

export default HomeContainer