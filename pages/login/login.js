// pages/login/login.js
import store from '../../store/store.js'
import create from '../../utils/create'
import user from '../../api/user.js'

const app = getApp()
create(store, {

  /**
   * Page initial data
   */
  data: {
    motto: null,
    userInfo: null,
    hasUserInfo: null,
    hasProfile: null,
    canIUse: null,
    openType: '',
    isLoginFinished: false,
    loadFinished: false,
    msg: '连接中',
    firstName: null,
    lastName: null,
    pureProp: null
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    })
    let that = this
    app.auth()
    .then(res => {
      // 登录成功，此时已获取到token和openid
      let openType = ''
      if (!that.data.hasProfile && that.data.canIUse) {
        openType = 'getUserInfo'
      }
      console.log('open-type:' + openType)
      that.setData({
        openType: openType,
        isLoginFinished: true
      })
      // 从服务端获取用户个人信息
      return user.getUser()
    }, err => {
      // TODO:处理此处的显示
      wx.hideLoading()
      wx.showToast({
        title: '连接失败，请刷新重试或检查网络',
        icon: 'none'
      })
    })
    .then(res => {
      console.log(res)
      that.store.data.hasProfile = res.data.data.name && res.data.data.name != ''
      if (that.store.data.hasProfile) {
        that.store.data.profile = res.data.data
      }
      that.update().then(res => {
        wx.hideLoading()
        that.setData({
          loadFinished: true
        })
        if (that.store.data.hasProfile) {
          // 用户个人信息已经填写，返回首页
          wx.switchTab({
            url: '../index/index',
          })
        } else {
          wx.redirectTo({
            url: '../profile/profile'
          })
        }
      })
    })
    .catch(err => {
      console.log(err)
    })
    /*
    if (app.globalData.userInfo) {
      this.store.data.userInfo = app.globalData.userInfo
      this.store.data.hasUserInfo = true
      this.update()
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.store.data.userInfo = res.userInfo
        this.store.data.hasUserInfo = true
        this.update()
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.store.data.userInfo = res.userInfo
          this.store.data.hasUserInfo = true
          this.update()
        }
      })
    }*/
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
    this.onLoad()
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
   * Called when user click on the login button 
   */
  bindGetUserInfo: function (e) {
    console.log(e)
    if (e.detail.userInfo) {
      this.store.data.userInfo = e.detail.userInfo
      this.store.data.hasUserInfo = true
    }
    this.update().then(() => {
      // 跳转到用户信息编辑页面
      wx.redirectTo({
        url: '../profile/profile'
      })
    });
  },
  // 跳转到用户信息编辑页面
  bindGotoProfile: function(e) {
    console.log(e)
    wx.redirectTo({
      url: '../profile/profile',
    })
  }

})