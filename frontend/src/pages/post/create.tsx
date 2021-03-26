import { urls } from "config/frontend"
import { GetServerSideProps } from "next"
import Layout from "src/components/common/Layout"
import PostSections from "src/components/post/PostSections"
import PostProvider from "src/libs/contexts/post"
import { AuthenticationDataInterface, getAuthenticationData } from "src/libs/serverSide/auth"


interface CreateProps {
  authenticationData: AuthenticationDataInterface
}

export default function Create({ authenticationData }: CreateProps) {
  return (
    <Layout authenticationData={authenticationData}>
      <PostProvider>
        <div className="container">
          <PostSections></PostSections>
        </div>
      </PostProvider>
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
    props: { authenticationData }
  }
}