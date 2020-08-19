import axios from 'axios'
import styles from '../styles/categories.module.scss'
import MainLayout from '../components/MainLayout'
import Category from '../components/Category'

function Categories({ categories }) {
  return (
    <MainLayout title='Все категории'>
      <div className={styles.grid}>
        <div className={styles.left_grid}>
          {categories.map(r => (
            <Category
              name={r.name}
              color={r.color}
              description={r.description}
              key={r._id}
            />
          ))}
        </div>
        <div className={styles.right_grid}>
          <div className={styles.stats}>
            <h3>Статистика категорий</h3>
            <hr/>
            <div>
              Кол-во категорий: <strong> { categories.length } </strong>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

export async function getServerSideProps() {
  const req = await axios.get('https://poems-lab.ru/api/categories/list')
  return {
    props: {
      categories: req.data.data
    }
  }
}

export default Categories