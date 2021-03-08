export default function UpdateUserProfileModal({ bio, url_linkedin, url_instagram, url_website }) {
  // function
  function onSubmit(event) {
    document.getElementById('hidden-submit-button').click()
  }

  // return
  return (
    <div className="modal fade" id="editUserModal" tabIndex={-1} aria-labelledby="editUserModalHeader" aria-hidden="true">
      <div className="modal-dialog modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="editUserModalHeader">Edit profile</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">

            <form>
              {/* bio */}
              <div className="mb-3">
                <label className="col-form-label">Bio:</label>
                <textarea name="bio" maxLength={256} rows={4} className="form-control" />
              </div>

              {/* links */}
              <div className="mb-3">
                <label className="col-form-label">Links:</label>
                <div className="input-group mb-2">
                  <span className="input-group-text"><i className="bi bi-linkedin"></i></span>
                  <input className="form-control" name="url_linkedin" type="text" maxLength={128} placeholder="linkedin.com/in/essayB" />
                </div>
                <div className="input-group mb-2">
                  <span className="input-group-text"><i className="bi bi-instagram"></i></span>
                  <input className="form-control" name="url_instagram" type="text" maxLength={128} placeholder="instagram.com/essayB" />
                </div>
                <div className="input-group">
                  <span className="input-group-text"><i className="bi bi-link-45deg"></i></span>
                  <input className="form-control" name="url_website" type="text" maxLength={128} placeholder="youtube.com/user/essayB" />
                </div>
              </div>

              {/* passwords */}
              <label className="col-form-label">Change password:</label>
              <input type="password" maxLength={256} className="form-control mb-2" placeholder="New password" />
              <input type="password" maxLength={256} className="form-control mb-2" placeholder="Confirm new password" />

              {/* apply changes with password */}
              <label className="col-form-label mt-5">Enter your password to apply changes:</label>
              <input type="password" maxLength={256} className="form-control mb-2" placeholder="User password" required />

              <button id="hidden-submit-button" type="submit" className="d-none" ></button>
            </form>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Cancel</button>
            <button type="button" className="btn btn-secondary" onClick={onSubmit}>Save changes</button>
          </div>
        </div>
      </div>
    </div>
  )
}