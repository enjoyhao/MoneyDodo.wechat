import store from '../store/store.js'
const apiBase = store.data.server + store.data.apiBase + '/users'
export default {
  getUser: () => {
    let userId = store.data.openId
    return new Promise((resolve, reject) => {
      wx.request({
        method: 'GET',
        url: `${apiBase}/${userId}`,
        header: {
          'Authorization': `Bearer ${store.data.token}`
        },
        success: res => {
          if (res.statusCode != 200 || res.data.status == false) {
            reject(res)
          } else {
            // 已成功获取用户信息，若本地未缓存头像，则缓存，目前先设计成每次都缓存
            /*
            if (res.data.data.icon != '') {
              let p = '/R/project/github/linshk/MoneyDodo'
              wx.getFileSystemManager().writeFileSync(`${wx.env.USER_DATA_PATH}/user-avatar.png`, res.data.data.icon, 'base64')
              store.update({
                ['userAvatar.path']: '/user-avatar.png'
              })
            }
            */
            resolve(res)
          }
        },
        fail: err => {
          reject(err)
        }
      })
    })
  },
  putUser: (user) => {
    let userId = store.data.openId
    // user中id字段不能为空，此处profile对象拷贝了user的内容
    let profile = {...user}
    profile.id = userId
    // 目前后端要求其他字段也需要上传，此处将完整的profile对象与传入的user对象合并
    profile = {...store.data.profile, ...user}
    return new Promise((resolve, reject) => {
      wx.request({
        method: 'PUT',
        url: `${apiBase}/${userId}`,
        header: {
          'Authorization': `Bearer ${store.data.token}`
        },
        data: profile,
        success: res => {
          if (res.statusCode != 200 || res.data.status == false) {
            reject(res)
          } else {
            // 已成功修改信息，更新本地缓存的信息
            let newProfile = {
              ...store.data.profile,
              ...profile
            }
            store.update({
              profile: newProfile
            })
            // 已成功修改信息，若头像有更新，则更新相应的头像文件
            /*if (user.icon) {
              if (user.icon == '') {
                store.update({
                  ['userAvatar.path']: '../static/imgs/default-avatar.jpg'
                })
              } else {
                // user.icon为图片base64编码，需转为图片文件并保存
              }
            }*/
            resolve(res)
          }
        },
        fail: err => {
          reject(err)
        }
      })
    })
  },
  deleteUser: () => {
    let userId = store.data.openId
    return new Promise((resolve, reject) => {
      wx.request({
        method: 'DELETE',
        url: `${apiBase}/${userId}`,
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
  }
}