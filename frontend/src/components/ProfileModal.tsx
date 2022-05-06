import { useContext } from "react";
import Modal from 'react-modal';
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import style from "../assets/styles/Modal.module.scss"

const ProfileModal = ( props: { isOpen: boolean, closeModal: any} ) => {
  const { logoutUser } = useContext(AuthContext)
  const { isOpen, closeModal } = props;
  return (
    <>
        <Modal
          className={style.profile__modal}
          isOpen={isOpen}
          contentLabel="Example Modal"
          onRequestClose={closeModal}
          overlayClassName={style.profile__modal__overlay}
        >
          <div className={style.profile__modal__root}>
            <div className={style.profile__modal__content}>
              <Link onClick={closeModal} to={"/profile"}>Profile</Link> <br/>
              <Link onClick={closeModal} to={"/profile/settings"}>Settings</Link> <br />
              <span onClick={logoutUser}>Logout</span>
            </div>
          </div>
        </Modal>
    </>
  )
}

export { ProfileModal }