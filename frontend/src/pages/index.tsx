import { GetServerSideProps } from "next";
import Title from "src/components/common/Title";
import UserCard from "src/components/profile/UserCard";
import AnalyticsService, { MostFollowedUsersInterface } from "src/libs/services/analytics";

import Layout from "../components/common/Layout";
import { AuthenticationData, getAuthenticationData } from "../libs/props/auth";
import { CategoryData, getCategoryData } from "../libs/props/category";
import Carousel from "src/components/homepage/Carousel";
import CardPost from "src/components/homepage/CardPost";


interface IndexProps {
  authenticationData: AuthenticationData
  categoryData: CategoryData
  topUsers: MostFollowedUsersInterface
}

export default function Index({ authenticationData, categoryData, topUsers }: IndexProps) {
  return (
    <Layout authenticationData={authenticationData} categoryData={categoryData} title="Home page">
      <div className="container">

        {/* main baners  */}
        <div className="row">

          <div className="col-12">
            {/* carousel */}
            <Carousel/>
          </div>
        </div>

        <div className="row">
          
          <div className="col-6">
            {/* post 1 */}
            <CardPost/>
          </div>
          <div className="col-6">
            {/* post 2 */}
            <CardPost/>
          </div>

        </div>

        {/* post list and users */}
        <div className="row">

          <div className="col-12 col-md-8">
            <div className="row">
              <div className="col">
                <Title>Last posts</Title>
              </div>
            </div>

            <div className="row">
              <div className="col">
                <Title>Discovery</Title>
              </div>
            </div>
          </div>

          <div className="col-12 col-md-4">
            <div className="row">
              <div className="col-12">
                <Title>About</Title>
              </div>

              <div className="col-12">
                <Title>Top users</Title>
                {topUsers.map((user, index) => {
                  return (
                    <div className="mb-2" key={index}>
                      <UserCard
                        username={user.username} />
                    </div>
                  )
                })}
              </div>
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

  const topUsers = await AnalyticsService.mostFollowedUsers()

  return {
    props: { authenticationData, categoryData, topUsers }
  }
}