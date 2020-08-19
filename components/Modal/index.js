import styles from './modal.module.scss'

export default function Modal() {
  return (
    <div className={styles.backdrop}>
      <div></div>
    </div>
  )
}