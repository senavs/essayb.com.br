import { GetServerSideProps } from "next"
import { useState } from "react"

import Layout from "../../../components/common/Layout"
import Title from "../../../components/common/Title"
import Comment from "../../../components/post/Comment"
import CommentInput from "../../../components/post/CommentInput"
import Post from "../../../components/post/Post"
import { AuthenticationData, getAuthenticationData } from "../../../libs/props/auth"
import { CategoryData, getCategoryData } from "../../../libs/props/category"
import { getPostData, PostData } from "../../../libs/props/post"
import { ProfileUserData } from "../../../libs/props/profile"
import CommentService, { CommentListInterface } from "../../../libs/services/comment"
import LikeService, { LikeCheckInterface, LikeCountInterface } from "../../../libs/services/like"


interface ProfileIndexProps {
  authenticationData: AuthenticationData
  categoryData: CategoryData
  postData: PostData
  userPostData: ProfileUserData
  isLoggedUserPost: boolean
  hasLiked: LikeCheckInterface
  likesCount: LikeCountInterface
  commentList: CommentListInterface
}

export default function ProfileIndex({
  authenticationData,
  categoryData,
  postData,
  userPostData,
  isLoggedUserPost,
  hasLiked,
  likesCount,
  commentList
}: ProfileIndexProps) {
  const [comments, setComments] = useState(commentList)
  const [skip, setSkip] = useState(10)

  function onClickLoadMore(event) {
    CommentService.list(postData.id_post, skip)
      .then((res) => {
        if (res.length < 10) {
          event.target.hidden = true
        }
        setSkip(skip + 10)
        setComments(comments.concat(res))
      })
  }

  return (
    <Layout authenticationData={authenticationData} categoryData={categoryData} title={postData.title}>

      <div className="container">
        <div className="row d-flex justify-content-center">
          <div className="col-12 col-md-6">

            <Post
              id_post={postData.id_post}
              username={userPostData.username}
              title={postData.title}
              description={postData.description}
              content={postData.content}
              useEditButton={isLoggedUserPost}
              hasLiked={hasLiked.has_liked}
              likesCount={likesCount.likes}
            />

            {/* separator */}
            <div className="d-flex justify-content-center my-5">
              <span className="h6 ms-2">.</span>
              <span className="h6 ms-2">.</span>
              <span className="h6 ms-2">.</span>
            </div>

            {/* comments */}
            <div>
              <Title>Comments</Title>

              <div className="row mb-4">
                {authenticationData.isAuthenticated && (
                  <CommentInput id_post={postData.id_post} />
                )}
              </div>


              {comments.map(element => {
                return (
                  <div className="mb-2" key={element.id_comment} >
                    <Comment
                      id_coment={element.id_comment}
                      username={element.user.username}
                      postUserUsername={userPostData.username}
                      comment={element.comment}
                    />
                  </div>
                )
              })}

              {comments.length >= 10 && (
                <div className="d-flex justify-content-center">
                  <button className="btn btn-outline-secondary" onClick={onClickLoadMore} >Load more</button>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>

    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  // get base page data
  const authenticationData = await getAuthenticationData(ctx)
  const categoryData = await getCategoryData()

  // get post data
  const { id_post } = ctx.query
  const postData = await getPostData(parseInt(id_post.toString()))
  if (Object.keys(postData).length === 0) {
    return {
      notFound: true
    }
  }

  // check if user has liked the post
  let hasLiked = { has_liked: false }
  if (authenticationData.isAuthenticated) {
    hasLiked = await LikeService.check(authenticationData.user.username, postData.id_post)
  }

  // get comment data
  const commentList = await CommentService.list(parseInt(id_post.toString()))

  const { user: userPostData } = postData
  const isLoggedUserPost = userPostData.username === authenticationData.user.username
  const likesCount = await LikeService.countPostLikes(postData.id_post)

  return {
    props: {
      authenticationData,
      categoryData,
      postData,
      userPostData,
      isLoggedUserPost,
      hasLiked,
      likesCount,
      commentList
    },
  }
}