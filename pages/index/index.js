//index.js
import store from '../../store/store.js'
import create from '../../utils/create'
import config from '../../api/config'
import test from '../../api/test'
import cpt from '../../api/cpt'
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
    businessType: ['问卷调查','外卖代取','社团招新','快递代取'],
    qtnrTasks: [],
    allQtnrTasks: [],
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    var that = this
    cpt.getAllTasks().then(res => {
      console.log(res)
      if (res.data.status) {
        res.data.data = that.formatTaskData(res.data.data)
        that.setData({
          qtnrTasks: res.data.data.filter(item => item.kind == config.TASK_KIND_QUESTIONNAIRE),
          allQtnrTasks: res.data.data.filter(item => item.kind == config.TASK_KIND_QUESTIONNAIRE)
        })
      }
    }, err => {
      console.log(err)
    })
  },
  /**
   * 格式化任务列表中的数据，如日期等字段
   */
  formatTaskData: function(tasks) {
    return tasks.map(task => {
      // 格式化日期
      task.cutoff = task.cutoff || ""
      task.cutoff = task.cutoff.replace("T", " ").replace("Z", " ")
      task.pubdate = task.pubdate || ""
      task.pubdate = task.pubdate.replace("T", " ").replace("Z", " ")
      // 格式化奖励
      task.reward = task.reward || 0
      task.reward = task.reward > 0 ? task.reward : task.reward
      return task
    })
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
    test.testApiCpt()
    // test.testGetCerts()
    //wx.navigateTo({
    //  url: '../design-questionnaire/design-questionnaire',
    //})
    // test.testGetUser()
    // test.testGetTasks()
    // test.wtf()
  },
  onTapTask: function(e) {
    console.log(e)
  }
})
