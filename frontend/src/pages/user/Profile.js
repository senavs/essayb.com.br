import { useContext, useState } from 'react'
import { useParams } from 'react-router-dom'

import { AuthContext } from '../../contexts/auth'
import Avatar from '../../components/user/Avatar'
import Title from '../../components/common/Title'
import UserService from '../../services/user'
import LinkIcon from '../../components/user/LinkIcon'


export default function Profile() {
  // contexts
  const { user } = useContext(AuthContext)
  const [userPageInfo, setUserPageInfo] = useState({})

  // params
  const { usernameParam } = useParams()
  const usernamePage = usernameParam ? usernameParam : user.username
  const isCurrentUserPage = usernamePage === user.username

  console.log(usernamePage)

  // states
  useState(() => {
    UserService.search(usernamePage)
      .then(setUserPageInfo)
      .catch(console.log)
  }, [])


  // render
  return (
    <div className="container">
      <div className="row">

        {/* profile image */}
        <div className="col-md-6 d-flex justify-content-center my-auto">
          <Avatar username={userPageInfo.username} profileImage={userPageInfo.profile_image} width="6rem" />
        </div>

        {/* profile infos */}
        <div className="col-md-6">
          <div className="mb-3 p-2 border-bottom d-flex">
            <div className="h1 d-inline-block">
              {userPageInfo.username} {userPageInfo.is_premium && <i class="fs-3 bi bi-gem"></i>}
            </div>
            <div className="ms-auto my-auto">
              {isCurrentUserPage && <button className="btn btn-outline-secondary"><i class="bi bi-pencil-fill"></i></button>}
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
          {userPageInfo.url_linkedin && <LinkIcon iconName="linkedin" href={userPageInfo.url_linkedin} />}
          {userPageInfo.url_instagram && <LinkIcon iconName="instagram" href={userPageInfo.url_instagram} />}
          {userPageInfo.url_website && <LinkIcon iconName="link-45deg" href={userPageInfo.url_website} />}
        </div>

        <div className="col-md-6 mt-md-4">
          <p style={{ textAlign: 'justify' }}>
            {userPageInfo.bio}
          </p>
        </div>

        {/* posts */}
        <Title>Posts</Title>
      </div>
    </div>
  )
}