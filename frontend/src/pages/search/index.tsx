import { GetServerSideProps } from "next"
import { useState } from "react"
import Title from "src/components/common/Title"
import PostCard from "src/components/post/PostCard"
import UserCard from "src/components/profile/UserCard"
import PostService, { PostListInterface } from "src/libs/services/post"
import UserService, { UserListInterface } from "src/libs/services/user"

import Layout from "../../components/common/Layout"
import { AuthenticationData, getAuthenticationData } from "../../libs/props/auth"
import { CategoryData, getCategoryData } from "../../libs/props/category"


interface SearchProps {
  authenticationData: AuthenticationData
  categoryData: CategoryData
}

export default function Search({ authenticationData, categoryData }: SearchProps) {
  const [query, setQuery] = useState('')
  const [users, setUsers] = useState([] as UserListInterface)
  const [skipUser, setSkipUser] = useState(10)
  const [posts, setPosts] = useState([] as PostListInterface)
  const [skipPost, setSkipPost] = useState(10)


  function onChange(event) {
    setQuery(event.target.value)
  }
  function onKeyPress(event) {
    if (event.key === 'Enter') {
      return search()
    }
    if (users.length !== 0 || posts.length !== 0) {
      setUsers([])
      setPosts([])
    }
  }
  function search() {
    UserService.query(query).then(setUsers).catch()
    PostService.query(query).then(setPosts).catch()
  }
  function onClickLoadMorePost(event) {
    PostService.query(query, skipPost)
      .then((res) => {
        if (res.length < 10) {
          event.target.hidden = true
        }
        setSkipPost(skipPost + 10)
        setPosts(posts.concat(res))
      })
  }
  function onClickLoadMoreUser(event) {
    UserService.query(query, skipUser)
      .then((res) => {
        if (res.length < 10) {
          event.target.hidden = true
        }
        setSkipUser(skipUser + 10)
        setUsers(users.concat(res))
      })
  }

  return (
    <Layout authenticationData={authenticationData} categoryData={categoryData} title="Search">
      <div className="container">
        <div className="row">
          <div className="offset-md-2 col-md-8 col-12">

            <Title>Search for users and posts</Title>

            <div className="input-group mb-3">
              <input type="text" className="form-control" placeholder="Username or Post title" value={query} onChange={onChange} onKeyPress={onKeyPress} />
              <button className="btn btn-outline-secondary" type="button" onClick={search}>Search</button>
            </div>

          </div>
        </div>

        {/* users */}
        <div className="row mt-4 p-3">
          {users.map((user, index) => {
            return (
              <div className="col-md-4 col-12" key={index}>
                <UserCard username={user.username} />
              </div>
            )
          })}
        </div>

        {users.length >= 10 && (
          <div className="d-flex justify-content-center">
            <button className="btn btn-outline-secondary" onClick={onClickLoadMoreUser}>Load more users</button>
          </div>
        )}

        {/* posts */}
        <div className="row mt-4 p-3">
          {posts.map((post, index) => {
            if (!post.is_published) {
              return null
            }

            return (
              <div className="col-md-4 col-12" key={index}>
                <PostCard
                  id_post={post.id_post}
                  category={post.category.category}
                  title={post.title}
                  descriprion={post.description}
                  is_published={post.is_published}
                  publish_at={post.publish_at}
                  create_at={post.created_at}
                />
              </div>
            )
          })}
        </div>

        {posts.length >= 10 && (
          <div className="d-flex justify-content-center">
            <button className="btn btn-outline-secondary" onClick={onClickLoadMorePost}>Load more posts</button>
          </div>
        )}
      </div>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const authenticationData = await getAuthenticationData(ctx)
  const categoryData = await getCategoryData()

  return {
    props: { authenticationData, categoryData }
  }
}