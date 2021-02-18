import { Link } from 'react-router-dom'

function Avatar({ userPicture, width }) {
  // vars
  userPicture = userPicture || '/static/default-avatar.png'
  width = width || '32px'

  return (
    <Link to="/profile">
      <img className="rounded-circle border border-2 border-dark" style={{ 'width': width }} src={userPicture} alt="profile" />
    </Link>
  );
}

export default Avatar;
