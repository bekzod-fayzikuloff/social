import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { PageNotFound } from "./NotFoundPage";
import PostModal from "../components/PostModal";

const PostPage = () => {
  const { authToken } = useContext(AuthContext)
  const [isExist, setExist] = useState(true)
  const [post, setPost] = useState(null)
  const { postId } = useParams()

  useEffect(() => {
    async function getResult()  {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/profile/post/${postId}/`,
        {
          method: "GET",
          headers: {
            "Content-type": "application/json",
            "Authorization": `Bearer ${String(authToken.access)}`
          }
        });
      const responseResult = await response.json()
      if (response.status === 200) {
        setPost(responseResult)
      } else {
        setExist(false)
      }
    }

    getResult().then()
  }, [])

  return (
      <div>
        {isExist ? <PostModal post={post} posts={null}/> : <PageNotFound />}
      </div>
    )
}

export default PostPage;