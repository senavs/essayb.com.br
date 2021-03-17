import { urls } from 'config/frontend';
import { GetServerSideProps } from 'next';
import LoginForm from 'src/components/auth/LoginForm';

import Layout from 'src/components/common/Layout';
import Title from 'src/components/common/Title';
import { getAuthenticationData, AuthenticationDataInterface } from 'src/libs/serverSide/auth';


interface LoginProps {
  authenticationData: AuthenticationDataInterface
}

export default function Login({ authenticationData }: LoginProps) {
  return (
    <Layout authenticationData={authenticationData}>
      <div className='container'>
        <div className='row'>
          <div className='offset-md-4 col-md-4 col-12'>
            <div className='col'>
              <Title>Login</Title>
            </div>
            <div className='mb-3 border rounded p-3 shadow-sm'>
              <LoginForm />
            </div>
          </div>
        </div>
      </div>
    </Layout >
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