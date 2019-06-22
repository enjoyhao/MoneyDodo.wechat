// components/card/card.js
import { link } from '../../mixins/link'

Component({
  /**
   * Component properties
   */
  mixins: [link],
  properties: {
    url: String,
    linkType: {
      type: String,
      value: 'navigateTo'
    },
    title: {
      type: String,
      value: '标题'
    },
    background: {
      type: String,
      value: 'green'
    },
    detail: {
      type: String,
      value: '任务详情'
    },
    beginDate: {
      type: String,
      value: '2019-01-01 12:00'
    },
    dueDate: {
      type: String,
      value: '2019-01-01 12:00'
    },
    publisher: {
      type: String,
      value: '发布者'
    },
    reward: {
      type: Number,
      value: 1.0
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
    jumpLink(urlKey = 'url') {
      const url = this.data[urlKey]
      console.log(url)
      if (url) {
        wx[this.data.linkType]({ url })
      }
    },
    /**
    * 点击该组件时触发，完成跳转
    */
    onTap(e) {
      //console.log(this.methods.jumpLink)
      console.log(this.jumpLink)
      this.jumpLink()
    } 
  }
})
