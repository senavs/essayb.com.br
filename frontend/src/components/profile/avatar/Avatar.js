import { Link } from 'react-router-dom'


export default function Avatar({ profileImage, width }) {
  // vars
  profileImage = profileImage ? `data:image/png;base64,${profileImage}` : '/static/default-avatar.jpg'
  width = width || '32px'

  // render
  return (
    <Link to="/profile">
      <img className="rounded-circle border border-2 border-secondary" style={{ 'width': width }} src={profileImage} alt="avatar" />
    </Link>
  );
}
