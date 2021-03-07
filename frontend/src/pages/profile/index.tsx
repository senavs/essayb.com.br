import { urls } from "config/frontend"
import { GetServerSideProps } from "next"

import Layout from "src/components/common/Layout"
import { getAuthenticationData, AuthenticationDataInterface } from "src/libs/serverSide/auth"


interface IndexProps {
  authenticationDataProps: AuthenticationDataInterface
}

export default function ProfileIndex({ authenticationDataProps }: IndexProps) {
  return (
    <Layout authenticationData={authenticationDataProps}>
      <div className="container">
        <h1>Profile page</h1>
        <h2>Username: {authenticationDataProps.user.username}</h2>
      </div>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const authenticationDataProps = await getAuthenticationData(ctx)

  if (!authenticationDataProps.isAuthenticated) {
    return {
      props: { authenticationDataProps },
      redirect: {
        destination: urls.auth.login
      }
    }
  }

  return {
    props: { authenticationDataProps }
  }
}