import styles from '../../styles/home/Carousel.module.css'

export default function Carousel(){

    return(
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
                {/* First label */}
        <div className="carousel-inner">
            <div className="carousel-item active" data-bs-interval="10000">
            <img src="https://media.treasy.com.br/media/2016/07/Cen%C3%A1rios-Econ%C3%B4micos-e-Financeiros.jpg" className="img-fluid" alt="Post image"></img>
            <div className="carousel-caption d-none d-md-block">
                <h2>SUBSCRIBE NOW</h2>
                <p className="fst-italic">You can have many benefits!</p>
            </div>
            </div>
                {/* Second label */}
            <div className="carousel-item" data-bs-interval="8000">
            <img src="https://media.treasy.com.br/media/2016/07/Cen%C3%A1rios-Econ%C3%B4micos-e-Financeiros.jpg" className="d-block w-100" alt="Post image"></img>
            <div className="carousel-caption d-none d-md-block">
                <h2 >What's your favorite topic?</h2>
                <p className="fst-italic">Enjoy countless articles by categories</p>
            </div>
            </div>
                    {/* Third label */}
            <div className="carousel-item" data-bs-interval="8000">
            <img src="https://media.treasy.com.br/media/2016/07/Cen%C3%A1rios-Econ%C3%B4micos-e-Financeiros.jpg" className="d-block w-100" alt="Post image"></img>
            <div className="carousel-caption d-none d-md-block">
                <h2>Article title</h2>
                <p className="fst-italic">Article subtitle</p>
            </div>
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