// pages/fillInQuestionaire/fillInQuestionaire.js
import task from '../../api/task'
import config from '../../api/config.js'
import cpt from '../../api/cpt.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    taskId: 1,
    qtnr: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    let taskId = options.taskId
    cpt.getTask(taskId).then(function (res) {
      console.log(res.data.data.qtnr)
      that.setData({
        qtnr: res.data.data.qtnr
      })
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
    wx.setNavigationBarTitle({
      title: '填写问卷',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })

    task.getTasks(config.TASK_KIND_QUESTIONNAIRE)
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

  radioChange: function () {
    
  },

  postQtnr: function () {
    wx.redirectTo({
      url: '/pages/submitSuccess/submitSuccess'
    })
  }
})