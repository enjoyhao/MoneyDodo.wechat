//app.js
import store from './store/store'
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    console.log('on launch...')
  },
  getUserInfo: function () {
    return new Promise((resolve, reject)=> {
      // 获取用户信息
      wx.getSetting({
        success: res => {
          if (res.authSetting['scope.userInfo']) {
            // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
            wx.getUserInfo({
              success: res => {
                // 将用户信息存储到全局状态，可供其他页面使用
                store.update({
                  userInfo: res.userInfo,
                  hasUserInfo: true
                })
                // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                // 所以此处加入 callback 以防止这种情况
                if (this.userInfoReadyCallback) {
                  this.userInfoReadyCallback(res)
                }
                resolve(res.userInfo)
              }
            })
          } else {
            reject(res)
          }
        },
        fail: res => {
          reject(res)
        }
      })
    })
  },
  auth: function () {
    return new Promise((resolve, reject) => {
      // 检查session key是否已经过期
      /*
      wx.checkSession({
        success: res => {
          console.log('session key is valid...')
          console.log(res)
          console.log('old token:' + store.data.token)
          resolve(res)
        },
        fail: res => {
          console.log('session key has expired...')
        }
      })
      */
      // 登录
      wx.login({
        success: res => {
          // 发送 res.code 到后台换取 openid, token
          if (res.code) {
            console.log('code: ' + res.code)
            wx.request({
              url: store.data.server + store.data.apiBase + '/auth/user',
              method: 'POST',
              data: {
                code: res.code
              },
              success: res => {
                console.log('POST api/auth/user')
                console.log(res)
                if (res.statusCode == 200 && res.data.status == true) {
                  store.update({
                    token: res.data.data.token,
                    openId: res.data.data.openid
                  })
                  resolve(res)
                } else {
                  console.log('认证失败...')
                  console.log(res)
                  reject(res)
                }
              },
              fail: res => {
                console.log('认证失败...')
                console.log(res)
                reject(res)
              }
            })
          } else {
            console.log('微信登录失败')
            console.log(res)
            reject(res)
          }
        }
      })
    })
  },
  globalData: {
  }
})