import { useEffect, useState } from "react";

import Avatar from "./Avatar";
import FollowService from "../../libs/services/follow";
import { urls } from "../../../config/frontend";
import LikeService from "src/libs/services/like";
import PostService from "src/libs/services/post";

interface UserCardProps {
  username: string
}

export default function UserCard({ username }: UserCardProps) {
  const [posts, setPosts] = useState(0)
  const [follows, setFollow] = useState(0)
  const [likes, setLikes] = useState(0)

  useEffect(() => {
    PostService.count(username)
      .then(res => setPosts(res.posts))
      .catch()

    FollowService.countFollowers(username)
      .then(res => setFollow(res.count))
      .catch()

    LikeService.countUserLikes(username)
      .then(res => setLikes(res.likes))
      .catch()
  }, [])

  return (
    <div className="border rounded p-3">

      <Avatar username={username} />

      <a href={urls.user.profile.replace('{username}', username)} style={{ textDecoration: 'inherit', color: 'inherit', cursor: 'pointer' }}    >
        <span className="ms-2">{username}</span>
      </a>

      <div className="d-flex justify-content-end">
        <span className="small ms-2">{follows} <i className="bi bi-people-fill"></i></span>
        <span className="small ms-2">{posts} <i className="bi bi-journal-text"></i></span>
        <span className="small ms-2">{likes} <i className="bi bi-heart-fill"></i></span>
      </div>
    </div>
  )
}