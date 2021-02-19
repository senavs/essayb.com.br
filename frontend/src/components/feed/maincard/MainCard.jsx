import { Link } from 'react-router-dom'

import './MainCard.css'


export default function MainCard({ author, category, title, backgroundImage, url }) {

  //render
  return (
    <div className="main-card border rounded-3 shadow-sm overflow-hidden">
      <Link className="clickable-card" to={url}>
        <div className="background">
          <img src={backgroundImage} alt="thumbnail" />
        </div>
        <div className="row p-3">
          <div className="col-6">
            <h5 className="category text-white fw-bold">{category}</h5>
          </div>
          <div className="col-12">
            <h5 className="category text-white fw-bold ps-3">by {author}</h5>
          </div>
          <div className="title col-12 d-flex align-items-end">
            <h3 className="text-white fw-bold">{title}</h3>
          </div>
        </div>
      </Link>
    </div>
  )
}