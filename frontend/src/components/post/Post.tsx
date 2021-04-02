import { urls } from "config/frontend";
import Router from "next/router";
import ReactMarkdown from "react-markdown";

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
  hasLiked: boolean
  likesCount: number
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
          <span className="ms-2">{likesCount}</span>
          <button className="btn btn-sm btn-outline-secondary ms-2">
            <i className={`bi bi-heart${hasLiked ? "-fill" : ""}`}></i>
          </button>
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