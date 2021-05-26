import Router from "next/router";
import { GetServerSideProps } from "next";

import Layout from "../../components/common/Layout";
import PaymentService from "../../libs/services/payment";
import { AuthenticationData, getAuthenticationData } from "../../libs/props/auth";
import { CategoryData, getCategoryData } from "../../libs/props/category";
import { payments, urls } from "../../../config/frontend"


interface SubscribePros {
  authenticationData: AuthenticationData
  categoryData: CategoryData
}


export default function Subscribe({ authenticationData, categoryData }: SubscribePros) {

  function onClick() {
    if (!authenticationData.isAuthenticated) {
      return Router.push(urls.auth.login)
    }

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
        <div className="row d-flex align-content-center" style={{ minHeight: '100%' }}>

          {/* infos */}
          <div className="col-md-7 col-12">
            {/* brand */}
            <div className="d-flex justify-content-center mb-5">
              <img className='' src='/static/brand.png' alt='essayb brand' width='50rem' />
            </div>

            {/* title */}
            <div className="d-flex justify-content-center display-3 mb-5">Essayb Premium</div>

            {/* description */}
            <div className="d-flex justify-content-center fs-4">
              Become a premium user today and receive uniques benefits!!
            </div>
          </div>

          {/* payment card */}
          <div className="col-md-5 col-12">
            <div className="border rounded shadow p-5">
              {/* price */}
              <div className="mb-4">
                <div className="fs-6">from USD</div>
                <div className="fw-bold" style={{ fontSize: '3rem' }}>$5.00</div>
                <div className="color-secondary" style={{ fontSize: '0.75rem' }}>* local taxes may apply</div>
              </div>

              {/* actions */}
              <div className="mb-4">
                <div><i className="bi bi-check ms-3 text-success"></i><span className="fs-6 ms-3">No limit your posts</span></div>
                <div><i className="bi bi-check ms-3 text-success"></i><span className="fs-6 ms-3">Schedule your posts</span></div>
                <div><i className="bi bi-check ms-3 text-success"></i><span className="fs-6 ms-3">Stand out in your actions</span></div>
                <div><i className="bi bi-check ms-3 text-success"></i><span className="fs-6 ms-3">Most liked posts in the month appear on homepage</span></div>
              </div>

              {/* button */}
              {!authenticationData.isAuthenticated || !authenticationData.user.is_premium
                ? (
                  <div className="d-flex justify-content-center">
                    <button className="btn btn-outline-primary p-3" onClick={onClick}>
                      <i className="bi bi-gem"></i>
                      <span> Became premium now </span>
                    </button>
                  </div>
                )
                : (
                  <div className="d-flex justify-content-center">
                    <button className="btn btn-outline-secondary disabled p-3">
                      <i className="bi bi-emoji-laughing"></i>
                      <span> You are premium! </span>
                    </button>
                  </div>
                )
              }
            </div>
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