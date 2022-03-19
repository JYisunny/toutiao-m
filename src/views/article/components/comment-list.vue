<template>
<!-- 只有 List 在可视范围内，才会检查滚动位置触发 onLoad -->
  <van-list
    v-model="loading"
    :finished="finished"
    finished-text="没有更多了"
    :error="error"
    error-text="加载失败，请点击重试"
    :immediate-check="false"
    @load="onLoad"
  >
    <CommentItem
      v-for="(item, index) in list"
      :key="index"
      :comment="item"
      @reply-click="$emit('reply-click', $event)"
    />
  </van-list>
</template>

<script>
import { getComments } from '@/api/comments'
import CommentItem from './comment-item'

export default {
  name: 'CommentList',
  data () {
    return {
      // list: [],
      loading: false,
      finished: false,
      offset: null, // 获取下一页数据的标记
      limit: 10,
      error: false
    }
  },
  props: {
    source: {
      type: [Number, String, Object],
      required: true
    },
    list: {
      type: Array,
      // default: {} / [] // vue 中 默认值 这样格式是错的
      default: () => []
    },
    type: {
      type: String,
      // 自定义 Prop 数据验证
      Validator (value) {
        return ['a', 'c'].includes(value)
      },
      default: 'a'
    }
  },
  components: {
    CommentItem
  },
  created () {
    // 手动初始 onLoad 的话，它不会自动开始初始的 loading，则需手动开启初始 loading
    this.loading = true
    this.onLoad()
  },
  methods: {
    async onLoad () {
      try {
        // 获取文章的评论和获取评论的回复是同一个接口
        // 唯一的区别: 接口参数不一样
        //    type      a-对文章(article)的评论，c-对评论(comment)的回复
        //    source    文章id或评论id
        // 1. 请求获取数据
        const { data } = await getComments({
          type: this.type, // 评论类型，a-对文章(article)的评论，c-对评论(comment)的回复
          source: this.source, // 源id，文章id或评论id
          offset: this.offset, // 获取评论数据的偏移量，值为评论id，表示从此id的数据向后取，不传表示从第一页开始读取数据
          limit: this.limit // 获取的评论数据个数，不传表示采用后端服务设定的默认每页数据量
        })
        // 2. 将数据添加到列表中
        const { results } = data.data
        this.list.push(...results)

        // 把文章评论的总数量传递到外部
        this.$emit('onload-success', data.data)

        // 3. 将 loading 设置为 false
        this.loading = false

        // 4. 判断是否还有数据
        if (results.length) {
          // 有，更新获取下一页
          this.offset = data.data.last_id
        } else {
          // 无，将 finished 设置结束
          this.finished = true
        }
      } catch (error) {
        this.error = true
        this.loading = false
      }
    }
  }
}
</script>

<style lang="less" scoped>
</style>
