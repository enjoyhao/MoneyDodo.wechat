// pages/mine/mine.js
import store from '../../store/store'
import create from '../../utils/create'
import user from '../../api/user'
import charge from '../../api/charge'
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
    avatarSrc: null,
    username: null,
    balance: 0.01,
    // 模态弹窗相关变量
    showModal: false,
    setType: '充值金额（元）',
    operType: 0, // 0代表充值操作，1代表提现操作
    amount: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.updateUser()
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
    console.log('show......')
    this.updateUser()
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
  },
  /**
   * 监听输入，获取输入的金额值
   */
  onInputChange: function(e) {
    this.setData({
      amount: e.detail.value
    })
  },
  /**
   * 更新用户信息（包含余额）
   */
  updateUser: function() {
    let that = this
    user.getUser().then(res => {
      that.update({
        profile: res.data.data
      })
      if (res.data.data.icon) {
        that.update({
          avatarSrc: res.data.data.icon,
        })
      }
      if (res.data.data.name) {
        that.update({
          username: res.data.data.name
        })
      }
    }, err => {
      console.log(err)
    })
  },
  /**
   * 隐藏弹窗
   */
  hideModal: function(e) {
    this.setData({
      showModal: false
    })
  },
  /**
   * 点击弹窗取消按钮
   */
  onCancel: function(e) {
    this.setData({
      showModal: false
    })
  },
  /**
   * 点击确认按钮
   */
  onConfirm: function(e) {
    let that = this
    this.setData({
      showModal: false
    })
    if (this.data.amount) {
      this.data.amount = parseFloat(this.data.amount)
      this.data.amount = this.data.amount > 0 ? this.data.amount : -this.data.amount
      if (this.data.operType === 1) {
        // 提现操作amount为负数
        this.data.amount = -this.data.amount
      }
      wx.showLoading({
        title: '操作中',
        mask: 'true'
      })
      // 执行操作
      charge.postCharges(this.data.amount).then(res => {
        console.log(res)
        that.updateUser()
        wx.hideLoading()
      }, err => {
        console.log(err)
        wx.hideLoading()
      })
    }
    wx.showModal({
      title: '操作成功',
      content: '充值/提现成功',
    })
  },
  /**
   * 用户充值
   */
  onClickCharge: function() {
    /*个人版小程序不支持支付接口
    wx.requestPayment({
      timeStamp: '',
      nonceStr: '',
      package: '',
      signType: 'MD5',
      paySign: '',
      success(res) {console.log(res)},
      fail(res) { console.log(res)}
    })*/
    this.data.amount = 0
    this.setData({
      operType: 0,
      setType: '充值金额（元）',
      showModal: true
    })
  },
  /**
   * 用户提现
   */
  onClickWithdraw: function(e) {
    this.data.amount = 0
    this.setData({
      operType: 1,
      setType: '提现金额（元）',
      showModal: true
    })
  }
})