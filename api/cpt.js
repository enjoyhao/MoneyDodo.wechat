import store from '../store/store'
import config from './config'
const apiBase = store.data.server + store.data.apiBase + '/tasks'

export default {
  /**
   *  param对即get请求的参数
  */
  getAllTasks: () => {
    return new Promise((resolve, reject) => {
      wx.request({
        method: 'GET',
        url: `${apiBase}`,
        header: {
          'Authorization': `Bearer ${store.data.token}`
        },
        success: res => {
          if (res.statusCode != 200 || res.data.status == false) {
            reject(res)
          } else {
            resolve(res)
          }
        },
        fail: err => {
          reject(err)
        }
      })
    })
  },
  getTask: (taskId) => {
    return new Promise((resolve, reject) => {
      wx.request({
        method: 'GET',
        url: `${apiBase}/${taskId}`,
        header: {
          'Authorization': `Bearer ${store.data.token}`
        },
        success: res => {
          if (res.statusCode != 200 || res.data.status == false) {
            reject(res)
          } else {
            resolve(res)
          }
        },
        fail: err => {
          reject(err)
        }
      })
    })
  },
  postTask: (task, questionnaire) => {
    let qtnr = {
      ...task,
      qtnr: questionnaire
    }
    let wrapper = {
      kind: config.TASK_KIND_QUESTIONNAIRE,
      raw: qtnr
    }
    return new Promise((resolve, reject) => {
      wx.request({
        method: 'POST',
        url: `${apiBase}`,
        header: {
          'Authorization': `Bearer ${store.data.token}`
        },
        data: wrapper,
        success: res => {
          if (res.statusCode != 200 || res.data.status == false) {
            reject(res)
          } else {
            resolve(res)
          }
        },
        fail: err => {
          reject(err)
        }
      })
    })
  },
  putTask: (task, questionnaire) => {
    let qtnr = {
      ...task,
      qtnr: questionnaire
    }
    let wrapper = {
      kind: config.TASK_KIND_QUESTIONNAIRE,
      raw: qtnr
    }
    return new Promise((resolve, reject) => {
      wx.request({
        method: 'PUT',
        url: `${apiBase}/${task.id}`,
        header: {
          'Authorization': `Bearer ${store.data.token}`
        },
        data: wrapper,
        success: res => {
          if (res.statusCode != 200 || res.data.status == false) {
            reject(res)
          } else {
            resolve(res)
          }
        },
        fail: err => {
          reject(err)
        }
      })
    })
  },
  deleteTask: (taskId, taskState) => {
    return new Promise((resolve, reject) => {
      wx.request({
        method: 'DELETE',
        url: `${apiBase}/${taskId}`,
        header: {
          'Authorization': `Bearer ${store.data.token}`
        },
        data: {
          state: taskState
        },
        success: res => {
          if (res.statusCode != 200 || res.data.status == false) {
            reject(res)
          } else {
            resolve(res)
          }
        },
        fail: err => {
          reject(err)
        }
      })
    })
  },
}