import { urls } from 'config/frontend'

import styles from '../../styles/components/common/Footer.module.css'


export default function Footer() {
  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      <div className={`${styles.footer} py-3 text-center border-top text-secondary`}>
        <div>
          <span>Essay Blog develop by </span>
          <a href={urls.github.Jmarcelo98}>Jmarcelo98</a><span>/</span>
          <a href={urls.github.Mat123Reis}>Mat123Reis</a><span>/</span>
          <a href={urls.github.senavs}>senavs</a><span>/</span>
          <a href={urls.github.ygoliveira}>ygoliveira</a><span>.</span>
        </div>
        <div>
          <span className="text-primary" role="button" onClick={scrollToTop}>Back to top</span>
        </div>
      </div>
    </>
  )
}