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
    // user中id字段不能为空，此处profile对象拷贝了user的内容
    let profile = { ...user }
    profile.id = userId
    // 目前后端要求其他字段也需要上传，此处将完整的profile对象与传入的user对象合并
    profile = { ...store.data.profile, ...user }
    return new Promise((resolve, reject) => {
      wx.request({
        method: 'POST',
        url: `${apiBase}/${userId}/certs`,
        header: {
          'Authorization': `Bearer ${store.data.token}`
        },
        data: profile,
        success: res => {
          if (res.statusCode != 200 || res.data.status == false) {
            reject(res)
          } else {
            // 更新本地存储的用户认证信息
            store.update({
              ['profile.certifiedPic']: profile.certifiedPic
            })
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