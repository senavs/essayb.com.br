import Router from "next/router"
import { useContext, useEffect, useState } from "react"

import Avatar from "../profile/Avatar"
import CommentService from "../../libs/services/comment"
import { AuthContext } from "../../libs/contexts/auth"

import styles from "../../styles/components/post/CommentInput.module.css"


interface CommentInpuProps {
  id_post: number
}

export default function CommentInput({ id_post }: CommentInpuProps) {
  const { authenticationData } = useContext(AuthContext)

  const [rows, setRows] = useState(1)
  const [isShowingButton, setIsShowingButton] = useState(false)
  const [comment, setComment] = useState('')

  useEffect(() => {
    if (comment.trim().length !== 0) {
      setIsShowingButton(true)
    } else {
      setIsShowingButton(false)
    }
    setRows(comment.split('\n').length)
  }, [comment])

  function onChange(event) {
    setComment(event.target.value)
  }
  function onClick() {
    CommentService.create(id_post, comment.trim(), authenticationData.token)
      .then(Router.reload)
      .catch()
  }

  return (
    <div>
      <div className="row">
        <div className="col-auto">
          <Avatar username={authenticationData.user.username} />
        </div>
        <div className="col">
          <form className={`${styles.form}`}>
            <textarea
              className="w-100"
              maxLength={256}
              rows={rows}
              onChange={onChange}
              value={comment}
              wrap="off"
              placeholder="Leave your comment here"
            />
          </form>
        </div>

      </div>

      {isShowingButton && (
        <div className="row">
          <div className="col d-flex justify-content-end">
            <button className="btn btn-sm btn-outline-secondary" onClick={onClick}>Comment</button>
          </div>
        </div>
      )}
    </div>
  )
}