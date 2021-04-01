import { GetServerSideProps } from 'next';

import SignUpForm from '../../components/auth/SignUpForm';
import Layout from '../../components/common/Layout';
import Title from '../../components/common/Title';
import { getAuthenticationData, AuthenticationData } from '../../libs/serverSide/auth';
import { CategoryData, getCategoryData } from '../../libs/serverSide/category';
import { urls } from '../../../config/frontend';


interface SignUpProps {
  authenticationData: AuthenticationData
  categoryData: CategoryData
}

export default function SignUp({ authenticationData, categoryData }: SignUpProps) {
  return (
    <Layout authenticationData={authenticationData} categoryData={categoryData}>
      <div className="container">
        <div className="row">
          <div className="offset-md-4 col-md-4 col-12">
            <div className="col">
              <Title>Sign up</Title>
            </div>
            <div className="mb-3 border rounded p-3 shadow-sm">
              <SignUpForm />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}


export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const authenticationData = await getAuthenticationData(ctx)
  const categoryData = await getCategoryData()

  if (authenticationData.isAuthenticated) {
    return {
      props: { authenticationData, categoryData },
      redirect: {
        destination: urls.common.index
      }
    }
  }

  return {
    props: { authenticationData, categoryData}
  }
}