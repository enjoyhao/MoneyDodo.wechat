const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [hour, minute].map(formatNumber).join(':')
}

const formatDate = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('-')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const rules = {
  notEmpty: value => {
    let status = true
    if (!value || value == '') {
      status = false
    }
    let errMsg = status ? '' : '输入不能为空'
    return { 'status': status, 'errMsg': errMsg }
  },
  isNumber: value => {
    let regex = /^[0-9]+$/
    let status = regex.test(value)
    let errMsg = status ? '' : '请输入纯数字'
    return { 'status': status, 'errMsg': errMsg }
  },
  noInvalidChar: value => {
    let regex = /[~!@#$%^&*()/\|,.<>?"'();:_+-=\[\]{}]/
    let status = !regex.test(value)
    let errMsg = status ? '' : '请勿输入特殊符号'
    return { 'status': status, 'errMsg': errMsg }
  },
  isValidEmail: value => {
    let regex = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
    let status = regex.test(value)
    let errMsg = status ? '' : '请输入有效的邮箱'
    return { 'status': status, 'errMsg': errMsg }
  }
}

module.exports = {
  formatTime: formatTime,
<<<<<<< HEAD
  formatDate: formatDate
=======
  rules: rules
>>>>>>> 3ad73cf2412d2ab89ee8ec2c479c31a0109c7537
}
