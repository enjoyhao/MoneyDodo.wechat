// pages/mine/mine.js
import store from '../../store/store'
import create from '../../utils/create'
const app = getApp()

create(store, {

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,
    profile: null,
    hasUserInfo: null,
    hasProfile: null,
    avatarSrc: '',
    username: '',
    balance: 0.01
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取用户头像的路径，优先显示用户设置的头像，否则显示微信头像（若已获取到，否则显示默认头像）
    let src = ''
    if (store.data.hasProfile && store.data.profile.icon) {
      src = store.data.profile.icon
    } else if (store.data.hasUserInfo && store.data.userInfo.avatarUrl != '') {
      src = store.data.userInfo.avatarUrl
    } else {
      src = '../../static/imgs/default-avatar.jpg'
    }
    console.log('avatar src:' + src)
    // 获取用户名，优先显示用户设置的用户名，否则显示微信昵称（若已获取到，否则显示默认昵称）
    let name = ''
    if (store.data.hasProfile && store.data.profile.name) {
      name = store.data.profile.name
    } else if (store.data.hasUserInfo && store.data.userInfo.nickName) {
      name = store.data.userInfo.nickName
    } else {
      name = '我的名字叫没有名字'
    }
    console.log('user name:' + name)
    this.setData({
      avatarSrc: src,
      username: name
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  gotoProfile: function () {
    wx.navigateTo({
      url: '../profile/profile',
    })
  }
})