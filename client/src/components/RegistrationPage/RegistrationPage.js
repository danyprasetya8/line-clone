import React, { Component } from 'react'
import { isContainUpperLowerDigit } from '../../utils/validation'
import { validateForm } from '../../utils/validation-form'
import Card from '../../components/UI/Card/Card'
import api from '../../api/users'
import config from '../../config'

import '../../assets/styles/index.scss'
import './RegistrationPage.scss'

const inputEl = [
  {
    name: 'id',
    type: 'text',
    placeholder: 'Id'
  },
  {
    name: 'name',
    type: 'text',
    placeholder: 'Name'
  },
  {
    name: 'email',
    type: 'text',
    placeholder: 'Email'
  },
  {
    name: 'password',
    type: 'password',
    placeholder: 'Password'
  },
  {
    name: 'confirmPassword',
    type: 'password',
    placeholder: 'Confirm Password'
  },
  {
    name: 'address',
    type: 'text',
    placeholder: 'Address'
  }
]

export class RegisterPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      inputEl,
      form: {
        id: '',
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        address: ''
      },
      errors: []
    }
  }

  handleOnSubmit = async e => {
    e.preventDefault()
    const { form } = this.state
    const errors= [...validateForm(form)]
    if (!isContainUpperLowerDigit(form.password)) {
      errors.push('Password must contain at least 1 upper case, 1 lower case, and 1 digit')
    }
    this.setState({ errors })
    
    if (!errors.length) {
      const res = await api.userRegistration(form)
      if (res.status === 200) {
        this.toLoginPage()
      }
    }
  }

  toLoginPage () {
    this.props.history.push(config.page.login)
  }

  handleChange = e => {
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value
      }
    })
  }
  
  render() {
    const { inputEl, errors } = this.state
    const inputs = inputEl.map(i => (
      <input key={i.name}
        name={i.name}
        type={i.type}
        placeholder={i.placeholder}
        onChange={this.handleChange}
        className="p-6 mb-10"
      />
    ))

    const errorList = errors.map(i => (
      <div key={i}>{i}</div>
    ))

    return (
      <div className="RegistrationPage">
        <Card width="600">
          <div className="title fs-24 mb-10">Registration</div>
          <form onSubmit={this.handleOnSubmit}>
            {inputs}
            <input type="submit" className="p-12"/>
          </form>
          <div className="error fs-12 mt-10">{errorList}</div>
        </Card>
      </div>
    )
  }
}

export default RegisterPage
