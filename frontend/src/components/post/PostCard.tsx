import styles from '../../styles/components/post/PostCard.module.css'
import { formatDate } from '../../libs/utils/form'
import { urls as backendUrl } from '../../../config/backend'
import { urls as frontendUrl } from '../../../config/frontend'


interface PostCardProps {
  id_post: number
  category: string
  title: string
  descriprion: string
  created_at: string
}

export default function PostCard({ id_post, category, title, descriprion, created_at }: PostCardProps) {
  return (
    <a className={styles.button} href={frontendUrl.post.search.replace('{id_post}', id_post.toString())}>
      <div className={`${styles.body} container border rounded shadow-sm p-2`}>
        <div className="row mb-2">
          <div className={`${styles.thumbnail} col`}>
            <img src={backendUrl.post.thumbnail.replace('{id_post}', id_post.toString())} alt="post thumbnail" />
          </div>
        </div>

        <div className="row">
          <div className="col-12 mb-2">
            <div className="mb-2">
              <small className={`${styles.category} text-success fw-bold`}>{category}</small>
            </div>

            <div className={`${styles.title} mb-2`}>
              <span className="fw-bold text-dark">{title}</span>
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

        </div>
      </div>
    </a>
  )
}