import { GetServerSideProps } from "next";

import Layout from "../components/common/Layout";
import { AuthenticationData, getAuthenticationData } from "../libs/props/auth";
import { CategoryData, getCategoryData } from "../libs/props/category";


interface IndexProps {
  authenticationData: AuthenticationData
  categoryData: CategoryData
}

export default function Index({ authenticationData, categoryData }: IndexProps) {
  return (
    <Layout authenticationData={authenticationData} categoryData={categoryData} title="Home page">
      <div className="container">
        <h1>Hello world!!</h1>
      </div>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const authenticationData = await getAuthenticationData(ctx)
  const categoryData = await getCategoryData()

  return {
    props: { authenticationData, categoryData }
  }
}