import { urls as frontendUrls } from "config/frontend";
import { urls as backendUrls } from "config/backend";

interface AvatarProps {
  username: string,
  width?: string
}

export default function Avatar({ username, width }: AvatarProps) {
  const profileUrl = frontendUrls.user.profile.replace('{username}', username)
  const profileImageUrl = backendUrls.user.profile_image.replace('{username}', username)
  width = width || '2rem'

  return (
    <a href={profileUrl}>
      <img className="rounded-circle border border-2 border-secondary" style={{ 'width': width }} src={profileImageUrl} alt="avatar" />
    </a>
  );
}