import MainLayout from '../../components/MainLayout'
import axios from 'axios'
import styles from '../../styles/poema.module.scss'
import { connect } from 'react-redux'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { bindActionCreators } from 'redux'
import { getMe } from '../../store/actions/action'
import Button from '../../components/Button'
import Head from 'next/head'

function Poema({ poema, getMe, logged, user }) {
  const [likes, setLikes] = useState(poema.likes)

  const router = useRouter()

  async function likePoema() {
    const token = localStorage.getItem('token')
    const req = await axios({
      method: 'post',
      url: `https://poems-lab.ru/api/poems/like/${poema._id}`,
      headers: {
        authorization: `Bearer ${token}`
      },
      validateStatus: false
    })
    if (!req.data.success) {
      return
    }

    getInfo() // Update likes count
    getMe(window.localStorage.getItem('token')) // Update user for get new likes array
  }

  async function getInfo() {
    const req = await axios({
      method: 'get',
      url: `https://poems-lab.ru/api/poems/get/${poema._id}`,
      validateStatus: false
    })
    if (req.data.success) {
      setLikes(req.data.data.likes)
    }
  }

  async function deletePoema() {
    const token = localStorage.getItem('token')
    const req = await axios({
      method: 'delete',
      url: `https://poems-lab.ru/api/poems/delete/${poema._id}`,
      headers: {
        authorization: `Bearer ${token}`
      },
      validateStatus: false
    })
    if (!req.data.success) {
      return
    }
    router.push('/')
  }

  return (
    <MainLayout meta title={`${poema.author} - ${poema.title}`}>
      <Head>
        <meta name="keywords" content={`${poema.author},${poema.title}`} />
        <meta property="og:title" content={`${poema.author} - ${poema.title} • Poems lab - лаборатория стихов`} />
        <meta key="ogType" property="og:type" content="article" />
        <meta property="og:url" content={`https://poems-lab.ru/poema/${poema._id}`} />
        <meta property="og:image" itemprop="image" content={poema.thumbnail || 'https://i.imgur.com/aSrKN7I.png'} />
        <meta property="og:site_name" content='Poems lab - лаборатория стихов' />
        <meta property="og:description" content="Лаборатория стихов — это сервис для просмотра и создания стихов" />
        <meta
          name="description"
          content={poema.text}
        />
      </Head>
      <div className={styles.grid}>
        <div className={styles.lyrics}>
          {
            poema.text.split(/(\n)|(↵)/g).map((r, i) => {
              if (r === '\n' || r === '↵' || r === undefined) return null
              return <p key={i}>{r}</p>
            })
          }
        </div>
        <div className={styles.sticky}>
          <div className={styles.info}>
            <img alt='alt' src={poema.thumbnail || 'https://i.imgur.com/u7otRoX.png'} />
            <div className={styles.info_body}>
              <div>
                <p className={styles.title}>{poema.author}</p>
                <p className={styles.subtitle}>{poema.title}</p>
                <p className={styles.subtitle}>Лайков: <span>{likes}</span></p>
              </div>
              {
                logged ?
                  <div className={styles.btn_block}>
                    {
                      !(user && user.liked.includes(poema._id)) ?
                        <Button onClick={likePoema} type='orange' className={styles.btn}>Лайкнуть</Button>
                        : <Button onClick={likePoema} type='orange' className={styles.btn}>Убрать лайк</Button>
                    }
                    {
                      user && user.id === poema.creator || user && user.mod ?
                        <Button onClick={deletePoema} type='dark'>Удалить</Button> : null
                    }
                  </div> : null
              }
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

export async function getServerSideProps(ctx) {
  const req = await axios.get(`https://poems-lab.ru/api/poems/get/${ctx.query.id}`)
  if (!req.data.success) {

    return
  }
  return {
    props: {
      poema: req.data.data
    }
  }
}

const mapStateToProps = state => ({
  logged: state.loged,
  user: state.user
})

const mapDispatchToProps = dispatch => ({
  getMe: bindActionCreators(getMe, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Poema)