import { useState } from "react"
import { GetServerSideProps } from "next"

import Layout from "../../components/common/Layout"
import PostService, { PostListInterface } from "../../libs/services/post"
import { AuthenticationData, getAuthenticationData } from "../../libs/props/auth"
import { CategoryData, getCategoryData } from "../../libs/props/category"
import { CategoryInterface } from "../../libs/services/category"
import Title from "src/components/common/Title"
import PostCard from "src/components/post/PostCard"


interface CategoryProps {
  authenticationData: AuthenticationData
  categoryData: CategoryData
  category: CategoryInterface
  postList: PostListInterface
}


export default function Category({ authenticationData, categoryData, category, postList }: CategoryProps) {
  const [skip, setSkip] = useState(10)
  const [posts, setPosts] = useState(postList)

  function onClickLoadMore(event) {
    PostService.filter(category.id_category, skip)
      .then((res) => {
        if (res.length < 10) {
          event.target.hidden = true
        }
        setSkip(skip + 10)
        setPosts(posts.concat(res))
      })
  }

  return (
    <Layout authenticationData={authenticationData} categoryData={categoryData} title="Edit post">

      <div className="container">

        <div className="row">

          <div className="col">
            <Title>{category.category}</Title>
          </div>
        </div>

        <div className="row">

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

      </div>

    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  // get base page data
  const authenticationData = await getAuthenticationData(ctx)
  const categoryData = await getCategoryData()

  // get category data
  const { categoryName } = ctx.query
  const category = categoryData.filter(e => e.category === categoryName)

  if (category.length === 0) {
    return {
      notFound: true
    }
  }

  const postList = await PostService.filter(category[0].id_category)

  return {
    props: { authenticationData, categoryData, category: category[0], postList },
  }
}