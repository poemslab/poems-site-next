import styles from './button.module.scss'

export default function Button({ onClick, children, type, className }) {

  const style = [className]

  switch (type) {
    case 'dark':
      style.push(styles.btn_dark)
      break;
    case 'orange':
      style.push(styles.btn_orange)
      break;
    default:
      style.push(styles.btn)
      break;
  }

  return (
    <button onClick={onClick} className={style.join(' ')} >
      { children }
    </button>
  )
}