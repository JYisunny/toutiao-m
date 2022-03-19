import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// 路由表
const routes = [{
  path: '/login',
  name: 'login',
  component: () =>
    import('@/views/login')
}, {
  path: '/',
  // name: 'layout', // 如果父路由有默认子路由，那它的 name 没有意义
  component: () =>
    import('@/views/layout'),
  children: [{
    path: '', // 默认子路由，只能有一个
    name: 'home',
    component: () =>
      import('@/views/home')
  }, {
    path: '/qa',
    name: 'qa',
    component: () =>
      import('@/views/qa')
  }, {
    path: '/video',
    name: 'video',
    component: () =>
      import('@/views/video')
  }, {
    path: '/my',
    name: 'my',
    component: () =>
      import('@/views/my')
  }]
}, {
  path: '/search',
  name: 'search',
  component: () =>
    import('@/views/search')
}, {
  path: '/article/:articleId',
  name: 'article',
  component: () =>
    import('@/views/article'),
  props: true // 开启 Props 传参，就是把路由参数映射到组件的 props 数据中
}, {
  path: '/user/profile',
  name: 'user-profile',
  component: () =>
    import('@/views/user-profile')
}]

const router = new VueRouter({
  routes
})

export default router
