import { GetServerSideProps } from "next";

import Title from "../components/common/Title";
import UserCard from "../components/profile/UserCard";
import Layout from "../components/common/Layout";
import Carousel from "../components/homepage/Carousel";
import CardPost from "../components/homepage/CardPost";
import DiscoveryCard from "../components/homepage/Discovery"
import AnalyticsService, { DiscoveryPosts, MostFollowedUsersInterface, MostPostLikedUserPremium } from "../libs/services/analytics";
import { AuthenticationData, getAuthenticationData } from "../libs/props/auth";
import { CategoryData, getCategoryData } from "../libs/props/category";
import About from "src/components/homepage/About";


interface IndexProps {
  authenticationData: AuthenticationData
  categoryData: CategoryData
  topUsers: MostFollowedUsersInterface
  topPostMonthly: MostPostLikedUserPremium
  discovery: DiscoveryPosts
}

export default function Index({ authenticationData, categoryData, topUsers, topPostMonthly, discovery }: IndexProps) {

  return (

    <Layout authenticationData={authenticationData} categoryData={categoryData} title="Home page">
      <div className="container">

        {/* main baners  */}
        <div className="row mb-5">
          <div className="col-12">
            {/* carousel */}
            <Carousel />
          </div>
        </div>

        <div className="row mb-5">
          {/* post 1 e 2 */}
          {topPostMonthly.map((e, i) => {
            if (i >= 2) {
              return
            }
            return (<div className="col-md-6 col-12" key={i}>
              <CardPost
                id_post={e.id_post}
                title={e.title}
                descriprion={e.description}
                created_at={e.created_at}
              />
            </div>)
          })}
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
              <Title>Discovery</Title>
              {discovery.map((e, i) => {
                return (<div className="col-md-6" key={i}>
                  <DiscoveryCard
                    id_post={e.id_post}
                    title={e.title}
                    descriprion={e.description}
                    created_at={e.created_at}
                  />
                </div>)
              })}
            </div>
          </div>

          <div className="col-12 col-md-4">
            <div className="row">
              <div className="col-12">

                <div className="mb-3">
                  <About />
                </div>

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
  const topPostMonthly = await AnalyticsService.mostLikedPostUserPremium()
  const discovery = await AnalyticsService.discoveryPosts(6)

  return {
    props: { authenticationData, categoryData, topUsers, topPostMonthly, discovery }
  }
}