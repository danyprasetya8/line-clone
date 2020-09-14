const isValidEmail = email => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(email)
}

const isEmptyString = str => {
  return str.length === 0
}

const isContainUpperLowerDigit = str => {
  const re = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/
  return re.test(str)
}

export {
  isValidEmail,
  isEmptyString,
  isContainUpperLowerDigit
}