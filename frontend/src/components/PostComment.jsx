import style from "../assets/styles/Comment.module.scss"

const PostCommentItem = ( { comment } ) => {
  return (
    <div className={style.comment__item}>
      <p>{comment.content}</p>
    </div>
  )
}

const PostCommentList = ( { comments } ) => {
  return (
    <>
      {
        !comments?.length ?
         <p>Нету комментариев</p> : <p></p>
      }
      { comments?.map((comment) => {
        return (
          <PostCommentItem key={comment.id} comment={comment}/>
        )
      })}
    </>
  )
}

export { PostCommentList };