import { urls } from "config/backend";

interface PostThumbnailProps {
  id_post: number,
  base64?: string
}

export default function PostThumbnail({ id_post, base64 }: PostThumbnailProps) {
  const src = base64 ? `data:image/png;base64,${base64}` : urls.post.thumbnail.replace('{id_post}', id_post.toString())

  return (
    <div>
      <img
        src={src}
        alt="post thumbnail"
        style={{ width: '100%', height: '100%', objectFit: 'fill' }}
      />
    </div>
  )
}