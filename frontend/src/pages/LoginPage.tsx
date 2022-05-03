import { useContext } from "react";

import { Link } from "react-router-dom";

import { AuthContext } from "../context/AuthContext";

const LoginPage = () => {
  const { loginUser } = useContext(AuthContext)
  return (
    <>
      <Link to="/register">Register</Link>
      <form onSubmit={ loginUser }>
        <input type="text" name="username" />
        <input type="text" name="password" />
        <input type="submit"/>
      </form>
    </>
  )
}

export default LoginPage;
