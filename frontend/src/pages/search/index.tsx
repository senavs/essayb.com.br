import { GetServerSideProps } from "next"
import { useState } from "react"
import Title from "src/components/common/Title"
import PostService from "src/libs/services/post"
import UserService from "src/libs/services/user"

import Layout from "../../components/common/Layout"
import { AuthenticationData, getAuthenticationData } from "../../libs/props/auth"
import { CategoryData, getCategoryData } from "../../libs/props/category"


interface SearchProps {
  authenticationData: AuthenticationData
  categoryData: CategoryData
}

export default function Search({ authenticationData, categoryData }: SearchProps) {
  const [query, setQuery] = useState('')
  const [users, setUsers] = useState([])
  const [posts, setPosts] = useState([])


  function onChange(event) {
    setQuery(event.target.value)
  }
  function onKeyPress(event) {
    if (event.key === 'Enter') {
      return search()
    }
  }
  function search() {
    UserService.query(query).then(setUsers).catch()
    PostService.query(query).then(setPosts).catch()
  }


  return (
    <Layout authenticationData={authenticationData} categoryData={categoryData} title="Search">
      <div className="container">
        <div className="row">
          <div className="offset-md-2 col-md-8 col-12">

            <Title>Search for user and posts</Title>

            <div className="input-group mb-3">
              <input type="text" className="form-control" placeholder="Username or Post title" value={query} onChange={onChange} onKeyPress={onKeyPress} />
              <button className="btn btn-outline-secondary" type="button" onClick={search}>Search</button>
            </div>

          </div>
        </div>

        <div className="row mt-4 p-3">
          <div className="col">
            users
          </div>
        </div>

        <div className="row mt-4 p-3">
          <div className="col">
            users
          </div>
        </div>
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