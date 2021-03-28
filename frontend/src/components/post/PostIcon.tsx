import styles from '../../styles/components/post/PostIcon.module.css'
import { formatDate } from '../../libs/utils/form'
import { urls as backendUrl } from '../../../config/backend'
import { urls as frontendUrl } from '../../../config/frontend'


interface PostIconProps {
  id_post: number
  category: string
  title: string
  descriprion: string
  created_at: string
}

export default function PostIcon({ id_post, category, title, descriprion, created_at }: PostIconProps) {
  return (
    <div className={`${styles.body} container border rounded shadow-sm p-2`}>
      <div className="row">
        <div className="col mb-2">
          <small className={`${styles.category} text-success fw-bold`}>{category}</small>
        </div>
      </div>

      <div className="row">
        <div className="col-12 col-md-8">
          <div className={`${styles.title} mb-2`}>
            <a href={frontendUrl.post.search.replace('{id_post}', id_post.toString())}>
              <span className="fw-bold">{title}</span>
            </a>
          </div>
          <div className="mb-2">
            <span className={`${styles.description} text-secondary`}>{descriprion}</span>
          </div>
          <div>
            <small className={`${styles.createdAt} text-secondary`}>
              <strong>Published at: </strong>
              <i>{formatDate(new Date(created_at))}</i>
            </small>
          </div>
        </div>
        <div className={`${styles.thumbnail} col-4 d-none d-md-block`}>
          <img src={backendUrl.post.thumbnail.replace('{id_post}', id_post.toString())} alt="post thumbnail" />
        </div>
      </div>
    </div>
  )
}