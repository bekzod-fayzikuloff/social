import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { PageNotFound } from "./NotFoundPage";
import PostModal from "../components/PostModal";
import { getResponse } from "../services/utils/sendRequest";

const PostPage = () => {
  const { authToken } = useContext(AuthContext)
  const [isExist, setExist] = useState(true)
  const [post, setPost] = useState(null)
  const { postId } = useParams()

  useEffect(() => {
    async function getResult()  {
      const response = await getResponse(
        `${process.env.REACT_APP_BACKEND_URL}/profile/post/${postId}/`,
        String(authToken.access)
      )
      const responseResult = await response.json()
      if (response.status === 200) {
        setPost(responseResult)
      } else {
        setExist(false)
      }
    }

    getResult().then()
  }, [authToken.access, postId])

  return (
      <div>
        {isExist ? <PostModal post={post} authToken={authToken}/> : <PageNotFound />}
      </div>
    )
}

export default PostPage;