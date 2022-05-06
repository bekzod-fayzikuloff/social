import { createContext, useState, useEffect } from "react";
import jwt_decode from "jwt-decode";

import { useNavigate } from "react-router-dom";
import { sendData } from "../services/utils/sendRequest";

const AuthContext = createContext()


const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(
      () => (
      localStorage.getItem("authToken") ? JSON.parse(localStorage.getItem("authToken")) : null
      )
  )
  const [user, setUser] = useState(() => (
      localStorage.getItem('authToken') ? jwt_decode(localStorage.getItem('authToken')) : null
  ))

  const [loading, setLoading] = useState(true)

  const navigate = useNavigate()

  const loginUser = async (e) => {
    e.preventDefault()

    const loginUrl = `${process.env.REACT_APP_BACKEND_URL}/token/`

    const response = await fetch(loginUrl, {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        "username": e.target.username.value,
        "password": e.target.password.value
      })
    })
    const responseData = await response.json()
    if (response.status === 200) {
      setAuthToken(responseData)
      setUser(jwt_decode(responseData.access))

      localStorage.setItem('authToken', JSON.stringify(responseData))
      navigate('/')

    } else {
      // Todo
      alert("Invalid credentials")
    }

  }

  const logoutUser = () => {
    setAuthToken(null)
    setUser(null)
    localStorage.removeItem("authToken")
    navigate('/login')
  }

  const registerUser = async (e) => {
    e.preventDefault()
    const registerUrl = `${process.env.REACT_APP_BACKEND_URL}/register/`
    const userCredentials = {
      username: e.target.username.value,
      password: e.target.password.value,
      password2: e.target.password2.value,
      email: e.target.email.value,
      first_name: e.target.first_name.value,
      last_name: e.target.last_name.value
    }
    const response = await sendData(
      registerUrl,
      userCredentials
    )
    if (response.status !== 400) {
      navigate("/login")
    } else {
      alert("bad")
    }
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const updateToken = async () => {
    const loginUrl = `${process.env.REACT_APP_BACKEND_URL}/token/refresh/`

    const response = await fetch(loginUrl, {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        "refresh": authToken?.refresh
      })
    })

    const responseData = await response.json()

    if (response.status === 200) {
      setAuthToken(responseData)
      setUser(jwt_decode(responseData.access))
      localStorage.setItem("authToken", JSON.stringify(responseData))
    } else {
      logoutUser()
    }

    if (loading) {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (loading) {
      updateToken().then()
    }

    const intervalDelay = 1000 * ( 60 * 5 )

    let interval = setInterval(() => {
      if (authToken) {
        updateToken().then()
      }
    }, intervalDelay)

    return () => clearInterval(interval)

  }, [authToken, loading, updateToken])

  let contextData = {
    user,
    authToken,
    loginUser,
    logoutUser,
    registerUser
  }

  return (
    <AuthContext.Provider value={ contextData }>
      { loading ? null : children }
    </AuthContext.Provider>
  )
}

export { AuthContext };
export { AuthProvider }