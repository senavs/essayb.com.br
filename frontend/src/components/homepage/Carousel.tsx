import { urls } from 'config/frontend';
import styles from '../../styles/components/homepage/CardPost.module.css'

export default function Carousel() {

  return (
    <div className={`container`}>

      <div className='row'>

        <div className={styles.carousel}>
          <div className='col-12 d-flex justify-content-start align-self-end'>
            <div id="carouselPost" className="carousel carousel-dark slide" data-bs-ride="carousel">

              <div className="carousel-indicators">
                <button type="button" data-bs-target="#carouselPost" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                <button type="button" data-bs-target="#carouselPost" data-bs-slide-to="1" aria-label="Slide 2"></button>
                <button type="button" data-bs-target="#carouselPost" data-bs-slide-to="2" aria-label="Slide 3"></button>
              </div>

              <div className="carousel-inner">

                {/* First label */}
                <div className="carousel-item active" data-bs-interval="5000">
                  <img src="./static/about.png" className="img-fluid" width="100%" alt="Post image"></img>
                  <div className="carousel-caption d-none d-md-block"></div>
                </div>

                {/* Second label */}
                <div className="carousel-item" data-bs-interval="8000">
                  <a href={urls.payment.subscribe} target="_blank"><img src="./static/subscribe.gif" className="d-block w-100" width="100" alt="Post image"></img></a>
                  <div className="carousel-caption d-none d-md-block"></div>
                </div>

                {/* Third label */}
                <div className="carousel-item" data-bs-interval="8000">
                  <img src="./static/developers.png" className="d-block w-100" width="100" alt="Post image"></img>
                  <div className="carousel-caption d-none d-md-block"></div>
                </div>
              </div>

              {/* Buttons Prev/Next */}
              <button className="carousel-control-prev" type="button" data-bs-target="#carouselPost" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button className="carousel-control-next" type="button" data-bs-target="#carouselPost" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
              </button>

            </div>
          </div>
        </div>

      </div>

    </div>
  );
}