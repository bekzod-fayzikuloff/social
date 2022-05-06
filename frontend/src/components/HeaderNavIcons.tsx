import React, { useState } from "react";
import {ProfileModal} from "./ProfileModal";

export default function HeaderNavIcons(props: { className: string; }) {

    const [modalIsOpen, setModalIsOpen] = useState(false)

    const handleClick = () => {
        setModalIsOpen(prevState => !prevState)
    }

    const socialNetworks = [
        {
            id: 1,
            logoUrl: "https://cdn-icons-png.flaticon.com/512/64/64572.png"
        }
    ]

    return(
        <div className={props.className}>
            {socialNetworks.map(item => {
                return (
                  <React.Fragment>
                    <span onClick={handleClick} key={item.id}>
                      <img src={item.logoUrl} alt=""/>
                    </span>
                    <ProfileModal isOpen={modalIsOpen}  closeModal={() => setModalIsOpen(false)}/>
                  </React.Fragment>
                )
            })}
        </div>
    )
}