import { GetServerSideProps } from "next"

import Layout from "../../components/common/Layout"
import PostSections from "../../components/post/PostSections"
import PostProvider from "../../libs/contexts/post"
import { AuthenticationData, getAuthenticationData } from "../../libs/serverSide/auth"
import { CategoryData, getCategoryData } from "../../libs/serverSide/category"
import { urls } from "../../../config/frontend"


interface CreateProps {
  authenticationData: AuthenticationData
  categoryData: CategoryData
}

export default function Create({ authenticationData, categoryData }: CreateProps) {
  return (
    <Layout authenticationData={authenticationData} categoryData={categoryData}>
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
  const categoryData = await getCategoryData()

  if (!authenticationData.isAuthenticated) {
    return {
      props: { authenticationData, categoryData },
      redirect: {
        destination: urls.auth.login
      }
    }
  }

  return {
    props: { authenticationData, categoryData }
  }
}