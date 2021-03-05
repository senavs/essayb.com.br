import styles from '../styles/pages/NotFound.module.css'


export default function NotFound() {
  // render
  return (
    <div className={`${styles.container} container`}>
      <div className="d-flex justify-content-center align-self-center">
        <span className="fw-bold p-3">404</span>
        <span className="border"></span>
        <span className="p-3">This page could not be found.</span>
      </div>
    </div>
  )
}
