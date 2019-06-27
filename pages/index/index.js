//index.js
import store from '../../store/store.js'
import create from '../../utils/create'
import config from '../../api/config'
import test from '../../api/test'
import user from '../../api/user'
import cpt from '../../api/cpt'
import charge from '../../api/charge'
import data from '../../api/data'
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
    businessType: ['问卷调查', '代取快递', '社团招新'],
    qtnrTasks: [],
    recruitTasks: [],
    deliveryTasks: [],
    allQtnrTasks: [],
    userInfos: {}
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    console.log(data.d_tasks)
    console.log(data.r_tasks)
    this.setData({
      deliveryTasks: data.d_tasks,
      recruitTasks: data.r_tasks
    })
    var that = this
    cpt.getAllTasks().then(res => {
      console.log(res)
      if (res.data.status) {
        res.data.data = that.formatTaskData(res.data.data)
        let allQtnrTasks = res.data.data.filter(item => item.kind == config.TASK_KIND_QUESTIONNAIRE)
        // 暂时未设置分页显示
        let qtnrTasks = allQtnrTasks.slice()
        that.setData({
          qtnrTasks: qtnrTasks,
          allQtnrTasks: allQtnrTasks
        })
        // 格式化其他数据
        that.data.deliveryTasks = that.formatTaskData(that.data.deliveryTasks)
        that.data.recruitTasks = that.formatTaskData(that.data.recruitTasks)
        that.setData({
          deliveryTasks: that.data.deliveryTasks,
          recruitTasks: that.data.recruitTasks
        })
        // addUserData为异步调用，异步加载任务发布者用户名并更新显示
        that.addUserData(this.data.allQtnrTasks)
      }
    }, err => {
      console.log(err)
    })
  },
  /**
   * 下拉刷新页面
   */
  onPullDownRefresh: function(e) {
    this.onLoad()
  },
  /**
   * 获取每个任务的发布者的相关信息
   */
  addUserData: function(tasks) {
    let that = this
    for(let i in tasks){
      if (tasks[i].publisher) {
        if (this.data.userInfos[tasks[i].publisher]) {
          continue
        }
        user.getUser(tasks[i].publisher).then(res => {
          this.data.userInfos[tasks[i].publisher] = res.data.data
          that.update({
            userInfos: this.data.userInfos,
          })
        })
      }
    }
  },
  /**
   * 格式化任务列表中的数据，如日期等字段
   */
  formatTaskData: function(tasks) {
    let that = this
    tasks = tasks.map((task,i) => {
      // 格式化日期
      task.cutoff = task.cutoff || ""
      task.cutoff = that.formatDateStr(task.cutoff)
      task.pubdate = task.pubdate || ""
      task.pubdate = that.formatDateStr(task.pubdate)
      // 格式化奖励
      task.reward = task.reward || 0
      task.reward = task.reward > 0 ? task.reward : task.reward
      return task
    })
    // 重排序，最新的排最前
    tasks = tasks.sort((task1, task2) => {
      let id1 = parseInt(task1.id) || -1
      let id2 = parseInt(task2.id) || -1
      if (id1 == id2) {
        return 0
      } else if (id1 > id2) {
        // id较大(较新)的排在前面
        return -1
      } else {
        return 1
      }
    })
    console.log('formated data:', tasks)
    return tasks
  },
  /**
   * 格式化日期字符串
   */
  formatDateStr: function(str) {
    if (!str || str.length < 19) {
      console.log('default date.......')
      return '2019-06-25 12:00:00'
    }
    return str.substr(19).replace("T", " ").replace("Z", " ")
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  /*
  test: function (e) {
    // test.testGetUser()
    // test.testGetTasks()
    // test.testApiTask()
    // test.testApiCpt()
    // test.wtf()
    // test.testApiCpt()
    // test.testGetCerts()
    //wx.navigateTo({
    //  url: '../design-questionnaire/design-questionnaire',
    //})
    // test.testGetUser()
    // test.testGetTasks()
    // test.wtf()
    //charge.getBalance()
  },*/
  onTapTask: function(e) {
    console.log(e)
  }
})
