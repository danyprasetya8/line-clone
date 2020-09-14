import { isValidEmail, isEmptyString } from './validation'

const keyExist = k => k !== undefined
const isEmpty = v => keyExist(v) && isEmptyString(v)

const validateForm = forms => {
  const errors = []

  if (isEmpty(forms.username)) {
    errors.push('Email / Id must be filled')
  }

  if (isEmpty(forms.id)) {
    errors.push('Id must be filled')
  }

  if (isEmpty(forms.name)) {
    errors.push('Name must be filled')
  }

  if (isEmpty(forms.email)) {
    errors.push('Email must be filled')
  } else {
    if (keyExist(forms.email) && !isValidEmail(forms.email)) {
      errors.push('Not a valid email')
    }
  }

  if (isEmpty(forms.password)) {
    errors.push('Password must be filled')
  }

  if (isEmpty(forms.confirmPassword)) {
    errors.push('Confirm password must be filled')
  }

  if (keyExist(forms.confirmPassword) && forms.password !== forms.confirmPassword) {
    errors.push('Confirm password is not the same')
  }

  if (isEmpty(forms.address)) {
    errors.push('Address must be filled')
  }

  return errors
}

export {
  validateForm
}