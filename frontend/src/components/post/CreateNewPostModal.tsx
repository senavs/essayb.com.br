import Router from "next/router"
import { useContext, useState } from "react"

import PostService from "../../libs/services/post"
import { fileToBase64, today, validateImage } from "../../libs/utils/form"
import { AuthContext } from "../../libs/contexts/auth"
import { CategoryContext } from "../../libs/contexts/category"
import { urls } from "../../../config/frontend"
import { PremiumContext } from "src/libs/contexts/premium"


interface FormValue {
  title: string
  description: string
  thumbnail: string
  id_category: number
  is_published: boolean,
  use_schedule: boolean
  publish_at: string
}

function initialFormValue(): FormValue {
  return {
    title: '',
    description: '',
    thumbnail: '',
    id_category: 1,
    is_published: false,
    use_schedule: false,
    publish_at: ""
  }
}

export default function CreateNewPostModal() {
  const { authenticationData } = useContext(AuthContext)
  const { categoryData } = useContext(CategoryContext)
  const { premiumData } = useContext(PremiumContext)

  const [formValue, setFormValue] = useState(initialFormValue())
  const [errorMessage, setErrorMessage] = useState('')

  function disableSchedule(event) {
    const { name, checked } = event.target
    setFormValue({
      ...formValue,
      publish_at: checked ? formValue.publish_at : '',
      [name]: checked
    })
    const element = (document.getElementsByName('publish_at') as any)[0]
    element.disabled = !checked
  }
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
  function onSave() {
    document.getElementById('hidden-submit-button').click()
  }
  function onSubmit(event) {
    event.preventDefault()

    if (!validateImage(formValue.thumbnail)) {
      return setErrorMessage('Images must be less then 500Kbs')
    }

    PostService.create(
      formValue.title,
      formValue.description,
      formValue.thumbnail,
      formValue.id_category,
      formValue.is_published,
      formValue.publish_at,
      authenticationData.token
    )
      .then(res => {
        document.getElementById('btn-close').click()
        Router.push(urls.post.edit.replace('{id_post}', res.id_post.toString()))
      })
      .catch(err => setErrorMessage(err.message))
  }
  function onCancel() {
    setFormValue(initialFormValue())
  }

  if (!premiumData.is_allow_create_post) {
    return (
      <div className="modal fade" id="createPostModal" tabIndex={-1} aria-labelledby="createPostModalHeader" aria-hidden="true" data-bs-backdrop="static" data-bs-keyboard="false">
        <div className="modal-dialog modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="createPostModalHeader">Create new post</h5>
            </div>

            <div className="modal-body">
              <div className="d-flex justify-content-center my-3">
                <i className="fs-2 bi bi-emoji-frown mx-2"></i>
                <span className="fs-2">Posts limit exceeded!</span>
              </div>

              <div className="d-flex justify-content-center my-3">
                <span className="fs-4 text-center text-danger">You have reached the posts limit.</span>
              </div>

              <div className="d-flex justify-content-center my-3">
                <span className="fs-3 text-center">
                  Became <a href={urls.payment.subscribe}>premium</a> today and have limited access.
                  </span>
              </div>
            </div>

            <div className="modal-footer">
              <button id="btn-close" type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={onCancel}>Cancel</button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="modal fade" id="createPostModal" tabIndex={-1} aria-labelledby="createPostModalHeader" aria-hidden="true" data-bs-backdrop="static" data-bs-keyboard="false">
      <div className="modal-dialog modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="createPostModalHeader">Create new post</h5>
          </div>

          <div className="modal-body">

            <form onSubmit={onSubmit}>
              <div className="mb-3">
                <label className="col-form-label">Title:</label>
                <textarea
                  name="title"
                  maxLength={64}
                  rows={2}
                  className="form-control"
                  value={formValue.title}
                  onChange={onChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="col-form-label">Description:</label>
                <textarea
                  name="description"
                  maxLength={128}
                  rows={4}
                  className="form-control"
                  value={formValue.description}
                  onChange={onChange}
                  required
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
                  required
                />
              </div>

              <div className="mb-3">
                <label className="col-form-label">Category:</label>
                <select
                  className="form-select"
                  name="id_category"
                  onChange={onChange}
                  value={formValue.id_category}
                  required
                >
                  {categoryData.map(e => <option key={e.id_category} value={e.id_category}>{e.category}</option>)}
                </select>
              </div>

              <div className="mb-3">
                <label className="col-form-label">Public:</label>
                <div>
                  <input
                    type="checkbox"
                    className="custom-control-input ms-2"
                    name="is_published"
                    checked={formValue.is_published}
                    onChange={onChange}
                  />
                  <label className="custom-control-label ms-3">Make it public when create</label>
                </div>
              </div>

              <div className="mb-3">
                <label className="col-form-label"><i className="small bi bi-gem"></i> Schedule: </label>
                <div>
                  <input
                    type="checkbox"
                    className="custom-control-input ms-2"
                    name="use_schedule"
                    checked={formValue.use_schedule}
                    onChange={disableSchedule}
                    disabled={premiumData.is_premium ? false : true}
                  />
                  <label className="custom-control-label ms-3">Post with scheduler</label>
                </div>
                <div>
                  <input
                    className="form-control"
                    type="date"
                    name="publish_at"
                    value={formValue.publish_at}
                    onChange={onChange}
                    disabled
                  />
                </div>
              </div>

              <button id="hidden-submit-button" className="d-none" type="submit"></button>
            </form>

            <small className="d-block mb-3 text-danger">{errorMessage}</small>
          </div>

          <div className="modal-footer">
            <button id="btn-close" type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={onCancel}>Cancel</button>
            <button type="button" className="btn btn-secondary" onClick={onSave}>Create</button>
          </div>

        </div>
      </div>
    </div>
  )
}