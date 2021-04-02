import { GetServerSideProps } from "next"

import Post from "src/components/post/Post"
import Title from "../../../components/common/Title"
import Layout from "../../../components/common/Layout"
import { getAuthenticationData, AuthenticationData } from "../../../libs/serverSide/auth"
import { CategoryData, getCategoryData } from "../../../libs/serverSide/category"
import { getPostData, PostData } from "../../../libs/serverSide/post"
import { ProfileUserData } from "../../../libs/serverSide/profile"


interface ProfileIndexProps {
  authenticationData: AuthenticationData
  categoryData: CategoryData
  postData: PostData
  userPostData: ProfileUserData
  isLoggedUserPost: boolean
}

export default function ProfileIndex({
  authenticationData,
  categoryData,
  postData,
  userPostData,
  isLoggedUserPost
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
  const postData = await getPostData(id_post[0])

  if (Object.keys(postData).length === 0) {
    return {
      notFound: true
    }
  }

  // get post's user data
  const { user: userPostData } = postData
  const isLoggedUserPost = userPostData.username === authenticationData.user.username

  return {
    props: { authenticationData, categoryData, postData, userPostData, isLoggedUserPost },
  }
}