import styles from '../../styles/components/post/PostCard.module.css'
import { formatDate } from '../../libs/utils/form'
import { urls as backendUrl } from '../../../config/backend'
import { urls as urls } from '../../../config/frontend'

interface PostProps {
    id_post: number
    title: string
    descriprion: string
    created_at: string
}


export default function PostCard({ id_post, title, descriprion, created_at }: PostProps) {

/* 
    return (
        <div className="col" style={{ padding: "0.55rem" }}>
            <div className="card h-100">
                <div className={`${styles.thumbnail} col-8`}>
                    <img src={backendUrl.post.thumbnail.replace('{id_post}', id_post.toString())} alt="post thumbnail" />
                </div>
                <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text">{descriprion}</p>
                    <a className="stretched-link" target="_blank" href={urls.post.search.replace('{id_post}', id_post.toString())} >Continue reading...</a>
                </div>
                <div style={{ padding: "0.5rem" }}>
                    <small className={`${styles.createdAt} text-secondary`}>
                        <strong>Published at: </strong>
                        <i>{formatDate(new Date(created_at))}</i>
                    </small>
                </div>
            </div>
        </div>
    ) */

    return (
        <div className="card mb-3 max-width: 540px">
            <div className="row g-0">
                <div className="col-md-5">
                    <div className="row mb-2">
                        <div className={`${styles.thumbnail} col`}>
                            <img src={backendUrl.post.thumbnail.replace('{id_post}', id_post.toString())} alt="post thumbnail" />
                        </div>
                    </div>
                </div>
                <div className="col-md-7">
                    <div className="card-body">
                        <h5 className="card-title">{title}</h5>
                        <div>
                            <small className={`${styles.createdAt} text-secondary`}>
                                <strong>Published at: </strong>
                                <i>{formatDate(new Date(created_at))}</i>
                            </small>
                        </div>
                        <p className="card-text">{descriprion}</p>
                        <a className="stretched-link" target="_blank" href={urls.post.search.replace('{id_post}', id_post.toString())} >Continue reading...</a>
                    </div>
                </div>
            </div>
        </div>
    )
}
