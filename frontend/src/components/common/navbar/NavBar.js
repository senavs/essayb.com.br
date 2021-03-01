import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../../context/auth'
import Avatar from '../../profile/avatar/Avatar'
import style from './NavBar.module.css'


export default function NavBar() {
  // TODO: get categories from backend

  // context
  const { auth, logout } = useContext(AuthContext)

  // vars
  const isAuthenticated = !!auth.token
  const isPremium = auth.user && !auth.user.is_premium
  const categories = [
    'World', 'U.S', 'Technology', 'Design', 'Culture', 'Business',
    'Politics', 'Opinion', 'Science', 'Health', 'Style', 'Travel'
  ]

  // render
  return (
    <div className={`${style.navbar} container`}>

      {/* main navbar */}
      <div className="border-bottom border-lg-secondary py-2">
        <div className="row">

          {/* subscribe button */}
          <div className="col-4 d-flex justify-content-start align-self-end">
            {(!isAuthenticated || isPremium) && < Link to="/subscribe" className="link-secondary">Subscribe</Link>}
          </div>
          {/* brand button */}
          <div className="col-4 d-flex justify-content-center align-self-end">
            <Link to="/"><img className="brand" src="/static/brand.png" alt="essayb brand" width="25rem" /></Link>
          </div>
          {/* sign up button */}
          <div className="col-4 d-flex justify-content-end align-self-end">
            {isAuthenticated
              ? (<>
                <Avatar profileImage={auth.user.profile_image} />
                <Link to='/' className="btn btn-sm btn-outline-secondary ms-2" onClick={logout}><i className="bi bi-box-arrow-right"></i></Link>
              </>)
              : (<>
                <Link to='/login' className="btn btn-sm btn-outline-secondary ms-2">Login</Link>
                <Link to='/signup' className="btn btn-sm btn-outline-secondary ms-2 text-nowrap">Sign up</Link>
              </>)}
          </div>

        </div>
      </div>

      {/* scroller navbar */}
      <div className={`${style.horizontalNavbar} nav border-bottom border-lg-secondary mb-3 d-flex flex-nowrap justify-content-between`}>
        {categories.map((element, index) => <Link key={index} to="/" className="p-2 mx-auto link-secondary">{element}</Link>)}
      </div>

    </div >
  );
}
