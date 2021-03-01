import { Link } from 'react-router-dom'
import style from './MainCard.module.css'


export default function MainCard({ author, category, title, backgroundImage, url }) {

  //render
  return (
    <div className={`${style.mainCard} border rounded-3 shadow-sm overflow-hidden`}>
      <Link className={style.clickableCard} to={url}>
        <div className={style.background}>
          <img src={backgroundImage} alt="thumbnail" />
        </div>
        <div className="row p-3">
          <div className="col-6">
            <h5 className="category text-white fw-bold">{category}</h5>
          </div>
          <div className="col-12">
            <h5 className="category text-white fw-bold ps-3">by {author}</h5>
          </div>
          <div className={`${style.title} col-12 d-flex align-items-end`}>
            <h1 className="text-white fw-bold">{title}</h1>
          </div>
        </div>
      </Link>
    </div>
  )
}