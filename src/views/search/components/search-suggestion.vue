<template>
  <div class="search-suggestion">
    <van-cell
     v-for="(text, index) in suggestions"
     :key="index"
     icon="search"
     @click="$emit('search', text)"
     >
     <div slot="title" v-html="highlight(text)"></div>
     </van-cell>
     <!-- 双花括号会直接输出纯文本内容 -->
     <!-- <div>{{ htmlStr }}</div> -->

     <!-- 使用v-html 指令可以绑定渲染带有 HTML 标签的字符串 -->
     <!-- <div v-html="htmlStr"></div> -->
  </div>
</template>

<script>
import { getSearchSuggestions } from '@/api/search'
// 按需加载好处: 只会把使用到的成员打包到结果中
import { debounce } from 'lodash'

export default {
  name: 'SearchSuggestion',
  data () {
    return {
      suggestions: [] // 联想建议数据列表
      // htmlStr: 'Hello <span style="color: red"></span>'
    }
  },
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  watch: {
    searchText: {
      // 当searchText 发生改变时，就会调用 handler 函数
      // 注意: handler 函数名称是固定的
      // handler (value) {
      //   this.loadSearchSuggestions (value)
      // },
      // debounce 函数 参数1: 一个函数 参数2: 延迟时间 返回值: 防抖之后的函数
      handler: debounce(function (value) {
        this.loadSearchSuggestions(value)
      }, 1000),
      immediate: true // 该回调将会在侦听开始之后被立即调用
    }
  },
  methods: {
    async loadSearchSuggestions (q) {
      try {
        const { data } = await getSearchSuggestions(q)
        this.suggestions = data.data.options
      } catch (error) {
        this.$toast('数据获取失败，请稍后重试')
      }
    },
    highlight (text) {
      const highlightStr = `<span class="active">${this.searchText}</span>`

      // 正则表达式  // 中间内容都会当做匹配字符来使用， 而不是数据变量
      // 如果需要根据数据变量动态的创建正则表达式，则手动 new RegExp
      // RegExp 正则表达式构造函数  参数1: 匹配模式字符串 参数2: 匹配模式，要写到字符串中
      const reg = new RegExp(this.searchText, 'gi') // 全局匹配部分大小写
      return text.replace(reg, highlightStr)
    }
  }
}
</script>

<style lang="less" scoped>
  .search-suggestion {
    /deep/ span.active {
      color: #3296fa;
    }
  }
</style>
