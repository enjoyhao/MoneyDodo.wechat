// pages/profile/profile.js
import store from '../../store/store'
import create from '../../utils/create'
import {rules} from '../../utils/util'
import config from '../../api/config'
import user from '../../api/user'
import certify from '../../api/certify'
import promiseCalls from '../../utils/promiseCalls.js'

const app = getApp()
const logger = wx.getLogManager()

// 头像最大不超过512KB
const MAX_ICON_SIZE = 512 << 10
const CLOUD_DIR_USER = app.globalData.config.CLOUD_DIR_USER
const USER_AVATAR_KEY = app.globalData.config.USER_AVATAR_KEY

create(store, {

  /**
   * Page initial data
   */
  data: {
    server: null,
    apibase: null,
    userInfo: null,
    profile: null,
    hasUserInfo: null,
    hasProfile: null,
    avatarSrc: '',
    // 用户是否第一次使用小程序，由其他页面传参决定
    isFirstLogin: false,
    // 控制页面是否进入编辑模式
    isEditMode: false,
    // 各字段的有效性
    status: {
      'name': true,
      'sId': true,
      'phone': true,
      'email': true,
      'introduction': true
    },
    colors: {
      'valid': '#f7f7f7',
      'invalid': 'red'
    },
    // 配置不同认证状态下显示的图标
    certIcon: [
      {type:'cancel',color: 'red'},
      {type: 'waiting', color: ''},
      {type: 'success', color: 'green'}
    ],
    // 配置不同认证状态下显示的提示
    certHint: [
      '未认证，点击上传身份认证信息',
      '审核中',
      '已认证',
    ],
    certIconType: 'cancel',
    certIconColor: '',
    certIconHint: '未认证，点击上传身份认证信息'
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    let that = this
    console.log(options)
    if (options && options.isFirstLogin == 'true') {
      console.log('the first login!')
      this.setData({
        isFirstLogin: true,
        isEditMode: true,
      })
    } else {
      // 更新用户个人信息
      user.getUser().then(res => {
        if (res.data.status) {
          that.update({
            profile: res.data.data
          }).then(() => {
            // 设置认证情况的显示
            that.setData({
              certIconType: that.data.certIcon[0 + store.data.profile.certificationStatus].type,
              certIconColor: that.data.certIcon[0 + store.data.profile.certificationStatus].color,
              certIconHint: that.data.certHint[0 + store.data.profile.certificationStatus]
            })
          })
        }
      })
    }
    // 设置认证情况的显示
    this.setData({
      certIconType: this.data.certIcon[0 + store.data.profile.certificationStatus].type,
      certIconColor: this.data.certIcon[0 + store.data.profile.certificationStatus].color,
      certIconHint: this.data.certHint[0 + store.data.profile.certificationStatus]
    })
    // 获取用户头像的路径，优先显示用户设置的头像，否则显示微信头像（若已获取到，否则显示默认头像）
    /*let src = ''
    if (store.data.hasProfile && store.data.profile.icon) {
      console.log('has icon: ')
      //src = '../../static/imgs/default-avatar.jpg'
      //src = store.data.userAvatar.path
      src = store.data.profile.icon
      console.log('src:'+src)
    } else if (store.data.hasUserInfo && store.data.userInfo.avatarUrl != '') {
      src = store.data.userInfo.avatarUrl
    } else {
      src = '../../static/imgs/default-avatar.jpg'
    }
    //src = store.data.profile.icon
    //console.log(store.data.profile.icon)
    console.log('src:'+src)
    this.update({
      avatarSrc: src
    })*/
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  },
  /**
   *  表单校验规则
   */
  rules: {
    'name': [rules.notEmpty, rules.noInvalidChar],
    'sId': [rules.notEmpty, rules.isNumber],
    'phone': [rules.notEmpty, rules.isNumber],
    'email': [rules.isValidEmail],
    'introduction': [rules.noInvalidChar]
  },
  /**
   *  表单校验
   */
  validate: function (value, rules) {
    let ret = {}
    for (let rule of rules) {
      ret = rule(value)
      // 若发现不通过当前规则的校验，则停止校验并返回错误信息
      if (!ret.status) {
        return ret
      }
    }
    return ret
  },
  /**
   * 表单提交
   */
  bindSubmit: function (e) {
    // 显示提交中，防止用户在提交过程进行其他操作
    wx.showLoading({
      title: '提交中',
    })
    let that = this
    console.log(e.detail)
    // 获取表单的值
    let data = e.detail.value
    let ret = {}
    // 检查用户填写内容，若发现有填写则提示用户并返回
    for (let key in data) {
      ret = this.validate(data[key], this.rules[key])
      if (!ret.status) {
        let path = `status.${key}`
        this.setData({
          [path]: false
        })
        wx.hideLoading()
        wx.showToast({
          title: key + ':' + ret.errMsg,
          icon: 'none'
        })
        break
      }
    }
    if (!ret.status) {
      return
    }
    // 用户填写内容校验通过，将用户填写内容与修改前内容合并，并提交表单
    data.id = store.data.openId
    data = {...store.data.profile, ...data}
    user.putUser(data).then(res => {
      console.log(res)
      if (res.data.status) {
        that.setData({
          isEditMode: false
        })
        // 更新用户名和头像
        if (res.data.data.name) {
          that.store.data.username = res.data.data.name
        }
        if (res.data.data.icon) {
          that.store.data.avatarSrc = res.data.data.icon
        }
        that.update()
        // 修改信息成功
        wx.hideLoading()
        wx.showToast({
          title: '信息修改成功',
          icon: 'success',
          mask: true,
          complete: res => {
            console.log(res)
            // 若用户是首次使用小程序，则返回首页
            if (that.data.isFirstLogin) {
              wx.switchTab({
                url: '../index/index',
              })
            }
          }
        })
      }
    }, err => {
      console.log(err)
      wx.hideLoading()
      wx.showToast({
        title: '信息修改失败',
        icon: 'none'
      })
    })
  },
  /**
   *  点击选择头像时弹出照片选择器并上传头像
   */
  onTabChooseAvatar: function (e) {
    let that = this
    wx.chooseImage({
      count: 1,
      success: function (res) {
        // 该变量可用于后续的异步调用使用
        let imgInfo = res
        console.log(res)
        /**注意后面需要调用wx.hideLoading来停止动画 */
        wx.showLoading({
          title: '上传中',
          /** 显示透明蒙层，防止触摸穿透 */
          mask: true,
        })
        // 照片大小超过限制
        if (res.tempFiles[0].size > MAX_ICON_SIZE) {
          wx.hideLoading()
          wx.showToast({
            icon: 'none',
            title: '图片大小请勿超过512K',
          })
          return
        }

        /**将图片转为base64编码 */
        promiseCalls.FileSystemManager.readFile({
          filePath: res.tempFilePaths[0],
          encoding: 'base64',
        })
        .then(res => {
          /** 
           * 上传头像
           */
          console.log(res)
          let imgType = imgInfo.tempFilePaths[0].split(".").slice(-1) || 'jpeg'
          if (imgType == 'jpg') {
            imgType = 'jpeg'
          }
          // 给base64编码加上前缀，使其可以作为src属性的值显示图片
          res.data = 'data:image/' + imgType + ';base64,' + res.data
          // 用户头像以base64编码传输
          let profile = {
            'icon': res.data
          }
          // 此处只需将profile需要改变的字段作为参数请求即可
          return user.putUser(profile)
        })
        .then(res => {
          /**
           *  头像已成功上传到服务端，此处将头像上传到云端备份
           */ 
          console.log(res)
          wx.cloud.init()
          return promiseCalls.cloud.uploadFile({
            cloudPath: `${CLOUD_DIR_USER}/${USER_AVATAR_KEY}`,
            filePath: imgInfo.tempFilePaths[0],
          })
        })
        .then(res => {
          /**
           * 头像成功上传到云，更新页面显示
           */   
          console.log(res)
          that.setData({
            avatarSrc: imgInfo.tempFilePaths[0]
          })
          that.update({
            ['userAvatar.path']: res.fileID,
          })
          try {
            wx.setStorageSync(USER_AVATAR_KEY, res.fileID)
          } catch (err) {
            console.log(err)
          }
          wx.hideLoading()
          wx.showToast({
            icon: 'success',
            title: '上传成功',
          })
        })
        .catch(err => {
          console.log(err)
          wx.hideLoading()
          wx.showToast({
            title: err.data.errinfo || '上传失败，请重试',
            icon: 'none',
          })
          logger.info('the err is', err)
        })
      },
      fail: function (err) {
        console.log(err)
        wx.showToast({
          icon: 'none',
          title: '请选择一张图片',
        })
      }
    })
  },
  /**
   * 点击编辑时使页面进入可编辑状态 
   */
  onTabEdit: function (e) {
    this.setData({
      isEditMode: true
    })
  },
  /**
   * 点击取消编辑时回到编辑前状态
   */
  onTabCancel: function (e) {
    // 通知表单将内容更新回编辑前状态
    this.setData({
      profile: this.data.profile,
      isEditMode: false
    })
  },
  /**
   * 用户点击上传身份认证信息时触发，完成用户身份认证信息的上传（图片）
   */
  onTabUploadCertification: function(e) {
    let that = this
    // 若已经认证
    if (store.data.profile.certificationStatus == config.CERT_STATUS_CERTED) {
      wx.showToast({
        icon: 'warning',
        title: '已认证通过，无需再次认证',
      })
      return
    }
    // 若未认证
    wx.chooseImage({
      count: 1,
      success: function(res) {
        // 该变量可用于后续的异步调用使用
        let imgInfo = res
        console.log(res)
        /**注意后面需要调用wx.hideLoading来停止动画 */
        wx.showLoading({
          title: '上传中',
          /** 显示透明蒙层，防止触摸穿透 */
          mask: true,
        })
        /**将图片转为base64编码 */
        promiseCalls.FileSystemManager.readFile({
          filePath: imgInfo.tempFilePaths[0],
          encoding: 'base64',
        })
        .then(res => {
          /** 
           * 上传头像
           */
          console.log(res)
          let imgType = imgInfo.tempFilePaths[0].split(".").slice(-1) || 'jpeg'
          if (imgType == 'jpg') {
            imgType = 'jpeg'
          }
          // 给base64编码加上前缀，使其可以作为src属性的值显示图片
          res.data = 'data:image/' + imgType + ';base64,' + res.data
          // 认证图片以base64编码传输
          let profile = {
            'certifiedPic': res.data
          }
          // 此处只需将profile需要改变的字段作为参数请求即可
          return certify.postCerts(profile)
        })
        .then(res => {
          /**
           * 认证图片上传成功
           */
          console.log(res)
          // 更新本地存储的用户认证信息
          that.update({
            ['profile.certificationStatus']: 0+res.data.data.certificationStatus,
          })
          // 更新认证情况的显示
          that.setData({
            certIconType: that.data.certIcon[0 + res.data.data.certificationStatus].type,
            certIconColor: that.data.certIcon[0 + res.data.data.certificationStatus].color,
            certIconHint: that.data.certHint[0 + res.data.data.certificationStatus]
          })
          // 更新页面显示
          wx.hideLoading()
          wx.showToast({
            icon: 'success',
            title: '上传成功',
          })
        }, err => {
          /**
           * 认证图片上传失败
           */
          console.log(err)
          wx.hideLoading()
          wx.showToast({
            icon: 'none',
            title: '上传失败，请重试',
          })
        })
        .catch(err => {
          wx.hideLoading()
          console.log(err)
        })
      },
    })
  }
})