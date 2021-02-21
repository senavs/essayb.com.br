import { Link } from 'react-router-dom'

import './NavBar.css'
import Avatar from '../../profile/avatar/Avatar'

export default function NavBar() {
  // TODO: get user authentication
  // TODO: get categories from backend

  // vars and stats
  const isAuthenticated = false
  const isPremium = false
  const categories = [
    'World', 'U.S', 'Technology', 'Design', 'Culture', 'Business',
    'Politics', 'Opinion', 'Science', 'Health', 'Style', 'Travel'
  ]

  // render
  return (
    <div className="container mb-5">

      {/* main navbar */}
      <div className="py-3 border-bottom border-lg-secondary">
        <div className="row">

          {/* subscribe button */}
          <div className="col-4 d-flex justify-content-start align-self-end">
            {isPremium || < Link to="/subscribe" className="link-secondary">Subscribe</Link>}

          </div>
          {/* brand button */}
          <div className="col-4 d-flex justify-content-center align-self-end">
            <Link to="/"><img className="brand" src="/static/brand.png" alt="essayb brand" width="25rem" /></Link>
          </div>
          {/* sign up button */}
          <div className="col-4 d-flex justify-content-end align-self-end">
            {
              isAuthenticated
                ? <Avatar />
                : <Link to='/signup' className="btn btn-sm btn-outline-secondary">Sign up</Link>
            }
          </div>

        </div>
      </div>

      {/* scroller navbar */}
      <div className="nav border-bottom border-lg-secondary mb-3 d-flex flex-nowrap justify-content-between">
        {categories.map((element, index) => <Link key={index} to="/" className="p-2 mx-auto link-secondary">{element}</Link>)}
      </div>

    </div >
  );
}
