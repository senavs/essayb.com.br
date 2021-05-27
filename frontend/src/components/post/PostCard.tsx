import styles from '../../styles/components/post/PostCard.module.css'
import { formatDate } from '../../libs/utils/form'
import { urls as backendUrl } from '../../../config/backend'
import { urls as frontendUrl } from '../../../config/frontend'


interface PostCardProps {
  id_post: number
  category: string
  title: string
  descriprion: string
  is_published: boolean
  publish_at: string
  create_at: string
}

export default function PostCard({ id_post, category, title, descriprion, is_published, publish_at, create_at }: PostCardProps) {
  const isLock = !is_published && !publish_at
  const isSchedule = !is_published && publish_at

  const date = publish_at ? publish_at : create_at

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
              {isLock && <span><i className="text-dark bi bi-lock-fill"></i> </span>}
              {isSchedule && <span><i className="text-dark bi bi-clock-fill"></i> </span>}
              <span className="fw-bold text-dark">{title}</span>
            </div>

            <div className="mb-2">
              <span className={`${styles.description} text-secondary`}>{descriprion}</span>
            </div>

            <div>
              <small className={`${styles.createdAt} text-secondary`}>
                <strong>Published at: </strong>
                <i>{formatDate(new Date(date))}</i>
              </small>
            </div>
          </div>

        </div>
      </div>
    </a>
  )
}