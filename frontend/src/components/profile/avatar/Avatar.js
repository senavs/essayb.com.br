import { Link } from 'react-router-dom'


export default function Avatar({ userPicture, width }) {
  // vars
  userPicture = userPicture || '/static/default-avatar.png'
  width = width || '32px'

  // render
  return (
    <Link to="/profile">
      <img className="rounded-circle border border-2 border-dark" style={{ 'width': width }} src={userPicture} alt="profile" />
    </Link>
  );
}
