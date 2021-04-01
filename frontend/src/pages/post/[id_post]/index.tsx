import { GetServerSideProps } from "next"
import ReactMarkdown from "react-markdown"

import Layout from "../../../components/common/Layout"
import { getAuthenticationData, AuthenticationData } from "../../../libs/serverSide/auth"
import { CategoryData, getCategoryData } from "../../../libs/serverSide/category"
import { getPostData, PostData } from "../../../libs/serverSide/post"
import PostTitle from "../../../components/post/PostTitle"
import PostDescription from "../../../components/post/PostDescrption"
import PostThumbnail from "../../../components/post/PostThumbnail"
import Avatar from "../../../components/profile/Avatar"
import { ProfileUserData } from "../../../libs/serverSide/profile"
import Title from "../../../components/common/Title"


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

            <div className="mb-3">
              <PostTitle>{postData.title}</PostTitle>
            </div>

            <div className="mb-3">
              <PostDescription>{postData.description}</PostDescription>
            </div>

            <div className="d-flex mb-5">
              <div>
                <Avatar username={userPostData.username} />
                <span className="h5 ms-2">{userPostData.username}</span>
              </div>
              <div className="ms-auto">
                <span className="ms-2">1127</span>
                <button className="btn btn-sm btn-outline-secondary ms-2">
                  <i className="bi bi-heart"></i>
                </button>
                {isLoggedUserPost && <button className="btn btn-sm btn-outline-secondary ms-2">
                  <i className="bi bi-pencil"></i>
                </button>}
              </div>
            </div>

            <div className="mb-5">
              <PostThumbnail id_post={postData.id_post} />
            </div>

            <div>
              <ReactMarkdown source={"## Foo bar\n- item 01"} />
            </div>

            <div className="d-flex justify-content-center my-5">
              <span className="h6 ms-2">.</span>
              <span className="h6 ms-2">.</span>
              <span className="h6 ms-2">.</span>
            </div>


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