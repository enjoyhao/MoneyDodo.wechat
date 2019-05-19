// pages/profile/profile.js
import store from '../../store/store'
import create from '../../utils/create'
import {rules} from '../../utils/util'
import user from '../../api/user'

const app = getApp()
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
    avatarSrc: '../../static/imgs/default-avatar.jpg',
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
    }
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    let src = ''
    if (store.data.hasProfile && store.data.profile.icon != '') {
      src = store.data.profile.icon
    } else if (store.data.hasUserInfo && store.data.userInfo.avatarUrl != '') {
      src = store.data.userInfo.avatarUrl
    } else {
      src = '../../static/imgs/default-avatar.jpg'
    }
    this.setData({
      avatarSrc: src
    })
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
  // 表单校验规则
  rules: {
    'name': [rules.notEmpty, rules.noInvalidChar],
    'sId': [rules.notEmpty, rules.isNumber],
    'phone': [rules.notEmpty, rules.isNumber],
    'email': [rules.isValidEmail],
    'introduction': [rules.noInvalidChar]
  },
  // 表单校验
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
  // 表单提交
  bindSubmit: function (e) {
    let that = this
    console.log(e.detail)
    // 获取表单的值
    let data = e.detail.value
    let ret = {}
    for (let key in data) {
      ret = this.validate(data[key], this.rules[key])
      if (!ret.status) {
        let path = `status.${key}`
        this.setData({
          [path]: false
        })
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
    // 提交表单
    // console.log('TODO:wait to submit')
    data.id = store.data.openId
    user.putUser(data).then(res => {
      console.log(res)
      if (res.data.status) {
        // 修改信息成功
        wx.showToast({
          title: '信息修改成功',
          icon: 'success'
        })
        that.setData({
          isEditMode: false
        })
      }
    }, err => {
      console.log(err)
    })
    /*
    let data = e.detail.value
    console.log(data)
    wx.request({
      url: this.data.server + this.data.apibase + '/users/' + store.data.openId + '/certs',
      method: 'POST',
      data: data,
      header: {
        'token': store.data.token,
        'Authorization': 'Bearer ' + store.data.token
      },
      success (res) {
        console.log(res)
      }
      })
      */
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
  }
})