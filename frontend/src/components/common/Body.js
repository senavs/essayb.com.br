import styles from './../../styles/components/common/Body.module.css'


export default function Body({ children }) {
  // render
  return (
    <div className={styles.body}>
      {children}
    </div>
  )
}