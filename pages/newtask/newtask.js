// pages/newtask/newtask.js
var util = require('../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tasktypes: ['问卷调查', '代取快递', '招收简历'],
    sex: ['不限', '男', '女'],
    grades: ['不限', '大一', '大二', '大三', '大四', '研究生', '博士生'],
    school: ['不限', '中山大学', '华南理工大学', '广东外语外贸大学', '广州大学', '其他'],
    objectArray: [
      {
        id: 0,
        name: '问卷调查'
      },
      {
        id: 1,
        name: '代取快递'
      },
      {
        id: 2,
        name: '招收简历'
      }
    ],
    index_task: 0,
    index_sex: 0,
    index_grade: 0,
    index_school: 0,
    date: '2016-09-01',
    time: '12:01'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
      title: '填写任务信息',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })

    // 调用函数时，传入new Date()参数，返回值是日期和时间
    var time = util.formatTime(new Date());
    var date = util.formatDate(new Date());
    // 再通过setData更改Page()里面的data，动态更新页面的数据
    this.setData({
      time: time,
      date: date
    });

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

  /**
   * 选择日期
   */
  bindDateChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },

  /**
   * 选择时间
   */
  bindTimeChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      time: e.detail.value
    })
  },

  bindTaskPickerChange(e){
    this.setData({
      index_task: e.detail.value
    })
  },

  bindSexPickerChange(e) {
    this.setData({
      index_sex: e.detail.value
    })
  },

  bindGradePickerChange(e) {
    this.setData({
      index_grade: e.detail.value
    })
  },

  bindSchoolPickerChange(e) {
    this.setData({
      index_school: e.detail.value
    })
  }

})