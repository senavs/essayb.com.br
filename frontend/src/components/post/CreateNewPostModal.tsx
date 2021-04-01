import Router from "next/router"
import { useContext, useState } from "react"

import PostService from "../../libs/services/post"
import { fileToBase64, validateImage } from "../../libs/utils/form"
import { AuthContext } from "../../libs/contexts/auth"
import { CategoryContext } from "../../libs/contexts/category"
import { urls } from "../../../config/frontend"


interface FormValue {
  title: string
  description: string
  thumbnail: string
  id_category: number
}

function initialFormValue(): FormValue {
  return {
    title: '',
    description: '',
    thumbnail: '',
    id_category: 1
  }
}

export default function CreateNewPostModal() {
  const { authenticationData } = useContext(AuthContext)
  const { categoryData } = useContext(CategoryContext)
  
  const [formValue, setFormValue] = useState(initialFormValue())
  const [errorMessage, setErrorMessage] = useState('')

  function onChange(event) {
    const { name, value } = event.target
    setFormValue({
      ...formValue,
      [name]: value
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

    PostService.create(formValue.title, formValue.description, formValue.thumbnail, formValue.id_category, authenticationData.token)
      .then(() => {
        document.getElementById('btn-close').click()
        Router.push(urls.post.create)
      })
      .catch(err => setErrorMessage(err.message))
  }
  function onCancel() {
    setFormValue(initialFormValue())
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