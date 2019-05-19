import api from './index'

const testGetUser = () => {
  console.log('test getUser')
  api.user.getUser().then(res => {
    console.log(res)
    console.log('test pass')
  }, err => {
    console.log(err)
    console.log('test failed')
  })
}

const testGetTasks = () => {
  console.log('test getTasks')
  api.task.getTasks().then(res => {
    console.log(res)
    console.log('test pass')
  }, err => {
    console.log(err)
    console.log('test failed')
  })
}

export default {
  testGetUser: testGetUser,
  testGetTasks: testGetTasks,
}