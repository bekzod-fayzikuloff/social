import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { getResponse } from "../services/utils/sendRequest";

const NewsFeedPage = () => {
    const [result, setResult] = useState([])
    const { authToken, logoutUser } = useContext(AuthContext)

    useEffect(() => {
      getResult().then(

      )
    }, [])

    async function getResult()  {
      const response = await getResponse(
        `${process.env.REACT_APP_BACKEND_URL}/`,
        String(authToken.access)
      )
      const responseResult = await response.json()
      if (response.status === 200) {
        setResult(responseResult)
      } else if (response.statusText === 'Unauthorized') {
        logoutUser()
      }
    }


  return (
      <div>
        <p>{JSON.stringify(result)}</p>
      </div>
    )
}

export default NewsFeedPage;