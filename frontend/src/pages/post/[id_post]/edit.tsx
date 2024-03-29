import Router from "next/router";
import { GetServerSideProps } from "next";
import { useState } from "react";

import Layout from "../../../components/common/Layout";
import Post from "../../../components/post/Post";
import PostService from "../../../libs/services/post";
import { ProfileUserData } from "../../../libs/props/profile";
import { AuthenticationData, getAuthenticationData } from "../../../libs/props/auth";
import { CategoryData, getCategoryData } from "../../../libs/props/category";
import { getPostData, PostData } from "../../../libs/props/post";
import { urls } from "config/frontend";
import { fileToBase64, validateImage } from "src/libs/utils/form";


interface EditProps {
  authenticationData: AuthenticationData
  categoryData: CategoryData
  postData: PostData
  userPostData: ProfileUserData
}

interface FormValue {
  title: string,
  description: string,
  content: string,
  thumbnail: string,
  id_category: number
  is_published: boolean
}

export default function Edit({ authenticationData, userPostData, categoryData, postData }: EditProps) {
  const [formValue, setFormValue] = useState({
    title: postData.title,
    description: postData.description,
    content: postData.content,
    thumbnail: null,
    id_category: postData.category.id_category,
    is_published: postData.is_published
  } as FormValue)
  const [errorMessage, setErrorMessage] = useState('')

  function onChange(event) {
    const { name, value, type, checked } = event.target
    setFormValue({
      ...formValue,
      [name]: type === 'checkbox' ? checked : value
    })
  }
  function onFileUpload(event) {
    fileToBase64(event.target.files[0], base64 => {
      setFormValue({
        ...formValue,
        thumbnail: base64
      })
    })
  }
  function onDeletePost(event) {
    event.preventDefault()
    PostService.delete(postData.id_post, authenticationData.token)
      .then(() => Router.push(urls.user.profile.replace('{username}', authenticationData.user.username)))
      .catch(console.log)
  }
  function onSubmit(event) {
    event.preventDefault()

    if (formValue.thumbnail && !validateImage(formValue.thumbnail)) {
      return setErrorMessage('Images must be less then 500Kbs')
    }

    PostService.update(postData.id_post, formValue.title, formValue.description, formValue.thumbnail, formValue.id_category, formValue.content, authenticationData.token)
      .then(() => {
        if (formValue.is_published) {
          PostService.publish(postData.id_post, authenticationData.token)
            .then(() => { })
            .catch(console.log)
        }

        Router.push(urls.post.search.replace('{id_post}', postData.id_post.toString()))
      })
      .catch(err => setErrorMessage(err.message))
  }

  return (
    <Layout authenticationData={authenticationData} categoryData={categoryData} title="Edit post">
      <div className="container">
        <div className="row">

          <nav>
            <div className="nav nav-tabs" id="nav-tab" role="tablist">
              <button className="nav-link active" id="input-tab" data-bs-toggle="tab" data-bs-target="#input" type="button" role="tab" aria-controls="input" aria-selected="true">Edit</button>
              <button className="nav-link" id="output-tab" data-bs-toggle="tab" data-bs-target="#output" type="button" role="tab" aria-controls="output" aria-selected="false">Preview</button>
            </div>
          </nav>

          <div className="tab-content" id="nav-tabContent">

            {/* input */}
            <div className="tab-pane fade show active" id="input" role="tabpanel" aria-labelledby="input-tab">
              <div className="row  d-flex justify-content-center p-2">
                <div className="col-12 col-md-6">
                  <form onSubmit={onSubmit}>
                    <div className="mb-3">
                      <label className="col-form-label">Title:</label>
                      <textarea
                        name="title"
                        minLength={3}
                        maxLength={64}
                        rows={2}
                        className="form-control"
                        value={formValue.title}
                        onChange={onChange}
                      />
                    </div>

                    <div className="mb-3">
                      <label className="col-form-label">Description:</label>
                      <textarea
                        name="description"
                        minLength={3}
                        maxLength={128}
                        rows={4}
                        className="form-control"
                        value={formValue.description}
                        onChange={onChange}
                      />
                    </div>

                    <div className="mb-3">
                      <label className="col-form-label">Thumbnail:</label>
                      <input
                        name="thumbnail"
                        type="file"
                        className="form-control"
                        accept="image/*"
                        onChange={onFileUpload}
                      />
                    </div>

                    <div className="mb-3">
                      <label className="col-form-label">Category:</label>
                      <select
                        className="form-select"
                        name="id_category"
                        onChange={onChange}
                        value={formValue.id_category}
                      >
                        {categoryData.map(e => <option key={e.id_category} value={e.id_category}>{e.category}</option>)}
                      </select>
                    </div>

                    <div className={`mb-3 ${postData.is_published ? "d-none" : ""}`}>
                      <label className="col-form-label">Public:</label>
                      <div>
                        <input
                          type="checkbox"
                          className="custom-control-input ms-2"
                          name="is_published"
                          checked={formValue.is_published}
                          onChange={onChange}
                        />
                        <label className="custom-control-label ms-3">Make it public now</label>
                      </div>
                    </div>

                    {/* separator */}
                    <div className="d-flex justify-content-center mt-3">
                      <span className="h6 ms-2">.</span>
                      <span className="h6 ms-2">.</span>
                      <span className="h6 ms-2">.</span>
                    </div>

                    <div className="mb-3">
                      <label className="col-form-label">Content:</label>
                      <textarea
                        name="content"
                        rows={10}
                        className="form-control"
                        value={formValue.content}
                        onChange={onChange}
                      />
                    </div>

                    <small className="d-block my-3 text-danger">{errorMessage}</small>

                    <div className="d-flex justify-content-evenly mt-3">
                      <button className="btn btn btn-outline-secondary" type="submit">Save changes</button>
                      <button className="btn btn btn-outline-danger" onClick={onDeletePost}>Delete post</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            {/* output */}
            <div className="tab-pane fade" id="output" role="tabpanel" aria-labelledby="output-tab">
              <div className="row  d-flex justify-content-center p-2">
                <div className="col-12 col-md-6">
                  <Post
                    id_post={postData.id_post}
                    username={userPostData.username}
                    title={formValue.title}
                    description={formValue.description}
                    thumbnailBase64={formValue.thumbnail}
                    content={formValue.content}
                    usePostActions={false}
                  />
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  // get base page data
  const authenticationData = await getAuthenticationData(ctx)
  const categoryData = await getCategoryData()

  // get post data
  const { id_post } = ctx.query
  const postData = await getPostData(parseInt(id_post.toString()))
  const { user: userPostData } = postData

  if (Object.keys(postData).length === 0 || authenticationData.user.username !== userPostData.username) {
    return {
      notFound: true
    }
  }

  return {
    props: { authenticationData, categoryData, postData, userPostData },
  }
}