import { urls } from "config/frontend";

interface AvatarProps {
  profileImage?: string,
  username?: string,
  width?: string
}

export default function Avatar({ profileImage, username, width }: AvatarProps) {
  const profileUrl = username ? urls.user.others.replace(':usernameParam', username) : urls.user.me
  profileImage = profileImage ? `data:image/png;base64,${profileImage}` : '/static/default-avatar.jpg'
  width = width || '2rem'

  return (
    <a href={profileUrl}>
      <img className="rounded-circle border border-2 border-secondary" style={{ 'width': width }} src={profileImage} alt="avatar" />
    </a>
  );
}