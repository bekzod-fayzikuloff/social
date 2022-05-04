import React from 'react';
import Modal from 'react-modal';
import { useNavigate } from "react-router-dom";
import style from "../assets/styles/PostModal.module.scss"

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
      >
        <div className={style.headline}>
          <button className={style.close__button} onClick={closeModal}>&#x2715;</button>
        </div>
        <div>
          <div className={style.card__root}>

            <div className={style.image__card}>
              <img src={post?.image} alt="fdf"/>
            </div>

            <div className={style.post__description}>
              <p>{post?.user.username}</p>
              <p>{post?.description}</p>
            </div>
          </div>
        </div>

      </Modal>
    </div>
  );
}

export default PostModal;