import { Link } from 'react-router-dom'

import styles from '../../styles/components/cards/CompletedCard.module.css'


export default function CompletedCard({ author, category, title, backgroundImage, url }) {
  backgroundImage = backgroundImage ? `data:image/png;base64,${backgroundImage}` : '/static/default-completedcard-background.jpeg'

  //render
  return (
    <div className={`${styles.completedCard} border rounded-3 shadow-sm overflow-hidden`}>
      <Link className={styles.clickableCard} to={url}>
        <div className={styles.background}>
          <img src={backgroundImage} alt="thumbnail" />
        </div>
        <div className="row p-3">
          <div className="col-6">
            <h5 className="category text-white fw-bold">{category}</h5>
          </div>
          <div className="col-12">
            <h5 className="category text-white fw-bold ps-3">by {author}</h5>
          </div>
          <div className={`${styles.title} col-12 d-flex align-items-end`}>
            <h1 className="text-white fw-bold">{title}</h1>
          </div>
        </div>
      </Link>
    </div>
  )
}