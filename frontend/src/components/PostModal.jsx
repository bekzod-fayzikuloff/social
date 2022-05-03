import React from 'react';
import Modal from 'react-modal';
import { useNavigate } from "react-router-dom";
import style from "../assets/styles/PostModal.module.scss"

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: '-20%',
    marginRight: '-40%',
    transform: 'translate(-50%, -50%)',
  },

};

Modal.setAppElement('#root');

const PostModal = ({ post, posts }) => {
  const navigate = useNavigate()
  const [modalIsOpen, setIsOpen] = React.useState(true);

  function closeModal() {
    setIsOpen(false);
    navigate("/profile")
  }

  return (
    <div className={style.root}>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <div className={style.headline}>
          <button className={style.close__button} onClick={closeModal}>&#x2715;</button>
        </div>
        <div>{JSON.stringify(post)}</div>

      </Modal>
    </div>
  );
}

export default PostModal;