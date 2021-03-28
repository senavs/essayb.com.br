import { ReactNode } from 'react'

import styles from '../../styles/components/common/Body.module.css'


interface BodyProps {
  children: ReactNode
}

export default function Body({ children }: BodyProps) {
  return (
    <div className={styles.body}>
      {children}
    </div>
  )
}