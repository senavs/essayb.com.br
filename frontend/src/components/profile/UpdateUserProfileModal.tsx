import Router from "next/router"
import { useState } from "react"

import { AuthenticationDataInterface } from "src/libs/serverSide/auth"
import { ProfileUserData } from "src/libs/serverSide/profile"
import UserService from "src/libs/services/user"
import { fileToBase64, validatePasswords } from "src/libs/utils/form"
import styles from 'src/styles/components/profile/UpdateUserProfileModal.module.css'
import Avatar from "./Avatar"


interface UpdateUserProfileModalProps {
  authenticationData: AuthenticationDataInterface
  profileUserData: ProfileUserData
}

interface FormValue {
  new_password: string
  confirm_new_password: string
  profile_image: string
  bio: string
  url_linkedin: string
  url_instagram: string
  url_website: string
}

function initialFormValue(profileUserData: ProfileUserData): FormValue {
  return {
    new_password: '',
    confirm_new_password: '',
    profile_image: '',
    bio: profileUserData.bio || '',
    url_linkedin: profileUserData.url_linkedin || '',
    url_instagram: profileUserData.url_instagram || '',
    url_website: profileUserData.url_website || ''
  }
}

export default function UpdateUserProfileModal({ authenticationData, profileUserData }: UpdateUserProfileModalProps) {
  const [formValue, setFormValue] = useState(initialFormValue(profileUserData))
  const [errorMessage, setErrorMessage] = useState('')

  function onChange(event) {
    const { name, value } = event.target
    setFormValue({
      ...formValue,
      [name]: value
    })
  }
  function onSubmit(event) {
    setErrorMessage('')

    if (!validatePasswords(formValue.new_password, formValue.confirm_new_password)) {
      return setErrorMessage('Passwords didn\'t match')
    }

    UserService.update(authenticationData.token, formValue.new_password, formValue.profile_image,
      formValue.bio, formValue.url_linkedin, formValue.url_instagram, formValue.url_website)
      .then(res => {
        setErrorMessage('')
        document.getElementById('btn-close').click()
        Router.reload()
      })
      .catch(err => setErrorMessage(err.message))
  }
  function onCancel() {
    setFormValue(initialFormValue(profileUserData))
  }
  function onClickUpdateProfileImage(event) {
    document.getElementById('hidden-profile-image-input').click()
  }
  function onChangeUpdateProfileImageInput(event) {
    fileToBase64(event.target.files[0], base64 => {
      setFormValue({
        ...formValue,
        profile_image: base64
      })
      let avatarImg = document.getElementById('profile-image-avatar').getElementsByTagName('img')[0]
      avatarImg.src = `data:image/png;base64,${base64}`
    })
  }

  return (
    <div className="modal fade" id="editUserModal" tabIndex={-1} aria-labelledby="editUserModalHeader" aria-hidden="true" data-bs-backdrop="static" data-bs-keyboard="false">
      <div className="modal-dialog modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="editUserModalHeader">Edit profile</h5>
          </div>
          <div className="modal-body">

            <form>
              {/* profile image */}
              <div className="row mb-3 d-flex justify-content-center">
                <label className="col-form-label">Profile image:</label>
                <div className="col-5 d-flex justify-content-center">
                  <Avatar username={profileUserData.username} useProfileUrl={false} width="6rem" />
                </div>
                <div className="col-1 d-flex align-items-center">
                  <i className="bi bi-arrow-left-right"></i>
                </div>
                <div className="col-5 d-flex justify-content-center">
                  <div id="profile-image-avatar" className={styles.updateProfileImage} onClick={onClickUpdateProfileImage}>
                    <Avatar username={profileUserData.username} useProfileUrl={false} width="6rem" />
                  </div>
                  <input
                    id="hidden-profile-image-input"
                    className="d-none"
                    name="profile_image"
                    type="file"
                    accept="image/*"
                    onChange={onChangeUpdateProfileImageInput}
                  />
                </div>
              </div>

              {/* bio */}
              <div className="mb-3">
                <label className="col-form-label">Bio:</label>
                <textarea
                  name="bio"
                  maxLength={256}
                  rows={4}
                  className="form-control"
                  value={formValue.bio}
                  onChange={onChange}
                />
              </div>

              {/* links */}
              <div className="mb-3">
                <label className="col-form-label">Links:</label>
                <div className="input-group mb-2">
                  <span className="input-group-text"><i className="bi bi-linkedin"></i></span>
                  <input
                    className="form-control"
                    name="url_linkedin"
                    type="text"
                    maxLength={128}
                    placeholder="linkedin.com/in/essayB"
                    value={formValue.url_linkedin}
                    onChange={onChange}
                  />
                </div>
                <div className="input-group mb-2">
                  <span className="input-group-text"><i className="bi bi-instagram"></i></span>
                  <input
                    className="form-control"
                    name="url_instagram"
                    type="text"
                    maxLength={128}
                    placeholder="instagram.com/essayB"
                    value={formValue.url_instagram}
                    onChange={onChange}
                  />
                </div>
                <div className="input-group">
                  <span className="input-group-text"><i className="bi bi-link-45deg"></i></span>
                  <input
                    className="form-control"
                    name="url_website"
                    type="text"
                    maxLength={128}
                    placeholder="youtube.com/user/essayB"
                    defaultValue={formValue.url_website}
                    onChange={onChange}
                  />
                </div>
              </div>

              {/* passwords */}
              <label className="col-form-label">Change password:</label>
              <input
                type="password"
                name="new_password"
                maxLength={256}
                className="form-control mb-2"
                placeholder="New password"
                minLength={3}
                value={formValue.new_password}
                onChange={onChange}
              />
              <input
                type="password"
                name="confirm_new_password"
                maxLength={256}
                className="form-control mb-2"
                placeholder="Confirm new password"
                minLength={3}
                value={formValue.confirm_new_password}
                onChange={onChange}
              />
            </form>
            <small className="d-block mb-3 text-danger">{errorMessage}</small>
          </div>
          <div className="modal-footer">
            <button id="btn-close" type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={onCancel}>Cancel</button>
            <button type="button" className="btn btn-secondary" onClick={onSubmit}>Save changes</button>
          </div>
        </div>
      </div>
    </div>
  )
}