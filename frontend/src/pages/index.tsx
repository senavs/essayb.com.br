import { GetServerSideProps } from "next";
import Layout from "src/components/common/Layout";
import { AuthenticationDataInterface, getAuthenticationData } from "src/libs/serverSide/auth";


interface IndexProps {
  authenticationData: AuthenticationDataInterface
}

export default function Index({ authenticationData }: IndexProps) {
  return (
    <Layout authenticationData={authenticationData}>
      <div className="container">
        <h1>Hello world!!</h1>
      </div>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const authenticationData = await getAuthenticationData(ctx)

  return {
    props: { authenticationData }
  }
}