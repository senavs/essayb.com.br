import { GetServerSideProps } from "next"

import Layout from "src/components/common/Layout"
import { loginRequired, AuthenticationData } from "src/libs/serverSide/auth"


interface IndexProps {
  authenticationData: AuthenticationData
}

export default function ProfileIndex({ authenticationData }: IndexProps) {
  return (
    <Layout>
      <div className="container">
        <h1>Profile page</h1>
        <h2>Username: {authenticationData.user.username}</h2>
      </div>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const authenticationData = await loginRequired(ctx)

  return {
    props: { authenticationData }
  }
}