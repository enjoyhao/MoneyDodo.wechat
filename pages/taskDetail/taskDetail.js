// pages/taskDetail/taskDetail.js
import api_cpt from '../../api/cpt.js'
import config from '../../api/config'
import store from '../../store/store.js'
import create from '../../utils/create'
import api_user from '../../api/user.js'
const app = getApp();

create(store, {

  /**
   * 页面的初始数据
   */
  data: {
    
    //问卷发布者id
    qsnrPublisherId: 0,
    //若“我”是taker则不显示底部按钮
    imTaker: false,
    imPublisher: true,

    userInfo: {},
    hasUserInfo: false,

    curTask: null,
    hidetaskClosed: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let taskid = options.id
    if(!taskid) return

    api_cpt.getTask(taskid).then(res => {
      console.log(res)
      let _task = res.data.data
      _task.cutoff = _task.cutoff.substr(0, 10) + ' ' + _task.cutoff.substr(11, 5)
      this.setData({
        curTask: _task
      })

      if(res.data.data.state == config.TASK_STATE_CLOSED){
        this.setData({
          imTaker: true,
          imPublisher: true,
          hidetaskClosed: false
        })
        return
      }

      if(res.data.data.publisher == store.data.openId){
        this.setData({
          imTaker: false,
          imPublisher: true
        })
      } else {
        this.setData({
          imTaker: true,
          imPublisher: false
        })
      }
    }, err => {
      console.log(err)
      wx.showToast({
        title: '任务不存在',
        icon: 'none'
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
    let taskId = this.data.curTask.id
    wx.navigateTo({
      url: '/pages/fillInQuestionaire/fillInQuestionaire?taskId=' + taskId,
    })

  },

  taskDone: function() {
    let task = this.data.curTask
    wx.showModal({
      title: '提示',
      content: '确认任务已完成并结束？',
      showCancel: true,
      cancelText: '否',
      cancelColor: 'gray',
      confirmText: '是',
      confirmColor: 'green',
      success: function (res) {
        if (res.cancel) {
          return
        }
        task.state = config.TASK_STATE_CLOSED
        task.cutoff = task.cutoff.substr(0, 10) + 'T' + task.cutoff.substr(11, 5) + ':00Z'
        api_cpt.putTask(task, task.qtnr).then(res => {
          wx.showToast({
            title: '结束任务成功',
            icon: 'none',
            duration: 1000,
            success: function () {
              setTimeout(function () {
                wx.navigateBack({
                  delta: 1
                })
              }, 1000)
            }
          })
        }, err => {
          console.log(err)
          wx.showToast({
            title: '结束任务失败',
            icon: 'none'
          })
        })
      },
      fail: function (res) { },
      complete: function (res) { },
    })
  },


  cancleTask: function() {
    let task = this.data.curTask
    wx.showModal({
      title: '提示',
      content: '确认取消？取消后任务将失效',
      showCancel: true,
      cancelText: '否',
      cancelColor: 'gray',
      confirmText: '是',
      confirmColor: 'green',
      success: function(res) {
        if(res.cancel){
          return
        }
        task.state = config.TASK_STATE_CLOSED
        task.cutoff = task.cutoff.substr(0, 10) + 'T' + task.cutoff.substr(11, 5) + ':00Z'
        api_cpt.putTask(task, task.qtnr).then(res => {
          wx.showToast({
            title: '取消任务成功',
            icon: 'none',
            duration: 1000,
            success: function() {
              setTimeout(function() {
                wx.navigateBack({
                  delta: 1
                })
              }, 1000)
            }
          })
        }, err => {
          console.log(err)
          wx.showToast({
            title: '取消任务失败',
            icon: 'none'
          })
        })
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  }

})