import { GetServerSideProps } from "next";

import Layout from "../../components/common/Layout";
import { AuthenticationData, getAuthenticationData } from "../../libs/props/auth";
import { CategoryData, getCategoryData } from "../../libs/props/category";


interface SuccessPros {
  authenticationData: AuthenticationData
  categoryData: CategoryData
}


export default function Success({ authenticationData, categoryData }: SuccessPros) {

  return (
    <Layout authenticationData={authenticationData} categoryData={categoryData} title="Subscribe to premium">
      <div className="container">
        <div className="row d-flex align-content-center" style={{ minHeight: '100%' }}>

          <div className="d-flex justify-content-center display-3 mb-4">
            Something was wrong with your purchase!
          </div>
          <div className="d-flex justify-content-center text-secondary fs-3">
            Try again and enjoy your premium!!
          </div>

        </div>
      </div>

      <script src="https://js.stripe.com/v3/"></script>
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