import { urls } from "config/frontend";

interface AvatarProps {
  username: string,
  profileImage?: string,
  width?: string
}

export default function Avatar({ username, profileImage, width }: AvatarProps) {
  const profileUrl = urls.user.profile.replace('{username}', username)
  profileImage = profileImage ? `data:image/png;base64,${profileImage}` : '/static/default-avatar.jpg'
  width = width || '2rem'

  return (
    <a href={profileUrl}>
      <img className="rounded-circle border border-2 border-secondary" style={{ 'width': width }} src={profileImage} alt="avatar" />
    </a>
  );
}