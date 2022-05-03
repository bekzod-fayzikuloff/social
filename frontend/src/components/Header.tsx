import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

import SearchInput from "./SearchInput";
import HeaderNavIcons from "./HeaderNavIcons";
import style from "../assets/styles/Header.module.scss"


const Header = () => {
  const { user } = useContext(AuthContext)
  return (
    <header className={style.header}>
      <div className={style.title}>
        <NavLink to={"/"}>Falcon</NavLink>
      </div>
      { user ?
        <>
          <SearchInput />
          <HeaderNavIcons className={style.social_network}/>
        </>
          :
        <Link to={'/login'}>login</Link>
      }
    </header>
  )
}

export default Header;