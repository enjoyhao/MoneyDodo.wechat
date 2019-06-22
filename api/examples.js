/**
 * 本文件包含一些用于测试的实例数据
 */
import config from './config'
import store from '../store/store'

const tasks = [{
  id: '',
  kind: config.TASK_KIND_QUESTIONNAIRE,
  publisher: store.data.openId || '',
  restrain: '仅限男生',
  pubdate: '2019-05-14T12:00:00Z',
  cutoff: '2019-05-20T12:00:00Z',
  reward: 10,
  state: config.TASK_STATE_NON_RELEASED
}]

const querys = [
  {
    question: '你的年龄？',
    answer: ''
  },
  {
    question: '你的身高？',
    answer: ''
  }
]

const singleChoices = [
  {
    question: '你是否对该app满意',
    choices: ['满意','一般','不满意'],
    answer: []
  }, 
  {
    question: '你是否对使用过该app',
    choices: ['经常', '偶尔','没有'],
    answer: []
  }
]

const multipleChoices = [
  {
    question: '你有以下哪些需求',
    choices: ['代取快递', '代取外卖', '问卷调查'],
    answer: []
  },
  {
    question: '你对哪些任务感兴趣',
    choices: ['代取快递', '代取外卖', '问卷调查'],
    answer: []
  }
]

const questionnaires = [{
  taskId: '',
  query: querys,
  singleChoice: singleChoices,
  /* 后端字段拼写错误，这里将错就错，将字段名设置为mutipleChoice*/
  mutipleChoice: multipleChoices,
}]

export default {
  tasks: tasks,
  questionnaires: questionnaires
}