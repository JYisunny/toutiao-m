// postcss.config.js
module.exports = {
  // 配置要使用的 PostCSS插件
  plugins: {
    // 配置使用 自动生成浏览器 ·CSS·样式规则前缀
    // VueCLI 内部已经配置了 autoprefixer 插件
    // 这里又配置了一次，所以产生了冲突
    // 'autoprefixer': {
    //     // 配置要兼容到的环境信息
    //     browser: ['Android >=4.0', 'iOS >=8']
    // },

    'postcss-pxtorem': {
      // lib-fiexible 的 REM 适配方案: 把一行分为 10 份，每份就是37.5
      // 所有 rootValue 应该设置为你的设计稿宽度的 十分之一
      // 我们的设计稿是 750，所有应该设置为 75
      // 但是 Vant 建议设置为37.5, 因为 Vant 是基于375 写的
      // 所有必须设置为37.5, 唯一的缺点就是 使用我们的设计稿的尺寸都 必须 /2
      // 即：     如果是 Vant 的样式，就按照 37.5 来转换
      //          如果是 我们自己的样式，就按照  75  来转换
      // 通过查阅文档, 发现 rootValue 支持两种类型：
      //    数字: 固定的数值
      //    函数: 可以动态处理返回
      //         PostCSS 处理每个  CSS 文件的时候都会调用这个函数
      //         它会把被处理的 CSS 文件相关的信息通过参数传递给该函数
      rootValue ({ file }) {
        return file.indexOf('vant') !== -1 ? 37.5 : 75
      },

      // rootValue: 75,

      // 配置要转换的 CSS 属性
      // * 表示 所有 还可propList: ['height'] -> 只转换 高
      propList: ['*'],
      // 配置不要转换的样式资源
      exclude: 'github-markdown'
    }
  }
}
