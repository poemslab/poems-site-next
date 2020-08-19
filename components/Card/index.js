import Link from "next/link"
import styles from './card.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight, faHeart } from '@fortawesome/free-solid-svg-icons'

export default function Card({ to, title, likes, author, thumbnail, className }) {
  return (
    <Link href='/poema/[id]' as={`/poema/${to}`}>
      <a className={`${styles.card} ${className || ''}`}>
        <img alt='alt' className={styles.card_image} src={thumbnail || 'https://i.imgur.com/u7otRoX.png'} />
        <div className={styles.card_body}>
          <div className={styles.card_left}>
            <div>
              <p className={styles.title}> {author} </p>
              <p className={styles.subtitle}> {title} </p>
            </div>
            <div className={styles.card_left_bottom}>
              <FontAwesomeIcon icon={faHeart} size='2x' color='#EE4141' />
              <span className={styles.card_left_bottom_text}> {likes} </span>
            </div>
          </div>
          <div className={styles.card_right}>
            <div className={styles.circle}>
              <FontAwesomeIcon icon={faChevronRight} size='2x' color='#fff' />
            </div>
          </div>
        </div>
      </a>
    </Link>
  )
}