import { Link } from "react-router-dom";
import { useState } from "react";

export default function HeaderNavIcons(props: { className: string; }) {

    const [focus, setFocus] = useState(false)

    const handleClick = () => {
        setFocus(prevState => !prevState)
    }

    const socialNetworks = [
        {
            id: 1,
            description: "instagram",
            resourcePath: "https://www.instagram.com/",
            logoUrl: "https://cdn-icons-png.flaticon.com/512/64/64572.png"
        }
    ]

    return(
        <div className={props.className}>
            {socialNetworks.map(item => {
                return (
                    <Link key={item.id} to="/profile">
                        <img src={item.logoUrl} alt={item.description}/>
                    </Link>
                )
            })}
        </div>
    )
}