import { GetServerSideProps } from "next";

import Layout from "../components/common/Layout";
import { AuthenticationData, getAuthenticationData } from "../libs/props/auth";
import { CategoryData, getCategoryData } from "../libs/props/category";
import { payments } from "../../config/frontend"
import { urls } from "config/backend";
import PaymentService from "src/libs/services/payment";


interface SubscribePros {
  authenticationData: AuthenticationData
  categoryData: CategoryData
}


export default function Subscribe({ authenticationData, categoryData }: SubscribePros) {

  function onClick() {
    // @ts-expect-error
    const stripe = window.Stripe(payments.publickKey)

    PaymentService.checkout(authenticationData.token)
      .then(function (session) {
        return stripe.redirectToCheckout({ sessionId: session.session_id });
      })
      .then(function (result) {
        if (result.error) {
          alert(result.error.message);
        }
      })
      .catch(function (error) {
        console.error('Error:', error);
      });
  }

  return (
    <Layout authenticationData={authenticationData} categoryData={categoryData} title="Subscribe to premium">
      <div className="container">
        <button id="checkout-button" onClick={onClick}>Checkout</button>
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