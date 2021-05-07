import { useContext } from 'react'

import styles from '../../styles/components/common/Navbar.module.css'
import Avatar from '../../components/profile/Avatar'
import CreateNewPostModal from '../post/CreateNewPostModal'
import { AuthContext } from '../../libs/contexts/auth'
import { urls } from 'config/frontend'
import { CategoryContext } from 'src/libs/contexts/category'


export default function Navbar() {
  const { authenticationData, logout } = useContext(AuthContext)
  const { categoryData } = useContext(CategoryContext)

  return (
    <div className={`${styles.navbar} container`}>

      {/* top navbar */}
      <div className='border-bottom border-lg-secondary py-2'>
        <div className='row'>
          <div className='col-4 d-flex justify-content-start align-self-end'>
            {!authenticationData.user.is_premium && (
              <a className='btn btn-sm btn-outline-secondary ms-2' href={urls.common.subscribe} >
                <i className="bi bi-gem"></i>
              </a>
            )}
            {authenticationData.isAuthenticated && (
              <a className="btn btn-sm btn-outline-secondary ms-2" data-bs-toggle="modal" data-bs-target="#createPostModal" >
                <i className="bi bi-journal-text"></i>
              </a>
            )}
            <a className='btn btn-sm btn-outline-secondary ms-2' href={urls.common.search} >
              <i className="bi bi-search"></i>
            </a>
          </div>
          <div className='col-4 d-flex justify-content-center align-self-end'>
            <a href={urls.common.index}>
              <img className='brand' src='/static/brand.png' alt='essayb brand' width='25rem' />
            </a>
          </div>
          <div className='col-4 d-flex justify-content-end align-self-end'>
            {authenticationData.isAuthenticated
              ? <>
                <Avatar username={authenticationData.user.username} />
                <a className='btn btn-sm btn-outline-secondary ms-2' onClick={() => logout()}><i className='bi bi-box-arrow-right'></i></a>
              </>
              : <>
                <a className='btn btn-sm btn-outline-secondary ms-2' href={urls.auth.login} >Login</a>
                <a className='btn btn-sm btn-outline-secondary ms-2 text-nowrap' href={urls.auth.signup} >Sign up</a>
              </>
            }
          </div>
        </div>
      </div>

      {/* scroller navbar */}
      <div className={`${styles.horizontalNavbar} nav border-bottom border-lg-secondary mb-3 d-flex flex-nowrap justify-content-between`}>
        {categoryData.map(element => {
          return (
            <a key={element.id_category} className='p-2 mx-auto link-secondary' href={urls.post.filter.replace('{category}', element.category)}>
              {element.category}
            </a>
          )
        })}
      </div>

      <CreateNewPostModal />
    </div >
  )
}