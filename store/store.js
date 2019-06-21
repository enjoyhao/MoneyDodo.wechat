export default {
  data: {
    // server: 'http://localhost:8123',
    //server: 'http://172.18.32.216:8123',
    //server: 'http://localhost:8123',
    //server: 'http://172.18.32.216:8889',
    server: 'http://111.230.10.230:8998',
    apiBase: '/api',
    motto: 'Hello World',
    openId: null,
    token: null,
    userInfo: null,
    profile: null,
    /**用户头像文件信息 */
    userAvatar: {
      path: '',
    },
    hasUserInfo: false,
    hasProfile: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    logs: [],
    firstName: 'dnt',
    lastName: 'zhang',
    fullName: function () {
      return this.firstName + this.lastName
    },
    pureProp: 'pureProp',
    globalPropTest: 'abc', //更改我会刷新所有页面,不需要在组件和页面声明data依赖
    ccc: { ddd: 1 }, //更改我会刷新所有页面,不需要在组件和页面声明data依赖
    
    newQtnr: null
  
  },
  globalData: ['globalPropTest', 'ccc.ddd'],
  logMotto: function () {
    console.log(this.data.motto)
  },
  //默认 false，为 true 会无脑更新所有实例
  //updateAll: true
}