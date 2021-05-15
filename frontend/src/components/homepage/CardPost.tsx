

export default function CardPost(){
    return (

        <div className="card mb-3 max-width: 540px">
            <div className="row g-0">
                <div className="col-md-4">
                    <img src="..." alt="Thumbnail"></img>
                </div>
                <div className="col-md-8">
                    <div className="card-body">
                        <h5 className="card-title">Post title</h5>
                        <p className="card-text"><small className="text-muted">Publication date (Ex:10/02/2021)</small></p>
                        <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                        <a className="stretched-link">"Continue Reading"</a>
                    </div>
                </div>
            </div>
        </div>
        
    )
}
