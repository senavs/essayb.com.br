import { urls } from "config/frontend";
import { GetServerSideProps } from "next";
import { getPaymentAceptData } from "src/libs/props/payment";

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
            Thank you for your purchase!
          </div>
          <div className="d-flex justify-content-center text-secondary fs-3">
            You are now premium. Enjoy!!
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

  const { session_id } = ctx.query

  const paymentAceptData = await getPaymentAceptData(session_id.toString(), authenticationData.token)
  if (!paymentAceptData.accept) {
    return {
      props: { authenticationData, categoryData },
      redirect: {
        permanent: false,
        destination: urls.payment.error
      }
    }
  }

  return {
    props: { authenticationData, categoryData }
  }
}