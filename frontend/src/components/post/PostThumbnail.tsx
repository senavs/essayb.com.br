import { urls } from "config/backend";

interface PostThumbnailProps {
  id_post: number
}

export default function PostThumbnail({ id_post }: PostThumbnailProps) {

  return (
    <div>
      <img
        src={`${urls.post.thumbnail.replace('{id_post}', id_post.toString())}`}
        alt="post thumbnail"
        style={{ width: '100%', height: '100%', objectFit: 'fill' }}
      />
    </div>
  )
}