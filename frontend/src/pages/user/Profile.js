import { useParams } from 'react-router-dom'

import Avatar from '../../components/user/Avatar'
import Title from '../../components/common/Title'


export default function Profile() {
  // states
  const { username } = useParams()

  // render
  return (
    <div className="container">
      <div className="row">

        {/* profile image */}
        <div className="col-md-6 d-flex justify-content-center my-auto">
          <Avatar width="6rem" />
        </div>

        {/* profile infos */}
        <div className="col-md-6">
          <div className="mb-3 p-2 border-bottom d-flex">
            <div className="h1 d-inline-block">
              {username}
            </div>
            <div className="ms-auto my-auto">
              <button className="btn btn-outline-secondary">Edit profile</button>
            </div>
          </div>
          <div className="d-flex justify-content-evenly">
            <span><span className="fw-bold">{32}</span> posts</span>
            <span><span className="fw-bold">{12398}</span> likes</span>
            <span><span className="fw-bold">{100}</span> followers</span>
            <span><span className="fw-bold">{123}</span> following</span>
          </div>
        </div>

        {/* user info */}
        <div className="col-md-6 mt-md-4 my-4 d-flex justify-content-evenly">
          <i class="fs-2 bi bi-linkedin"></i>
          <i class="fs-2 bi bi-instagram"></i>
          <i class="fs-2 bi bi-link-45deg"></i>
        </div>

        <div className="col-md-6 mt-md-4">
          <p style={{ textAlign: 'justify' }}>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Loreasdasda sd a.
          </p>
        </div>

        {/* posts */}
        <Title>Posts</Title>
      </div>
    </div>
  )
}