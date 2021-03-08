import { GetServerSideProps } from "next"

import Layout from "src/components/common/Layout"
import Title from "src/components/common/Title"
import Avatar from "src/components/profile/Avatar"
import LinkIcon from "src/components/profile/LinkIcon"
import UpdateUserProfileModal from "src/components/profile/UpdateUserProfileModal"
import { getAuthenticationData, AuthenticationDataInterface } from "src/libs/serverSide/auth"
import { getProfileUserData, ProfileUserData } from "src/libs/serverSide/profile"


interface UsernameProps {
  authenticationData: AuthenticationDataInterface,
  profileUserData: ProfileUserData
  isLoggedUserProfile: boolean,

}

export default function ProfileIndex({ authenticationData, profileUserData, isLoggedUserProfile }: UsernameProps) {
  return (
    <Layout authenticationData={authenticationData}>
      <div className="container">
        <div className="row">

          {/* profile image */}
          <div className="col-md-6 d-flex justify-content-center my-auto">
            <Avatar username={profileUserData.username} profileImage={profileUserData.profile_image} width="6rem" />
          </div>

          {/* profile infos */}
          <div className="col-md-6">
            <div className="mb-3 p-2 border-bottom d-flex">
              <div className="h1 d-inline-block">
                {profileUserData.username} {profileUserData.is_premium && <i className="fs-3 bi bi-gem"></i>}
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
              <span><span className="fw-bold">{32}</span> posts</span>
              <span><span className="fw-bold">{12398}</span> likes</span>
              <span><span className="fw-bold">{100}</span> followers</span>
              <span><span className="fw-bold">{123}</span> following</span>
            </div>
          </div>

          {/* user info */}
          <div className="col-md-6 mt-md-4 my-4 d-flex justify-content-evenly">
            {profileUserData.url_linkedin && <LinkIcon iconName="linkedin" href={profileUserData.url_linkedin} />}
            {profileUserData.url_instagram && <LinkIcon iconName="instagram" href={profileUserData.url_instagram} />}
            {profileUserData.url_website && <LinkIcon iconName="link-45deg" href={profileUserData.url_website} />}
          </div>

          <div className="col-md-6 mt-md-4">
            <p style={{ textAlign: 'justify' }}>
              {profileUserData.bio}
            </p>
          </div>

          {/* posts */}
          <Title>Posts</Title>

          {/* update user profile modal */}
          <UpdateUserProfileModal
            bio={profileUserData.bio}
            url_linkedin={profileUserData.url_linkedin}
            url_instagram={profileUserData.url_instagram}
            url_website={profileUserData.url_website} />
        </div>
      </div>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const authenticationData = await getAuthenticationData(ctx)
  const { username } = ctx.query
  const isLoggedUserProfile = authenticationData.user.username === username.toString()

  let profileUserData = authenticationData.user
  if (!isLoggedUserProfile) {
    profileUserData = await getProfileUserData(username.toString())
  }

  if (profileUserData === null) {
    return {
      notFound: true
    }
  }

  return {
    props: { authenticationData, profileUserData, isLoggedUserProfile },
  }
}