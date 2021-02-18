export default function NotFound() {

  // render
  return (
    <div className="container">
      <div className="row">
        <div className="col-6">
          <img className="w-75" src="/static/cartoon-detetive.jpg" alt="not found detetive cartoon"/>
        </div>
        <div className="col-6 d-flex justify-content-center align-self-center">
          <h1 className="text-secondary">Opps... Page not found!</h1>
        </div>
      </div>
    </div>
  )
}
