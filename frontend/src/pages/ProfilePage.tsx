import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { clickRedirect } from "../services/utils/routeService";
import style from "../assets/styles/Profile.module.scss"

const ProfilePage = () => {
  const [result, setResult]: any = useState([])
  const { authToken, logoutUser } = useContext(AuthContext)
  const navigate = useNavigate()

  useEffect(() => {
    getResult().then(

    )
  }, [])

  async function getResult()  {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/profile/`,
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
    <main>
      <p>{result.user?.username}</p>
      <div className={style.grid__wrapper}>
        <div className={style.grid}>
          { result.posts?.map((item: any) => {
            return (
              <div key={item.id}>
                <img
                  onClick={() => clickRedirect(navigate, `p/${item.id}`)}
                  src={`${process.env.REACT_APP_BACKEND_ROOT_URL}${item.image}`}
                  referrerPolicy="no-referrer" alt=""
                />
              </div>
            )
          }) }
        </div>
      </div>
    </main>
  )
}

export default ProfilePage;