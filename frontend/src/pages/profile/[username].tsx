import Router from "next/router"
import { GetServerSideProps } from "next"
import { useState } from "react"

import Layout from "../../components/common/Layout"
import Title from "../../components/common/Title"
import Avatar from "../../components/profile/Avatar"
import LinkIcon from "../../components/profile/LinkIcon"
import PostCard from "../../components/post/PostCard"
import ModalFollows from "../../components/profile/ModalFollows"
import FollowService from "../../libs/services/follow"
import UpdateUserProfileModal from "../../components/profile/UpdateUserProfileModal"
import PostService, { PostListInterface } from "../../libs/services/post"
import { getAuthenticationData, AuthenticationData } from "../../libs/props/auth"
import { CategoryData, getCategoryData } from "../../libs/props/category"
import { getProfileUserData, ProfileUserData } from "../../libs/props/profile"
import { urls } from "../../../config/frontend"


interface ProfileIndexProps {
  authenticationData: AuthenticationData
  categoryData: CategoryData
  profileUserData: ProfileUserData
  postList: PostListInterface
  isLoggedUserProfile: boolean
  followCheck: boolean
}

export default function ProfileIndex({
  authenticationData,
  categoryData,
  profileUserData,
  isLoggedUserProfile,
  postList,
  followCheck,

}: ProfileIndexProps) {
  const [skip, setSkip] = useState(10)
  const [posts, setPosts] = useState(postList)
  const [follows, setFollows] = useState(profileUserData.followerCount)
  const [isFollowed, setIsFollowed] = useState(followCheck)

  function onClickLoadMore(event) {
    PostService.list(profileUserData.username, skip)
      .then((res) => {
        if (res.length < 10) {
          event.target.hidden = true
        }
        setSkip(skip + 10)
        setPosts(posts.concat(res))
      })
  }
  function createFollow() {
    if (!authenticationData.isAuthenticated) {
      return Router.push(urls.auth.login)
    } FollowService.create(authenticationData.token, profileUserData.username).then(() => {
      setFollows(follows + 1)
      setIsFollowed(true)
    }).catch(console.log)
  }
  function deleteFollow() {
    FollowService.delete(authenticationData.token, profileUserData.username).then(() => {
      setFollows(follows - 1)
      setIsFollowed(false)
    }).catch(console.log)
  }

  return (
    <Layout authenticationData={authenticationData} categoryData={categoryData} title={`${profileUserData.username} profile`}>
      <div className="container">
        <div className="row">

          {/* profile image */}
          <div className="col-md-6 d-flex justify-content-center my-auto">
            <Avatar username={profileUserData.username} useProfileUrl={false} width="6rem" />
          </div>

          {/* profile infos */}
          <div className="col-md-6">
            <div className="mb-3 p-2 border-bottom d-flex">

              {/* username */}
              <div className="h1 d-inline-block">
                {profileUserData.username} {profileUserData.is_premium && <i title="Premium" className="fs-3 bi bi-gem"></i>}
              </div>

              <div className="ms-auto my-auto">
                {/* edit profile button */}
                {isLoggedUserProfile &&
                  <button className="btn btn-sm btn-outline-secondary" data-bs-toggle="modal" data-bs-target="#editUserModal">
                    <i className="bi bi-pencil-fill"></i>
                  </button>}

                {/* follow/unfollow button */}
                {!isLoggedUserProfile && <div className="ms-auto my-auto">
                  {!isFollowed ?
                    <button className="btn btn-sm btn-primary" onClick={createFollow}>Follow</button>
                    :
                    <button className="btn btn-sm btn-outline-secondary" onClick={deleteFollow}>Unfollow</button>
                  }
                </div>}
              </div>
            </div>

            {/* counters */}
            <div className="d-flex justify-content-evenly">
              <span><span className="fw-bold">{profileUserData.postCount}</span> posts</span>
              <span><span className="fw-bold">{profileUserData.likeCount}</span> likes</span>
              <a data-bs-toggle="modal" data-bs-target="#followers" style={{ cursor: "pointer" }} >
                <span><span className="fw-bold">{follows}</span> followers</span>
              </a>
              <a data-bs-toggle="modal" data-bs-target="#followings" style={{ cursor: "pointer" }} >
                <span><span className="fw-bold">{profileUserData.followingCount}</span> followings</span>
              </a>
            </div>
          </div>

          {/* user info */}
          <div className="col-md-6 mt-md-4 my-4 d-flex justify-content-evenly">
            {profileUserData.url_linkedin && <LinkIcon iconName="linkedin" href={profileUserData.url_linkedin} />}
            {profileUserData.url_instagram && <LinkIcon iconName="instagram" href={profileUserData.url_instagram} />}
            {profileUserData.url_website && <LinkIcon iconName="link-45deg" href={profileUserData.url_website} />}
          </div>

          <div className="col-md-6 mt-md-4 mb-2">
            <div style={{ textAlign: 'justify', whiteSpace: 'pre-wrap' }}>
              {profileUserData.bio}
            </div>
          </div>
        </div>

        <div className="row">
          <Title>Posts</Title>

          {/* Info 'no post' */}
          {posts.length === 0 && (
            <div className="d-flex justify-content-center">
              <i className="fs-2 bi bi-emoji-frown mx-2"></i>
              <span className="fs-2">No post yet</span>
            </div>
          )}

          {/* posts */}
          {posts.map((e, i) => {
            if (!isLoggedUserProfile && !e.is_published) {
              return null
            }
            return (<div className="col-12 col-md-4 mb-4" key={i}>
              <PostCard
                id_post={e.id_post}
                title={e.title}
                descriprion={e.description}
                category={e.category.category}
                is_published={e.is_published}
                publish_at={e.publish_at}
                create_at={e.created_at}
              />
            </div>)
          })}

          {/* button loadmore */}
          {posts.length >= 10 && (
            <div className="d-flex justify-content-center">
              <button className="btn btn-outline-secondary" onClick={onClickLoadMore}>Load more</button>
            </div>
          )}
        </div>

        {/* update user profile modal */}
        <UpdateUserProfileModal authenticationData={authenticationData} profileUserData={profileUserData} />

        {/* modal followers and followings*/}
        <ModalFollows username={profileUserData.username} modalType="followers" />
        <ModalFollows username={profileUserData.username} modalType="followings" />

      </div>
    </Layout >
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  // get base page data
  const authenticationData = await getAuthenticationData(ctx)
  const categoryData = await getCategoryData()

  // get user username of the page
  const { username } = ctx.query
  const isLoggedUserProfile = authenticationData.user.username === username.toString()

  // get user information (user page or user loged in)
  const profileUserData = await getProfileUserData(username.toString())

  // no user was found
  if (!profileUserData.wasFound) {
    return {
      notFound: true
    }
  }

  // get post list
  const postList = await PostService.list(profileUserData.username)

  // check if logged user is following the user page
  let followCheck = false
  if (authenticationData.isAuthenticated) {
    followCheck = await (await FollowService.check(authenticationData.user.username, profileUserData.username)).is_following
  }

  return {
    props: {
      authenticationData,
      categoryData,
      profileUserData,
      isLoggedUserProfile,
      postList,
      followCheck
    }
  }
}