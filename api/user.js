import store from '../store/store.js'
const apiBase = store.data.server + store.data.apiBase + '/users'
export default {
  getUser: (userId) => {
    return new Promise((resolve, reject) => {
      wx.request({
        method: 'GET',
        url: `${apiBase}/${userId}`,
        header: {
          'Authorization': `Bearer ${store.data.token}`
        },
        success: res => {
          resolve(res)
        },
        fail: err => {
          reject(err)
        }
      })
    })
  },
  putUser: (userId, user) => {
    return new Promise((resolve, reject) => {
      wx.request({
        method: 'PUT',
        url: `${apiBase}/${userId}`,
        header: {
          'Authorization': `Bearer ${store.data.token}`
        },
        data: user,
        success: res => {
          resolve(res)
        },
        fail: err => {
          reject(err)
        }
      })
    })
  },
  deleteUser: (userId) => {
    return new Promise((resolve, reject) => {
      wx.request({
        method: 'DELETE',
        url: `${apiBase}/${userId}`,
        header: {
          'Authorization': `Bearer ${store.data.token}`
        },
        success: res => {
          resolve(res)
        },
        fail: err => {
          reject(err)
        }
      })
    })
  }
}