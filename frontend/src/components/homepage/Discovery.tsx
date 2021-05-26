import styles from '../../styles/components/post/PostCard.module.css'
import { formatDate } from '../../libs/utils/form'
import { urls as backendUrl } from '../../../config/backend'
import { urls as urls } from '../../../config/frontend'


interface DiscoveryProps {
    id_post: number
    title: string
    descriprion: string
    created_at: string
}

export default function DiscoveryCard({ id_post, title, descriprion, created_at }: DiscoveryProps) {

    return (
        <div className="row" style={{ padding: "0.5rem" }}>
            <div className="col">
                <div className="card h-100">
                    <div className={`${styles.thumbnail} col`}>
                        <img src={backendUrl.post.thumbnail.replace('{id_post}', id_post.toString())} alt="post thumbnail" />
                    </div>
                    <div className="card-body">
                        <h5 className="card-title">{title}</h5>
                        <p className="card-text">{descriprion}</p>
                        <a className="stretched-link" target="_blank" href={urls.post.search.replace('{id_post}', id_post.toString())} >Continue reading...</a>
                    </div>
                    <div style={{ padding: '0.8rem' }} className="card-footer" >
                        <small className={`${styles.createdAt} text-secondary text-muted`} >
                            <strong>Published at: </strong>
                            <i>{formatDate(new Date(created_at))}</i>
                        </small>
                    </div>
                </div>
            </div>
        </div>
    )
}
