/**
 * 请求模块
 */
import axios from 'axios'
import store from '@/store'
import JSONBig from 'json-bigint'

/* const jsonStr = '{ "art_id": 1245953273786007552 }'
console.log(JSON.parse(jsonStr)); // {art_id: 1245953273786007600}

// JSONBig  可以处理数据中超出 JavaScript 安全整数范围的问题
console.log(JSONBig.parse(jsonStr)); // {art_id: BigNumber}

// JSONBig.parse()     // 把 JSON 格式的字符串  转为 JavaScript 对象
console.log(JSONBig.parse(jsonStr).art_id.toString()); // 1245953273786007552

// JSONBig.stringify() // 把 JavaScript 对象    转为 JSON 格式的字符串
console.log(JSON.stringify(JSONBig.parse(jsonStr))); // {"art_id":"1245953273786007552"} ==> 字符串
console.log(JSONBig.stringify(JSONBig.parse(jsonStr))); //{"art_id":1245953273786007552}==>JSON格式字符串 */

const request = axios.create({
  baseURL: 'http://toutiao.itheima.net', // 接口的基础路径
  // 自定义后端返回的数据 `transformResponse` 在传递给 then/catch 前，允许修改响应数据
  // data: 后端返回的原始数据, 就是 JSON 格式的字符串
  transformResponse: [function (data) {
    try {
      return JSONBig.parse(data)
    } catch (error) {
      return data
    }
    // axios 默认会在内部处理后端返回的数据
    // return data ==> return JSON.parse(data)
  }]
})

// 添加请求拦截器
request.interceptors.request.use(function (config) {
  // 在发送请求(请求发起会经过这里)之前做些什么
  // config 配置对象: 本次请求的请求配置对象
  const { user } = store.state
  if (user && user.token) {
    config.headers.Authorization = `Bearer ${user.token}`
  }

  // 注意: 这里务必返回 config 配置对象，否则请求就停在这里出不去了
  return config
}, function (error) {
  // 对请求错误做些什么(请求还没有发出去,会经过这里)
  return Promise.reject(error)
})

// 响应拦截器

export default request
