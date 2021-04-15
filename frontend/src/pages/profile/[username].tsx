import Router from "next/router"
import { GetServerSideProps } from "next"
import { useState } from "react"

import Layout from "../../components/common/Layout"
import Title from "../../components/common/Title"
import Avatar from "../../components/profile/Avatar"
import LinkIcon from "../../components/profile/LinkIcon"
import PostCard from "../../components/post/PostCard"
import UpdateUserProfileModal from "../../components/profile/UpdateUserProfileModal"
import LikeService, { LikeCountInterface } from "src/libs/services/like"
import PostService, { PostCountInterface, PostListInterface } from "../../libs/services/post"
import FollowService, { FollowCountInterface, CheckFollowingInterface, FollowInterface, DeleteInterface } from "../../libs/services/follow"
import { getAuthenticationData, AuthenticationData } from "../../libs/props/auth"
import { CategoryData, getCategoryData } from "../../libs/props/category"
import { getProfileUserData, ProfileUserData } from "../../libs/props/profile"
import { urls } from "../../../config/frontend"


interface ProfileIndexProps {
  authenticationData: AuthenticationData
  categoryData: CategoryData
  profileUserData: ProfileUserData
  isLoggedUserProfile: boolean
  postList: PostListInterface
  likeCount: LikeCountInterface
  postCount: PostCountInterface
  followerCount: FollowCountInterface
  followingCount: FollowCountInterface
  followCheck: CheckFollowingInterface
  create_follow: FollowInterface
  delete_follow: DeleteInterface
}

export default function ProfileIndex({
  authenticationData,
  categoryData,
  profileUserData,
  isLoggedUserProfile,
  postCount,
  likeCount,
  postList,
  followerCount,
  followingCount,
  followCheck,

}: ProfileIndexProps) {
  const [skip, setSkip] = useState(10)
  const [posts, setPosts] = useState(postList)
  const [follows, setFollows] = useState(followerCount.count)
  const [isFollowed, setIsFollowed] = useState(followCheck.is_following)

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
    <Layout authenticationData={authenticationData} categoryData={categoryData} title={`${authenticationData.user.username} profile`}>
      <div className="container">
        <div className="row">

          {/* profile image */}
          <div className="col-md-6 d-flex justify-content-center my-auto">
            <Avatar username={profileUserData.username} useProfileUrl={false} width="6rem" />
          </div>

          {/* profile infos */}
          <div className="col-md-6">
            <div className="mb-3 p-2 border-bottom d-flex">
              <div className="h1 d-inline-block">
                {profileUserData.username} {profileUserData.is_premium && <i title="Premium" className="fs-3 bi bi-gem"></i>}
              </div>

              <div className="ms-auto my-auto">
                {isLoggedUserProfile &&
                  <button className="btn btn-sm btn-outline-secondary" data-bs-toggle="modal" data-bs-target="#editUserModal">
                    <i className="bi bi-pencil-fill"></i>
                  </button>}

                {!isLoggedUserProfile && <div className="ms-auto my-auto">
                  {!isFollowed ?
                    <button className="btn btn-sm btn-primary" onClick={createFollow}>Follow</button>
                    :
                    <button className="btn btn-sm btn-outline-secondary" onClick={deleteFollow}>Unfollow</button>
                  }
                </div>}
              </div>
            </div>

            <div className="d-flex justify-content-evenly">
              <span><span className="fw-bold">{postCount.posts}</span> posts</span>
              <span><span className="fw-bold">{likeCount.likes}</span> likes</span>
              <span><span className="fw-bold">{follows}</span> followers</span>
              <span><span className="fw-bold">{followingCount.count}</span> following</span>
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
            return (<div className="col-12 col-md-4 mb-4" key={i}>
              <PostCard
                id_post={e.id_post}
                title={e.title}
                descriprion={e.description}
                category={e.category.category}
                created_at={e.created_at}
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
      </div>
    </Layout>
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
  let profileUserData = authenticationData.user
  if (!isLoggedUserProfile) {
    profileUserData = await getProfileUserData(username.toString())
  }

  // no user was found
  if (Object.keys(profileUserData).length === 0) {
    return {
      notFound: true
    }
  }

  // get base page data
  const postCount = await PostService.count(profileUserData.username)
  const likeCount = await LikeService.countUserLikes(profileUserData.username)
  const postList = await PostService.list(profileUserData.username)
  const followerCount = await FollowService.countFollowers(profileUserData.username)
  const followingCount = await FollowService.countFollowings(profileUserData.username)
  const followCheck = await FollowService.check(authenticationData.user.username, profileUserData.username)

  return {
    props: {
      authenticationData,
      categoryData,
      profileUserData,
      isLoggedUserProfile,
      postCount,
      likeCount,
      postList,
      followerCount,
      followingCount,
      followCheck
    }
  }
}