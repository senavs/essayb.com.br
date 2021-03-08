import { GetServerSideProps } from "next"

import Layout from "src/components/common/Layout"
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
        <h1>Profile page</h1>
        <h2>Username: {profileUserData.username}</h2>
      </div>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const authenticationData = await getAuthenticationData(ctx)
  const { username } = ctx.query

  const isLoggedUserProfile = authenticationData.user.username === username.toString()
  const profileUserData = await getProfileUserData(username.toString())

  if (profileUserData === null) {
    return {
      notFound: true
    }
  }

  return {
    props: { authenticationData, profileUserData, isLoggedUserProfile },
  }
}