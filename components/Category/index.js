import Link from "next/link"
import styles from './category.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'

export default function Category({ color, name, description, to, className }) {
  return (
    <Link href='/category/[name]' as={`/category/${name}`} >
      <a className={`${styles.category} ${className || ''}`}>
        <div style={{backgroundColor: color || '#73B1F4'}} className={styles.category_logo}>

        </div>
        <div className={styles.category_body}>
          <div>
            <p className={styles.category_title}> { name } </p>
            <p className={styles.category_subtitle}> { description } </p>
          </div>
          <div style={{backgroundColor: color || '#73B1F4'}} className={styles.category_circle}>
            <FontAwesomeIcon icon={faChevronRight} size='2x' color='#fff' />
          </div>
        </div>
      </a>
    </Link>
  )
}