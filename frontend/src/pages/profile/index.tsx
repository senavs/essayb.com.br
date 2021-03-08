import { urls } from "config/frontend"
import { GetServerSideProps } from "next"

import Layout from "src/components/common/Layout"
import { getAuthenticationData, AuthenticationDataInterface } from "src/libs/serverSide/auth"


interface IndexProps {
  authenticationData: AuthenticationDataInterface
}

export default function ProfileIndex({ authenticationData }: IndexProps) {
  return (
    <Layout authenticationData={authenticationData} >
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const authenticationData = await getAuthenticationData(ctx)

  if (!authenticationData.isAuthenticated) {
    return {
      props: { authenticationData },
      redirect: {
        destination: urls.auth.login
      }
    }
  }

  return {
    props: { authenticationData },
    redirect: {
      destination: urls.user.others.replace('{username}', authenticationData.user.username)
    }
  }
}