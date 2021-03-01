import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../../context/auth'
import AuthService from '../../../services/Auth'
import Avatar from '../../profile/avatar/Avatar'
import style from  './NavBar.module.css'


export default function NavBar() {
  // context
  const { auth, deleteAuth } = useContext(AuthContext)

  // vars and stats
  const categories = [
    'World', 'U.S', 'Technology', 'Design', 'Culture', 'Business',
    'Politics', 'Opinion', 'Science', 'Health', 'Style', 'Travel'
  ]

  // functions
  const handlerLogout = (event) => {
    event.preventDefault()
    AuthService.logout(auth.token)
      .then(deleteAuth)
      .catch(console.log)
  }

  // render
  return (
    <div className={`${style.navbar} container`}>

      {/* main navbar */}
      <div className="border-bottom border-lg-secondary py-2">
        <div className="row">

          {/* subscribe button */}
          <div className="col-4 d-flex justify-content-start align-self-end">
            {
              (!auth.user || (auth.user && !auth.user.is_premium))
                ? < Link to="/subscribe" className="link-secondary">Subscribe</Link>
                : null
            }
          </div>
          {/* brand button */}
          <div className="col-4 d-flex justify-content-center align-self-end">
            <Link to="/"><img className="brand" src="/static/brand.png" alt="essayb brand" width="25rem" /></Link>
          </div>
          {/* sign up button */}
          <div className="col-4 d-flex justify-content-end align-self-end">
            {
              (Object.keys(auth).length !== 0)
                ? (
                  <>
                    <Avatar />
                    <Link to='/logout' className="btn btn-sm btn-outline-secondary ms-2" onClick={handlerLogout}><i className="bi bi-box-arrow-right"></i></Link>
                  </>
                )
                : (
                  <>
                    <Link to='/login' className="btn btn-sm btn-outline-secondary ms-2">Login</Link>
                    <Link to='/signup' className="btn btn-sm btn-outline-secondary ms-2 text-nowrap">Sign up</Link>
                  </>
                )
            }
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
