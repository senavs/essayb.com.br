import Layout from 'src/components/common/Layout'

import styles from 'src/styles/pages/FourOhFour.module.css'


export default function FourOhFour() {
  return (
    <Layout>
      <div className={`${styles.container} container`}>
        <div className="d-flex justify-content-center align-self-center">
          <span className="fw-bold p-3">404</span>
          <span className="border"></span>
          <span className="p-3">This page could not be found.</span>
        </div>
      </div>
    </Layout>
  )
}