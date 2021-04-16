import Router from "next/router"
import { useContext, useState } from "react"

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
  const [comment, setComment] = useState('')

  function onKeyPress(event) {
    if (event.key === 'Enter') {
      setRows(rows + 1)
    }
  }
  function onChange(event) {
    setComment(event.target.value)
  }
  function onClick() {
    CommentService.create(id_post, comment, authenticationData.token)
      .then(Router.reload)
      .catch()
  }

  return (
    <div className="row">
      <div className="col-2 d-flex justify-content-center align-self-center">
        <Avatar username={authenticationData.user.username} />
      </div>

      <div className="col-8">
        <form className={styles.form}>
          <textarea className="w-100" maxLength={256} rows={rows} onKeyPress={onKeyPress} onChange={onChange} value={comment} />
        </form>
      </div>

      <div className="col-2 d-flex justify-content-center align-self-center">
        <button className="btn btn-sm btn-outline-secondary" onClick={onClick}>
          <i className="bi bi-arrow-right"></i>
        </button>
      </div>
    </div>
  )
}