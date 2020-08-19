import MainLayout from '../components/MainLayout'
import styles from '../styles/createpoema.module.scss'
import { Component } from 'react'
import Input from '../components/Input'
import Button from '../components/Button'
import axios from 'axios'
import { connect } from 'react-redux'
import { withRouter } from 'next/router'

class CreatePoema extends Component {
  state = {
    title: '',
    lyrics: '',
    author: '',
    thumbnail: '',
    category: '',
    categories: [],
    message: null,
    color: null
  }

  componentDidMount() {
    if (!this.props.logged) {
      this.props.router.push('/')
    }
    this.getCategories()
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  async getCategories() {
    const req = await axios.get('https://poems-lab.ru/api/categories/list')
    if (req.data.success) {
      this.setState({
        categories: req.data.data
      })
    }
  }

  createPoema = async () => {
    const regexp = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi
    const token = window.localStorage.getItem('token')
    const req = await axios({
      method: 'put',
      url: 'https://poems-lab.ru/api/poems/create',
      data: {
        title: this.state.title,
        text: this.state.lyrics,
        author: this.state.author,
        category: this.state.category,
        thumbnail: regexp.test(this.state.thumbnail) ? this.state.thumbnail : null
      },
      headers: {
        authorization: `Bearer ${token}`
      },
      validateStatus: false
    })
    if (!req.data.success) {
      return this.setState({ message: req.data.message, color: 'danger' })
    }
    this.setState({ title: '', lyrics: '', category: null, thumbnail: '', author: '', message: req.data.message, color: 'success' })
  }

  render() {
    if (!this.props.logged) {
      return (
        <MainLayout title='Добавить стих' />
      )
    }
    return (
      <MainLayout title='Добавить стих'>
        <div className={styles.block}>
          <div className={styles.box}>
            <h1>Добавить стих</h1>
            {
              this.state.message ?
                <div style={{ backgroundColor: this.state.color === 'danger' ? '#F25C5C' : '#27AE60' }} className={styles.alert}>
                  {this.state.message}
                </div> : null
            }
            <div>
              <Input
                name='author'
                placeholder='Введите автора'
                label='Автор стиха'
                type='text'
                onChange={this.handleChange}
                value={this.state.author}
                className={styles.input_margin}
              />
              <Input
                name='title'
                placeholder='Введите заголовок'
                label='Заголовок стиха'
                type='text'
                onChange={this.handleChange}
                value={this.state.title}
                className={styles.input_margin}
              />
              <Input
                name='thumbnail'
                placeholder='Укажите ссылку на картинку'
                label='Обложка стиха'
                type='text'
                onChange={this.handleChange}
                value={this.state.thumbnail}
                className={styles.input_margin}
              />
              <Input
                name='lyrics'
                placeholder='Введите текст стиха'
                label='Текст стиха'
                type='text'
                onChange={this.handleChange}
                value={this.state.lyrics}
                className={styles.input_margin}
                textarea
              />
              <Input
                select
                name='category'
                placeholder='Выберите категорию'
                label='Категория стиха'
                onChange={this.handleChange}
                value={this.state.category}
                className={styles.input_margin}
                data={this.state.categories}
              />
            </div>
            <Button onClick={this.createPoema} type='dark'>Добавить</Button>
          </div>
        </div>
      </MainLayout>
    )
  }
}

const mapStateToProps = state => ({
  logged: state.loged
})

export default connect(mapStateToProps, null)(withRouter(CreatePoema))