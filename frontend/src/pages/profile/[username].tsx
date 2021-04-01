import { GetServerSideProps } from "next"

import Layout from "../../components/common/Layout"
import Title from "../../components/common/Title"
import Avatar from "../../components/profile/Avatar"
import LinkIcon from "../../components/profile/LinkIcon"
import UpdateUserProfileModal from "../../components/profile/UpdateUserProfileModal"
import PostService, { PostCountInterface, PostListInterface } from "../../libs/services/post"
import { getAuthenticationData, AuthenticationData } from "../../libs/serverSide/auth"
import { CategoryData, getCategoryData } from "../../libs/serverSide/category"
import { getProfileUserData, ProfileUserData } from "../../libs/serverSide/profile"
import PostIcon from "src/components/post/PostIcon"


interface ProfileIndexProps {
  authenticationData: AuthenticationData
  categoryData: CategoryData
  profileUserData: ProfileUserData
  isLoggedUserProfile: boolean
  postCount: PostCountInterface
  postList: PostListInterface
}

export default function ProfileIndex({
  authenticationData,
  categoryData,
  profileUserData,
  isLoggedUserProfile,
  postCount,
  postList
}: ProfileIndexProps) {

  return (
    <Layout authenticationData={authenticationData} categoryData={categoryData}>
      <div className="container">
        <div className="row">

          {/* profile image */}
          <div className="col-md-6 d-flex justify-content-center my-auto">
            <Avatar username={profileUserData.username} useProfileUrl={false} width="6rem" />
          </div>

          {/* profile infos */}
          <div className="col-md-6">
            <div className="mb-3 p-2 border-bottom d-flex">
              <div className="h1 d-inline-block">
                {profileUserData.username} {profileUserData.is_premium && <i title="Premium" className="fs-3 bi bi-gem"></i>}
              </div>

              <div className="ms-auto my-auto">
                {isLoggedUserProfile && (
                  <button className="btn btn-outline-secondary" data-bs-toggle="modal" data-bs-target="#editUserModal">
                    <i className="bi bi-pencil-fill"></i>
                  </button>
                )}
              </div>


            </div>
            <div className="d-flex justify-content-evenly">
              <span><span className="fw-bold">{postCount.count}</span> posts</span>
              <span><span className="fw-bold">{0}</span> likes</span>
              <span><span className="fw-bold">{0}</span> followers</span>
              <span><span className="fw-bold">{0}</span> following</span>
            </div>
          </div>

    {/* teste 
    
    condition ? exem1 : exem2


    
    
    
    */}


          {/* user info */}
          <div className="col-md-6 mt-md-4 my-4 d-flex justify-content-evenly">
            {profileUserData.url_linkedin && <LinkIcon iconName="linkedin" href={profileUserData.url_linkedin} />}
            {profileUserData.url_instagram && <LinkIcon iconName="instagram" href={profileUserData.url_instagram} />}
            {profileUserData.url_website && <LinkIcon iconName="link-45deg" href={profileUserData.url_website} />}
          </div>

          <div className="col-md-6 mt-md-4 mb-2">
            <div style={{ textAlign: 'justify', whiteSpace: 'pre-wrap' }}>
              {profileUserData.bio}
            </div>
          </div>
        </div>

        <div className="row">
          {/* posts */}
          <Title>Posts</Title>

          {postList.map((e, i) => {
            return (<div className="col-12 col-md-4 mb-4" key={i}>
              <PostIcon
                id_post={e.id_post}
                title={e.title}
                descriprion={e.description}
                category={e.category.category}
                created_at={e.created_at}
              />
            </div>)
          })}
        </div>


        {/* update user profile modal */}
        <UpdateUserProfileModal authenticationData={authenticationData} profileUserData={profileUserData} />
      </div>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  // get base page data
  const authenticationData = await getAuthenticationData(ctx)
  const categoryData = await getCategoryData()

  // get user username of the page
  const { username } = ctx.query
  const isLoggedUserProfile = authenticationData.user.username === username.toString()

  // get user information (user page or user loged in)
  let profileUserData = authenticationData.user
  if (!isLoggedUserProfile) {
    profileUserData = await getProfileUserData(username.toString())
  }

  // no user was found
  if (Object.keys(profileUserData).length === 0) {
    return {
      notFound: true
    }
  }

  // get base page data
  const postCount = await PostService.count(profileUserData.username)
  const postList = await PostService.list(profileUserData.username)

  return {
    props: { authenticationData, categoryData, profileUserData, isLoggedUserProfile, postCount, postList },
  }
}