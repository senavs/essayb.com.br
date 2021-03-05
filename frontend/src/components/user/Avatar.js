import { Link } from 'react-router-dom'


export default function Avatar({ profileImage, username, width }) {
  // vars
  const profileUrl = username ? `/profile/${username}` : '/profile'
  profileImage = profileImage ? `data:image/png;base64,${profileImage}` : '/static/default-avatar.jpg'
  width = width || '2rem'

  // render
  return (
    <Link to={profileUrl}>
      <img className="rounded-circle border border-2 border-secondary" style={{ 'width': width }} src={profileImage} alt="avatar" />
    </Link>
  );
}
