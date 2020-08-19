import MainLayout from "../components/MainLayout"
import styles from '../styles/auth.module.scss'
import Input from "../components/Input"
import { useState } from "react"
import Button from "../components/Button"
import Link from "next/link"
import { connect } from "react-redux"
import { sendLogin } from "../store/actions/action"
import { useRouter } from "next/router"

function Login(props) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [color, setColor] = useState('')
  
  const router = useRouter()

  const handleEmail = (e) => {
    e.preventDefault()
    setEmail(e.target.value)
  }

  const handlePassword = (e) => {
    e.preventDefault()
    setPassword(e.target.value)
  }

  const login = async () => {
    if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email.toLowerCase())) {
      setMessage('Неверные данные при авторизации')
      setColor('danger')
      return
    }
    props.sendLogin({ email, password })
  }

  if(props.logged) {
    router.push('/')
  }

  return (
    <MainLayout title='Авторизация'>
      <div className={styles.auth}>
        <div className={styles.block}>
          <h1>Авторизуйтесь</h1>
          {
            message || props.message ?
              <div style={{ backgroundColor: color || props.color === 'danger' ? '#F25C5C' : '#27AE60' }} className={styles.alert}>
                {message || props.message}
              </div> : null
          }
          <div className={styles.block_margin}>
            <Input
              name='email'
              type='email'
              onChange={handleEmail}
              value={email}
              placeholder='Email'
              label='Введите ваш Email'
              id='email'
            />
            <Input
              name='password'
              type='password'
              min={6}
              onChange={handlePassword}
              value={password}
              placeholder='Password'
              label='Введите ваш пароль'
              id='password'
              className={styles.block_margin}
            />
            <div className={styles.block_btn}>
              <Button type='dark' onClick={login}>
                Авторизоваться
              </Button>
            </div>
            <p style={{ marginTop: '10px' }}>Нет аккаунта? <Link href='/register'><a className={styles.btn}>Зарегистрироваться</a></Link></p>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

const mapStateToProps = (state) => ({
  message: state.message,
  color: state.color,
  logged: state.loged
})

const mapDispatchToProps = (dispatch) => ({
  sendLogin: data => dispatch(sendLogin(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)