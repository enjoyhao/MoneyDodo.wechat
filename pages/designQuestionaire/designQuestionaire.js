// pages/designQuestionaire/designQuestionaire.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    qtnr: {
      query: [], 
      singleChoice: [], 
      mutipleChoice: [] 
    },
    showModal: false,
    input: '',
    questionIndex: 0,
    itemIndex: 0,
    type: 0,
    checked: '',
    setType: '问题'
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

  addSingleChoice: function (e) {
    let q = this.data.qtnr
    let question = {
      question: '问题?',
      choices:['选项','选项']
    }
    q.singleChoice.push(question)
    this.setData({
      qtnr: q
    })
  },

  addMultiChoice: function (e) {
    let q = this.data.qtnr
    let question = {
      question: '问题?',
      choices: ['选项', '选项']
    }
    q.mutipleChoice.push(question)
    this.setData({
      qtnr: q
    })
  },

  addQuery: function () {
    let q = this.data.qtnr
    let question = {
      question: '问题?'
    }
    q.query.push(question)
    this.setData({
      qtnr: q
    })
  },

  setSingleQuestion: function (e) {
    this.setData({
      showModal: true,
      questionIndex: e.currentTarget.dataset.index,
      type: 0,
      setType: '问题'
    })
  },

  setMultiQuestion: function (e) {
    this.setData({
      showModal: true,
      questionIndex: e.currentTarget.dataset.index,
      type: 1,
      setType: '问题'
    })
  },

  setQueryQuestion: function (e) {
    this.setData({
      showModal: true,
      questionIndex: e.currentTarget.dataset.index,
      type: 2,
      setType: '问题'
    })
  },

  setSingleItem: function (e) {
    this.setData({
      showModal: true,
      questionIndex: e.currentTarget.dataset.q,
      itemIndex: e.currentTarget.dataset.index,
      type: 0,
      setType: '选项'
    })
  },

  setMultiItem: function (e) {
    this.setData({
      showModal: true,
      questionIndex: e.currentTarget.dataset.q,
      itemIndex: e.currentTarget.dataset.index,
      type: 1,
      setType: '选项'
    })
  },

  /**
    * 对话框取消按钮点击事件
    */
  onCancel: function () {
    this.hideModal();
  },

  /**
   * 对话框确认按钮点击事件
   */
  onConfirm: function (e) {
    
    let q = this.data.qtnr
    if(this.data.setType == '问题')
    {
      if (this.data.type == 0) {
        q.singleChoice[this.data.questionIndex].question = this.data.input
      }
      else if (this.data.type == 1) {
        q.mutipleChoice[this.data.questionIndex].question = this.data.input
      }
      else {
        q.query[this.data.questionIndex].question = this.data.input
      }
    }else {
      if (this.data.type == 0) {
        q.singleChoice[this.data.questionIndex].choices[this.data.itemIndex] = this.data.input
      }
      else {
        q.mutipleChoice[this.data.questionIndex].choices[this.data.itemIndex] = this.data.input
      }
    }
    
    console.log(q)
    this.setData({
      qtnr: q
    })
    this.hideModal()
  },

  hideModal: function () {
    this.setData({
      showModal: false,
      input: ''
    });
  },

  inputChange: function (e) {
    this.setData({
      input: e.detail.value
    })
    console.log(this.data.input)
  },

  addSingleItem: function (e) {
    let q = this.data.qtnr
    q.singleChoice[e.currentTarget.dataset.index].choices.push('选项')
    this.setData({
      qtnr: q
    })
  },

  addMultiItem: function (e) {
    let q = this.data.qtnr
    q.mutipleChoice[e.currentTarget.dataset.index].choices.push('选项')
    this.setData({
      qtnr: q
    })
  }
})