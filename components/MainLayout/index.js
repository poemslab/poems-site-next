import Head from 'next/head'
import Navbar from '../Navbar'
import { connect } from 'react-redux'
import { wrapper } from '../../store'
import { getMe } from '../../store/actions/action'
import { bindActionCreators } from 'redux'
import Sidebar from '../Sidebar'
import styles from './layout.module.scss'
import { useEffect } from 'react'

function MainLayout({ children, title = 'Главная', meta, ...props }) {
  useEffect(() => {
    function getMe() {
      props.getMe(window.localStorage.getItem('token'))
    }
    getMe()
  }, [])
  return (
    <>
      <Head>
        <title> {title} • Poems lab - лаборатория стихов </title>
        {!meta ? <>
        <meta property="og:title" content="Лаборатория стихов" />
        <meta key="ogType" property="og:type" content="website" />
        <meta property="og:url" content="https://poems-lab.ru" />
        <meta property="og:site_name" content="Лаборатория стихов" />
        <meta property="og:description" content="Лаборатория стихов — это сервис для просмотра и создания стихов" />
        <meta
          name="description"
          content="Poems Lab - Лаборатория стихов — это сервис для просмотра и создания стихов."
        />
        </> : null}
      </Head>
      <Sidebar />
      <main className={styles.app}>
        {/* <Navbar/> */}
        {children}
      </main>
    </>
  )
}

const mapStateToProps = state => ({
  user: state.user
})

const mapDispatchToProps = dispatch => ({
  getMe: bindActionCreators(getMe, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(MainLayout)