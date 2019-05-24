import api from './index'
import examples from './examples'
import regeneratorRuntime from '../libs/runtime'

/**
 * certify模块：getCerts
 */
const testGetCerts = async () => {
  console.log('test getCerts')
  await api.certify.getCerts().then(res => {
    console.log(res)
    console.log('test pass')
  }, err => {
    console.log(err)
    console.log('test failed')
  })
}

/**
 * certify模块：postCerts
 */
const testPostCerts = async () => {
  console.log('test postCerts')
  let user = {}
  await api.certify.postCerts(user).then(res => {
    console.log(res)
    console.log('test pass')
  }, err => {
    console.log(err)
    console.log('test failed')
  })
}

/**
 * 测试certify模块中的api
 */
const testApiCertify = async () => {
  console.log('test apiCertify')
  await testGetCerts()
  await testPostCerts()
}

/**
 * user模块：getUser
 */
const testGetUser = async () => {
  console.log('test getUser')
  await api.user.getUser().then(res => {
    console.log(res)
    console.log('test pass')
  }, err => {
    console.log(err)
    console.log('test failed')
  })
}

/**
 * task模块：getTasks
 */
const testGetTasks = async () => {
  console.log('test getTasks(all)')
  await api.task.getTasks().then(res => {
    console.log(res)
    console.log('test pass')
  }, err => {
    console.log(err)
    console.log('test failed')
  })

  console.log('test getTasks(non_released)')
  await api.task.getTasks(api.config.TASK_STATE_NON_RELEASED).then(res => {
    console.log(res)
    console.log('test pass')
  }, err => {
    console.log(err)
    console.log('test failed')
  })

  console.log('test getTasks(released)')
  await api.task.getTasks(api.config.TASK_STATE_RELEASED).then(res => {
    console.log(res)
    console.log('test pass')
  }, err => {
    console.log(err)
    console.log('test failed')
  })

  console.log('test getTasks(closed)')
  await api.task.getTasks(api.config.TASK_STATE_CLOSED).then(res => {
    console.log(res)
    console.log('test pass')
  }, err => {
    console.log(err)
    console.log('test failed')
  })
}

const wtf = async () => {
  await api.task.getTasks().catch(err => {console.log(err)})
  console.log('aysnc await success')
}

/**
 * 测试task模块中的api
 */
const testApiTask = async () => {
  await testGetTasks()
}

/**
 * cpt模块：postTask
 */
const testPostTask = async () => {
  let task = examples.tasks[0]
  let qtnr = examples.questionnaires[0]
  console.log('test post task')
  console.log(task)
  console.log(qtnr)
  await api.cpt.postTask(task, qtnr).then(res => {
    console.log(res)
    console.log('test pass')
  }, err => {
    console.log(err)
    console.log('test failed')
  })
}

/**
 * cpt模块：getAllTasks
 */
const testGetAllTasks = async () => {
  console.log('test get all tasks')
  await api.cpt.getAllTasks().then(res => {
    console.log(res)
    console.log('test pass')
  }, err => {
    console.log(err)
    console.log('test failed')
  })
}

/**
 * 测试cpt模块中的api
 */
const testApiCpt = async () => {
  await testPostTask()
  await testGetAllTasks()
}


/**
 * 测试所有api模块
 */
const testAll = async () => {
  await testApiTask()
}

export default {
  /**
   * certify模块相关测试
   */
  testGetCerts: testGetCerts,
  testPostCerts: testPostCerts,
  testApiCertify: testApiCertify,
  /**
   * user模块相关测试
   */
  testGetUser: testGetUser,
  /**
   * task模块相关测试
   */
  testApiTask: testApiTask,
  testGetTasks: testGetTasks,
  /**
   * cpt模块相关测试
   */
  testApiCpt: testApiCpt,
  testPostTask: testPostTask,
  testGetAllTasks: testGetAllTasks,
  wtf: wtf,
}