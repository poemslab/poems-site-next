import MainLayout from "../components/MainLayout"
import styles from '../styles/home.module.scss'
import axios from 'axios'
import Alert from "../components/Alert"
import Link from "next/link"
import Card from "../components/Card"
import Category from "../components/Category"

function Index({ poems, categories }) {
  return (
    <MainLayout>
      <div className={styles.grid}>
        <div>
          <Alert />
          <div className={styles.recommend_block}>
            <div className={styles.recommend_block_top}>
              <h3>Рекомендуемые текста</h3>
            </div>
            <div className={styles.recommend_block_items}>
              {poems.map(r => (
                <Card
                  key={r._id}
                  author={r.author}
                  title={r.title}
                  likes={r.likes}
                  to={r._id}
                  thumbnail={r.thumbnail}
                  className={styles.card}
                />
              ))}
            </div>
          </div>
        </div>
        <div className={styles.categories_block}>
          <div className={styles.categories_block_top}>
            <h3>Популярные категории</h3>
            <Link href='/categories' >
              <a>
                Больше
              </a>
            </Link>
          </div>
          <div className={styles.categories_block_items}>
            {
              categories.map(r => (
                <Category
                  key={r._id}
                  name={r.name}
                  color={r.color}
                  description={r.description}
                />
              ))
            }
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

export async function getServerSideProps(context) {
  const poems = await axios.get('https://poems-lab.ru/api/poems/list')
  const categories = await axios.get('https://poems-lab.ru/api/categories/list?limit=5')


  const formatted = poems.data.data.sort((a, b) => b.likes - a.likes)

  return {
    props: {
      poems: formatted,
      categories: categories.data.data
    }
  }
}

export default Index