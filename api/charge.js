import store from '../store/store'
const apiBase = store.data.server + store.data.apiBase + '/charges'
const userBase = store.data.server + store.data.apiBase + '/users'
export default {
  getCharge: () => {
    let userId = store.data.openId
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
  // 充值或提现
  postCharges: (amount) => {
    let charge = {}
    let userId = store.data.openId
    charge.userid = userId
    charge.amount = amount
    return new Promise((resolve, reject) => {
      wx.request({
        method: 'POST',
        url: `${apiBase}`,
        header: {
          'Authorization': `Bearer ${store.data.token}`
        },
        data: charge,
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