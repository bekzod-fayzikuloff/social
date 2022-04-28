import { useContext } from "react";

import { AuthContext } from "../context/AuthContext";

const LoginPage = () => {
  const { loginUser } = useContext(AuthContext)
  return (
    <>
      <form onSubmit={ loginUser }>
        <input type="text" name="username" />
        <input type="text" name="password" />
        <input type="submit"/>
      </form>
    </>
  )
}

export default LoginPage;
