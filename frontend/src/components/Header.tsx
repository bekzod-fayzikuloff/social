import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";


const Header = () => {
  const { user, logoutUser } = useContext(AuthContext)
  return (
    <>
      <Link to={'/'}>Home</Link>
      { user ?
        <p onClick={ logoutUser }>Logout</p>
          :
        <Link to={'/login'}>login</Link>
      }

      { user && user.username }
    </>
  )
}

export default Header;