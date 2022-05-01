import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const HomePage = () => {
    const [result, setResult] = useState()
    const { authToken, logoutUser } = useContext(AuthContext)

    useEffect(() => {
      getResult().then(

      )
    }, [])

    async function getResult()  {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/`,
        {
          method: "GET",
          headers: {
            "Content-type": "application/json",
            "Authorization": `Bearer ${String(authToken.access)}`
          }
        });
      const responseResult = await response.json()
      if (response.status === 200) {
        setResult(responseResult)
      } else if (response.statusText === 'Unauthorized') {
        logoutUser()
      }
    }

    return (
      <h1>{ result }</h1>
    )
}

export default HomePage;