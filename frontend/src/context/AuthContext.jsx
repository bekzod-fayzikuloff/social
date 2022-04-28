import { createContext, useState, useEffect } from "react";
import jwt_decode from "jwt-decode";

import { useNavigate } from "react-router-dom";

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

  const navigate = useNavigate()

  const loginUser = async (e) => {
    e.preventDefault()
    const loginUrl = `${process.env.REACT_APP_BACKEND_URL}/token/`
    console.log(loginUrl)

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

  let contextData = {
    user,
    loginUser,
    logoutUser
  }

  return (
    <AuthContext.Provider value={ contextData }>
      { children }
    </AuthContext.Provider>
  )
}

export { AuthContext };
export { AuthProvider }