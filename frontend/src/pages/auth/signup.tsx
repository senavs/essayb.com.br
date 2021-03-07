import { urls } from 'config/frontend';
import { GetServerSideProps } from 'next';
import SignUpForm from 'src/components/auth/SignUpForm';

import Layout from 'src/components/common/Layout';
import { getAuthenticationData, AuthenticationDataInterface } from 'src/libs/serverSide/auth';


interface SignUpProps {
  authenticationDataProps: AuthenticationDataInterface
}

export default function SignUp({ authenticationDataProps }: SignUpProps) {
  return (
    <Layout authenticationData={authenticationDataProps}>
      <SignUpForm />
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