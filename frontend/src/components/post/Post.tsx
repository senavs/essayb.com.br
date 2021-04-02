import { urls } from "config/frontend";
import Router from "next/router";
import { useContext, useState } from "react";
import ReactMarkdown from "react-markdown";
import { AuthContext } from "src/libs/contexts/auth";
import LikeService from "src/libs/services/like";

import Avatar from "../profile/Avatar";
import PostDescription from "./PostDescrption";
import PostThumbnail from "./PostThumbnail";
import PostTitle from "./PostTitle";

interface PostProps {
  id_post: number,
  username: string,
  title: string,
  description: string,
  content: string,
  thumbnailBase64?: string,
  usePostActions?: boolean
  useEditButton?: boolean
  hasLiked?: boolean
  likesCount?: number
}

export default function Post({
  id_post,
  username,
  title,
  description,
  content,
  thumbnailBase64,
  usePostActions = true,
  useEditButton,
  hasLiked,
  likesCount
}: PostProps) {
  const { authenticationData } = useContext(AuthContext)
  const [likes, setLikes] = useState(likesCount)
  const [isLiked, setIsLiked] = useState(hasLiked)

  function onClickLike() {
    if (!authenticationData.isAuthenticated) {
      return Router.push(urls.auth.login)
    }
    LikeService.create(id_post, authenticationData.token)
      .then(() => {
        setLikes(likes + 1)
        setIsLiked(true)
      })
      .catch(console.log)
  }
  function onClickDeslike() {
    LikeService.delete(id_post, authenticationData.token)
      .then(() => {
        setLikes(likes - 1)
        setIsLiked(false)
      })
      .catch(console.log)
  }
  function onClickEdit() {
    Router.push(urls.post.edit.replace('{id_post}', id_post.toString()))
  }

  return (
    <div>
      {/* title */}
      <div className="mb-3">
        <PostTitle>{title}</PostTitle>
      </div>

      {/* description */}
      <div className="mb-3">
        <PostDescription>{description}</PostDescription>
      </div>

      {/* post actions and user info */}
      <div className="d-flex mb-5">
        <div>
          <Avatar username={username} />
          <span className="h5 ms-2">{username}</span>
        </div>
        {usePostActions && <div className="ms-auto">
          <span className="ms-2">{likes}</span>
          {!isLiked
            ? <button className="btn btn-sm btn-outline-secondary ms-2" onClick={onClickLike}>
              <i className="bi bi-heart"></i>
            </button>
            : <button className="btn btn-sm btn-outline-secondary ms-2" onClick={onClickDeslike}>
              <i className="bi bi-heart-fill"></i>
            </button>
          }
          {useEditButton && <button className="btn btn-sm btn-outline-secondary ms-2" onClick={onClickEdit}>
            <i className="bi bi-pencil"></i>
          </button>}
        </div>}
      </div>

      {/* thumbnail */}
      <div className="mb-5">
        <PostThumbnail id_post={id_post} base64={thumbnailBase64} />
      </div>

      {/* post content */}
      <div>
        <ReactMarkdown source={content} />
      </div>
    </div>
  )

}