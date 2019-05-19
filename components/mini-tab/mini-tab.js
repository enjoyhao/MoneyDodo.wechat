// components/mini-tab/mini-tab.js
Component({
  /**
   * 组件选项
   */
  options: {
    multipleSlots: true, /*使组件支持多个slot，并以name来区分slot*/
  },
  /**
   * Component properties
   */
  properties: {
    tabs: {
      type: Array,
      value: ['tab1', 'tab2', 'tab3']
    },
    current: {
      type: Number,
      value: 0
    }
  },

  /**
   * Component initial data
   */
  data: {

  },

  /**
   * Component methods
   */
  methods: {
    // 点击tab切换时触发该函数
    switchTab (e) {
      console.log(e)
      console.log(Number(e.currentTarget.id))
      this.setData({
        current: Number(e.currentTarget.id)
      })
    },
    tabChange (e) {
      console.log(e)
      this.setData({
        current: Number(e.detail.current)
      })
    }
  }
})
