import React, { Component } from 'react'
import { validateForm } from '../../utils/validation-form'
import { Link } from 'react-router-dom'
import Card from '../../components/UI/Card/Card'
import api from '../../api/users'
import config from '../../config'

import '../../assets/styles/index.scss'
import './LoginPage.scss'

export class LoginPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      activeLoginTabList: [
        { id: 'USERNAME', text: 'Username login' },
        { id: 'QR_CODE', text: 'QR code login' }
      ],
      activeLoginTab: 'USERNAME',
      form: {
        username: '',
        password: ''
      },
      errors: []
    }
  }

  componentDidMount () {
    const signed = window.localStorage.getItem('session')
    if (signed) {
      this.toHomePage()
    }

    setTimeout(() => {
      window.localStorage.removeItem('session')
    }, 600000)
  }

  handleTabChange = id => {
    this.setState({ activeLoginTab: id })
  }

  handleInputChange = e => {
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value
      }
    })
  }

  toHomePage () {
    this.props.history.push(config.page.home)
  }

  doLogin = async () => {
    const { form } = this.state
    const errors = [...validateForm(form)]
    this.setState({ errors })
    if (!errors.length) {
      const res = await api.userLogin(form)
      
      if (res.status === 200) {
        window.localStorage.setItem('session', JSON.stringify(form))
        this.toHomePage()
      }
    }
  }
  
  render() {
    const { activeLoginTabList, activeLoginTab, errors } = this.state
    const tabList = activeLoginTabList.map(i => (
      <div key={i.id}
        className={activeLoginTab === i.id ? 'active' : null}
        onClick={() => this.handleTabChange(i.id)}
      >
        {i.text}
      </div>
    ))

    const errorList = errors.map(i => (
      <div key={i}>{i}</div>
    ))

    return (
      <div className="LoginPage">
        <Card>
          <div className="title m-10">LINE</div>
          <div className="login-methods fs-14">
            {tabList}
          </div>
          <div className="login-form">
            <input
              name="username"
              placeholder="Username"
              type="text"
              className="p-6"
              onChange={this.handleInputChange}
            />
            <input
              name="password"
              placeholder="Password"
              type="password"
              className="p-6"
              onChange={this.handleInputChange}
            />
          </div>
          <button
            className="login-btn mt-8 p-12"
            onClick={this.doLogin}
          >
            Log in
          </button>
          <div className="mt-8 fs-12">
            Don't have account?
            <Link to={config.page.registration}>Register</Link>
          </div>
          <div className="error fs-12 mt-10">{errorList}</div>
        </Card>
      </div>
    )
  }
}

export default LoginPage
