import { urls } from 'config/frontend';
import { GetServerSideProps } from 'next';
import SignUpForm from 'src/components/auth/SignUpForm';

import Layout from 'src/components/common/Layout';
import Title from 'src/components/common/Title';
import { getAuthenticationData, AuthenticationDataInterface } from 'src/libs/serverSide/auth';


interface SignUpProps {
  authenticationData: AuthenticationDataInterface
}

export default function SignUp({ authenticationData }: SignUpProps) {
  return (
    <Layout authenticationData={authenticationData}>
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

  if (authenticationData.isAuthenticated) {
    return {
      props: { authenticationData },
      redirect: {
        destination: urls.common.index
      }
    }
  }

  return {
    props: { authenticationData }
  }
}