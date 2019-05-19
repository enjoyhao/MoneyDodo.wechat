import store from '../store/store'
const apiBase = store.data.server + store.data.apiBase + '/users'
export default {
  getCerts: () => {
    let userId = store.data.openId
    return new Promise((resolve, reject) => {
      wx.request({
        method: 'GET',
        url: `${apiBase}/${userId}/certs`,
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
  postCerts: (user) => {
    user = user || {}
    let userId = store.data.openId
    return new Promise((resolve, reject) => {
      wx.request({
        method: 'POST',
        url: `${apiBase}/${userId}/certs`,
        header: {
          'Authorization': `Bearer ${store.data.token}`
        },
        data: user,
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