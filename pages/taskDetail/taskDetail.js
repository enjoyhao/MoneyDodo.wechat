// pages/taskDetail/taskDetail.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //用于显示
    qsnrTitle: "问卷标题",
    //用于进入问卷填写页面
    qsnrId: 0,
    //问卷发布者id
    qsnrPublisherId: 0,
    //若“我”是taker则不显示底部按钮
    imTaker: false,
    imPublisher: true,

    userInfo: {},
    hasUserInfo: false,

    task_money: "1.00",
    task_deadline: "2019-5-18 23:59",
    task_tips: "不要乱填"
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
      title: '任务详情',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })

    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      });
      console(this.data.userInfo);

      //获取当前用户id并判断是否是发布者
      //TO DO
    }

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

  startToDo: function() {
    //跳转到填写问卷界面
    //TO Do
  },

  taskDone: function() {

  },


  cancleTask: function() {

  },

  exit: function() {
    //跳转到首页
    //TO Do
  }
})