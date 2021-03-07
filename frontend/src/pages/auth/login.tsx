import { urls } from 'config/frontend';
import { GetServerSideProps } from 'next';
import LoginForm from 'src/components/auth/LoginForm';

import Layout from 'src/components/common/Layout';
import { getAuthenticationData, AuthenticationDataInterface } from 'src/libs/serverSide/auth';


interface LoginProps {
  authenticationDataProps: AuthenticationDataInterface
}

export default function Login({ authenticationDataProps }: LoginProps) {
  return (
    <Layout authenticationData={authenticationDataProps}>
      <LoginForm />
    </Layout>
  )
}


export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const authenticationDataProps = await getAuthenticationData(ctx)

  if (authenticationDataProps.isAuthenticated) {
    return {
      props: { authenticationDataProps },
      redirect: {
        destination: urls.common.index
      }
    }
  }

  return {
    props: { authenticationDataProps }
  }
}