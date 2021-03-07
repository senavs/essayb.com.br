import { GetServerSideProps } from "next";
import Layout from "src/components/common/Layout";
import { AuthenticationDataInterface, getAuthenticationData } from "src/libs/serverSide/auth";


interface IndexProps {
  authenticationDataProps: AuthenticationDataInterface
}

export default function Index({ authenticationDataProps }: IndexProps) {
  return (
    <Layout authenticationData={authenticationDataProps}>
      <div className="container">
        <h1>Hello world!!</h1>
      </div>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const authenticationDataProps = await getAuthenticationData(ctx)

  return {
    props: { authenticationDataProps }
  }
}