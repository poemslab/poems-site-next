import axios from 'axios'
import MainLayout from '../../components/MainLayout'
import styles from '../../styles/category.module.scss'
import Card from '../../components/Card'

function Category({ category, name }) {
  return (
    <MainLayout>
      <div className={styles.grid}>
        <div className={styles.page}>
          {category.map(r => (
            <Card
              key={r._id}
              to={r._id}
              title={r.title}
              author={r.author}
              thumbnail={r.thumbnail}
              className={styles.margin}
              likes={r.likes}
            />
          ))}
        </div>
        <div className={styles.grid_stats}>
          <div className={styles.stats}>
            <h3> {name} </h3>
            <hr />
            <div>
              Кол-во стихов: <strong> {category.length} </strong>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

export async function getServerSideProps(ctx) {
  const req = await axios.get(`https://poems-lab.ru/api/poems/list?category=${encodeURIComponent(ctx.query.name)}`)
  return {
    props: {
      category: req.data.data,
      name: ctx.query.name
    }
  }
}

export default Category