//index.js
import store from '../../store/store.js'
import create from '../../utils/create'
import test from '../../api/test'
import regeneratorRuntime from '../../libs/runtime'

//获取应用实例
const app = getApp()

create(store, {
  data: {
    motto: null,
    userInfo: null,
    hasUserInfo: null,
    hasProfile: null,
    canIUse: null,
    array: ['1','2','3'],
    businessType: ['问卷调查','外卖代取','社团招新','快递代取']
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
  
    /*else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }*/
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  test: function (e) {
    // test.testGetUser()
    // test.testGetTasks()
    // test.testApiTask()
    // test.testApiCpt()
    // test.wtf()
    // test.testApiCpt()
    // test.testGetCerts()
    wx.navigateTo({
      url: '../design-questionnaire/design-questionnaire',
    })
    // test.testGetUser()
    // test.testGetTasks()
    // test.wtf()
  }
})
