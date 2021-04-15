import { GetServerSideProps } from "next"

import Post from "src/components/post/Post"
import Title from "../../../components/common/Title"
import Layout from "../../../components/common/Layout"
import LikeService, { LikeCheckInterface, LikeCountInterface } from "../../../libs/services/like"
import { getAuthenticationData, AuthenticationData } from "../../../libs/props/auth"
import { CategoryData, getCategoryData } from "../../../libs/props/category"
import { getPostData, PostData } from "../../../libs/props/post"
import { ProfileUserData } from "../../../libs/props/profile"


interface ProfileIndexProps {
  authenticationData: AuthenticationData
  categoryData: CategoryData
  postData: PostData
  userPostData: ProfileUserData
  isLoggedUserPost: boolean
  hasLiked: LikeCheckInterface
  likesCount: LikeCountInterface
}

export default function ProfileIndex({
  authenticationData,
  categoryData,
  postData,
  userPostData,
  isLoggedUserPost,
  hasLiked,
  likesCount
}: ProfileIndexProps) {

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
  
  let hasLiked = { has_liked: false }
  if (authenticationData.isAuthenticated) {
    hasLiked = await LikeService.check(authenticationData.user.username, postData.id_post)
  }
  
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
      likesCount
    },
  }
}