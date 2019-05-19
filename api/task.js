import store from '../store/store'
const apiBase = store.data.server + store.data.apiBase + '/users'
const apiPostfix = 'tasks'
export default {
  /**
   *  param对即get请求的参数
  */ 
  getTasks: (taskState) => {
    // taskState的取值可参考/api/config.js
    let param = taskState ? {state: taskState} : {}
    let userId = store.data.openId
    return new Promise((resolve, reject) => {
      wx.request({
        method: 'GET',
        url: `${apiBase}/${userId}/${apiPostfix}`,
        header: {
          'Authorization': `Bearer ${store.data.token}`
        },
        data: param,
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