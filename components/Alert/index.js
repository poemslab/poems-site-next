import styles from './alert.module.scss'

export default function Alert() {
  return (
    <div className={styles.alert}>
      <div className={styles.alert_title}>
        <h1>У нас есть приложение!</h1>
      </div>
      <div className={styles.alert_subtitle}>
        <p>установи наше приложение для более удобного взаимодействия с контентом по <a target="_blank" href="https://play.google.com/store/apps/details?id=com.poemslab&hl=ru">ссылке</a></p>
      </div>
    </div>
  )
}