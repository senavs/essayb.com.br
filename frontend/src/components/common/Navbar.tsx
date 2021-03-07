import Link from 'next/link'

import { urls } from 'config/frontend'
import styles from 'src/styles/components/common/Navbar.module.css'


export default function Navbar() {
  const categories = [
    'World', 'U.S', 'Technology', 'Design', 'Culture', 'Business',
    'Politics', 'Opinion', 'Science', 'Health', 'Styles', 'Travel'
  ]

  return (
    <div className={`${styles.navbar} container`}>

      {/* top navbar */}
      <div className='border-bottom border-lg-secondary py-2'>
        <div className='row'>
          <div className='col-4 d-flex justify-content-start align-self-end'>
            <a className='link-secondary' href={urls.common.subscribe} >Subscribe</a>
          </div>
          <div className='col-4 d-flex justify-content-center align-self-end'>
            <a href={urls.common.index}>
              <img className='brand' src='/static/brand.png' alt='essayb brand' width='25rem' />
            </a>
          </div>
          <div className='col-4 d-flex justify-content-end align-self-end'>
            <a className='btn btn-sm btn-outline-secondary ms-2' href={urls.auth.login} >Login</a>
            <a className='btn btn-sm btn-outline-secondary ms-2 text-nowrap' href={urls.auth.signup} >Sign up</a>
          </div>
        </div>
      </div>

      {/* scroller navbar */}
      <div className={`${styles.horizontalNavbar} nav border-bottom border-lg-secondary mb-3 d-flex flex-nowrap justify-content-between`}>
        {categories.map((element, index) => {
          return (
            <Link key={index} href={`/categories/${element}`} >
              <a className='p-2 mx-auto link-secondary'>
                {element}
              </a>
            </Link>)
        })}
      </div>

    </div >
  )
}