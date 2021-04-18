import { urls as frontendUrls } from "../../../config/frontend";
import { urls as backendUrls } from "../../../config/backend";

interface AvatarProps {
  username: string,
  base64?: string
  useProfileUrl?: boolean,
  width?: string
}

export default function Avatar({ username, width, useProfileUrl = true, base64 }: AvatarProps) {
  const profileUrl = frontendUrls.user.profile.replace('{username}', username)
  const profileImageUrl = backendUrls.user.profile_image.replace('{username}', username)
  width = width || '2rem'

  return (
    <a href={useProfileUrl ? profileUrl : undefined}>
      <img
        className="rounded-circle border border-2 border-secondary"
        style={{ 'width': width, 'height': width }}
        src={base64 ? `data:image/png;base64,${base64}` : profileImageUrl}
        alt="avatar"
      />
    </a>
  );
}