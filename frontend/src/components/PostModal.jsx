import React, {useEffect, useState} from 'react';
import Modal from 'react-modal';
import { Link, useNavigate } from "react-router-dom";
import style from "../assets/styles/PostModal.module.scss"
import { PostCommentList } from "./PostComment";
import {getResponse, sendDataAuthRequire} from "../services/utils/sendRequest";
import jwt_decode from "jwt-decode";
import Button from "react-bootstrap/Button";
import { Form } from "react-bootstrap";

Modal.setAppElement('#root');

const PostModal = ({ post, authToken }) => {
  const [commentValue, setCommentValue] = useState('')
  const [comments, setComments] = useState([])
  const navigate = useNavigate()
  const [modalIsOpen, setIsOpen] = React.useState(true);
  const { username } = jwt_decode(authToken.access)
  const postCommentsUrl = `${process.env.REACT_APP_BACKEND_URL}/profile/post/${post?.id}/comments/`

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getComments = async () => {
    const result = await getResponse(postCommentsUrl, String(authToken.access))
    const responseData = await result.json()
    if (result.status === 200) {
      setComments(responseData)
    }
  }

  useEffect(() => {
    getComments().then()
  }, [getComments])

  const closeModal = () => {
    setIsOpen(false);
    navigate("/profile")
  }

  const handleCommentChange = (e) => {
    setCommentValue(e.target.value)
  }

  const postComment = (e) => {
    e.preventDefault()
    const postCreateUrl = `${process.env.REACT_APP_BACKEND_URL}/profile/post/${post.id}/create_comment/`
    sendDataAuthRequire(
      postCreateUrl,
      {
        content: e.target.comment.value
      },
      authToken
    ).then(r => {

    })
    setCommentValue('')

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
              <img src={post?.image} alt=""/>
            </div>

            <div className={style.post__description}>
              <Link
                className={style.username__headline}
                to={
                  username !== post?.user.username ?
                    `/profile/${post?.user.username}` :
                  `/profile`
              }>
                {post?.user.username}
              </Link>
              <p>{post?.description}</p>

              <form className={style.post__comment_input} onSubmit={ postComment }>
                <Form.Control onChange={ handleCommentChange } type="text" name="comment" value={commentValue}/>
                <Button variant="outline-dark" as="input" type="submit" value="Submit" />{' '}
              </form>
              
              <PostCommentList comments={comments}/>
            </div>
          </div>
        </div>

      </Modal>
    </div>
  );
}

export default PostModal;