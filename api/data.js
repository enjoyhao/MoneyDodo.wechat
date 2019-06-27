import config from './config'
import store from '../store/store'

const users = ['oKcHm5cv6nl3iPXyO6rQMzD84L-E', 'oKcHm5YAXnDySWkn-JUsAdKSzA0U', 'oKcHm5YKutapWnFeEbAMcmcjwhYc','oKcHm5RuJM1ETLgI8FwJZDOCvggY']
const delivery_titles = ['快递有点重','天桥下申通快递','啊啊啊求帮忙']
const delivery_detail = ['蜂巢13号','蜂巢10号','蜂巢1号','蜂巢2号','蜂巢11号','蜂巢8号','明六申通快递']

const source = {
  'delivery': {
    titles: ['快递有点重', '天桥下申通快递', '啊啊啊求帮忙'],
    detail: ['蜂巢13号', '蜂巢10号', '蜂巢1号', '蜂巢2号', '蜂巢11号', '蜂巢8号', '明六申通快递']
  },
  'recruit': {
    titles: ['自强社招新','数据院学生会招新','蓝信封大使招募','义教队伍招募'],
    detail: ['报名截止20号','赶快投递吧！！！','福利多多等你来']
  }
}

const qtnr_tasks = [{
  id: '',
  kind: config.TASK_KIND_QUESTIONNAIRE,
  publisher: store.data.openId || '',
  restrain: '仅限男生',
  pubdate: '2019-05-14T12:00:00Z',
  cutoff: '2019-05-20T12:00:00Z',
  reward: 10,
  state: config.TASK_STATE_NON_RELEASED
}]

const basic_tasks = {
  delivery: {
    id: '',
    kind: config.TASK_KIND_DELIVERY,
    publisher: users[0],
    title: '',
    restrain: '仅限男生',
    pubdate: '2019-06-24T12:00:00Z',
    cutoff: '2019-06-24T13:00:00Z',
    reward: 10,
    state: config.TASK_STATE_RELEASED
  },
  recruit: {
    id: '',
    kind: config.TASK_KIND_RECRUIT,
    publisher: users[0],
    title: '',
    restrain: '仅限男生',
    pubdate: '2019-06-25T12:00:00Z',
    cutoff: '2019-07-25T13:00:00Z',
    reward: 10,
    state: config.TASK_STATE_RELEASED
  }
}

function gen_tasks(type, count, offset) {
  let num_user = users.length
  let tasks = new Array(count).fill({})
  tasks = tasks.map((item, i) => {
    let task = {...basic_tasks[type]};
    task.id = offset + i;
    let index = (Math.floor(Math.random() * 100)) % num_user
    task.publisher = users[index]
    index = (Math.floor(Math.random() * 100)) % num_user
    task.title = source[type].titles[index]
    index = (Math.floor(Math.random() * 100)) % num_user
    task.restrain = source[type].detail[index]
    task.reward = Math.floor(Math.random() * 10)
    return task
  })
  return tasks
}

const recruit_tasks = [{
  id: '',
  kind: config.TASK_KIND_RECRUIT,
  publisher: store.data.openId || '',
  title: '',
  restrain: '仅限男生',
  pubdate: '2019-05-14T12:00:00Z',
  cutoff: '2019-05-20T12:00:00Z',
  reward: 10,
  state: config.TASK_STATE_NON_RELEASED
}]

export default {
  d_tasks: gen_tasks('delivery', 20, 100),
  r_tasks: gen_tasks('recruit', 20, 200)
}