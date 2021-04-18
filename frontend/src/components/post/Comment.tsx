import Router from "next/router";
import { useContext } from "react";

import Avatar from "../profile/Avatar";
import CommentService from "../../libs/services/comment";
import { AuthContext } from "../../libs/contexts/auth";
import { urls } from "../../../config/frontend";

interface CommentProps {
  id_coment: number
  username: string
  postUserUsername: string
  comment: string
}

export default function Comment({ id_coment, username, postUserUsername, comment }: CommentProps) {
  const { authenticationData } = useContext(AuthContext)
  const useButton = authenticationData.isAuthenticated &&
    (authenticationData.user.username === username || authenticationData.user.username === postUserUsername)

  function onClickDelete() {
    CommentService.delete(id_coment, authenticationData.token)
      .then(Router.reload)
      .catch()
  }

  return (
    <div>
      <div className="row">
        <div className="col">
          <Avatar username={username} />
          <a
            className="h5 ms-2"
            href={urls.user.profile.replace('{username}', username)}
            style={{ textDecoration: 'inherit', color: 'inherit', cursor: 'pointer' }}
          >
            {username}
          </a>

          {useButton && (
            <button className="btn btn-sm btn-outline-secondary float-end" onClick={onClickDelete}>
              <i className="bi bi-trash"></i>
            </button>
          )}
        </div>
      </div>

      <div className="row">
        <div className="col">
          <div className="p-2" style={{ textAlign: 'justify', whiteSpace: 'pre-wrap' }}>
            {comment}
          </div>
        </div>
      </div>
    </div>
  )
}