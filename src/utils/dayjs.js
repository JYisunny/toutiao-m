import Vue from 'vue'
import dayjs from 'dayjs'

// 加载中文语言包
import 'dayjs/locale/zh-cn'

// 加载相对时间插件
import relativeTime from 'dayjs/plugin/relativeTime'
// dayjs 默认语言是英文， 我们需要配置为中文
dayjs.locale('zh-cn')

// 配置使用处理相对时间 relativeTime 插件
dayjs.extend(relativeTime)

// 定义一个全局过滤器，然后就可以在任何组件的模板中使用
// 其实过滤器就相当于一个全局可用的方法 (仅模板使用)
// 参数1: 过滤器 名称
// 参数2: 过滤器 函数
// 使用方式: {{ 表达式 | 过滤器名称 }}
// 管道符前面的表达式的结果会作为参数传递到过滤器中
// 过滤器的返回值会渲染到使用过滤器的模板位置
Vue.filter('relativeTime', value => {
  // console.log(value);
  return dayjs().to(dayjs(value))
})

// dayjs() 获取当前最新时间
// console.log(dayjs().format('YYYY-MM-DD '));

// console.log(dayjs().from(dayjs('1990-01-01'))) // 32 年内
// console.log(dayjs().from(dayjs('1990-01-01'), true)) // 32 年
// console.log(dayjs().fromNow()) // 几秒前
// console.log(dayjs().to(dayjs('1990-01-01'))) // 32 年前
// console.log(dayjs().toNow()) // 几秒前
