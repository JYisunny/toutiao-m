<template>
  <div class="article-list">
    <van-pull-refresh
      v-model="isRefreshLoading"
      :success-text="refreshSuccessText"
      success-duration="1500"
      @refresh="onRefresh"
    >
      <van-list
        v-model="loading"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <!-- <van-cell
          v-for="article in list"
          :key="article.id"
          :title="article.title"
        /> -->
        <ArticleItem
          v-for="article in list"
          :key="article.id"
          :article="article"
        />
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticles } from '@/api/article'
import ArticleItem from '@/components/article-item'

export default {
  name: 'ArticleList',
  data () {
    return {
      list: [], // 存储列表数据的数组
      loading: false, // 控制加载中 loading 状态
      finished: false, // 控制数据加载结束状态
      timestamp: null, // 请求获取下一页的时间戳
      error: false, // 控制列表加载失败的提示状态
      isRefreshLoading: false, // 控制下拉刷新的 loading 状态
      refreshSuccessText: '刷新成功' // 下拉刷新成功提示文本
    }
  },
  components: {
    ArticleItem
  },
  props: {
    channel: {
      type: Object,
      required: true
    }
  },
  methods: {
    // 初始化或滚动到底部的时候会触发调用 onLoad
    async onLoad () {
      // 1. 请求获取数据 异步更新数据
      try {
        const { data } = await getArticles({
          channel_id: this.channel.id, // 频道ID
          // timestamp 简单理解就是请求数据的页码
          // 请求第1 页数据：当前最新时间戳
          // 用于请求之后数据的时间戳会在当前请求结果中返回给你
          timestamp: this.timestamp || Date.now()
        })

        // 模拟随机失败的情况
        // if (Math.random() > 0.5) {
        //   JSON.parse('asdsadsadsad')
        // }

        const { results } = data.data
        this.list.push(...results) // 数组的展开操作符

        // 2. 加载状态结束
        //    loading 关闭以后才能触发下一次的加载更多
        this.loading = false

        // 3. 判断数据是否全部加载完成
        if (results.length) {
          // 更新获取下一页数据的时间戳
          this.timestamp = data.data.pre_timestamp
        } else {
          // 没有数据了，讲 finished 设置为 true， 不在 load 加载更多了
          this.finished = true
        }
      } catch (err) {
        // 展示错误提示状态
        this.error = true

        // 请求失败了，loading 也需要关闭
        this.loading = false
      }
    },

    // 当下拉刷新的时候会触发调用该函数
    async onRefresh () {
      try {
        // 1. 请求获取数据
        const { data } = await getArticles({
          channel_id: this.channel.id, // 频道ID
          // 下拉刷新，每次请求获取最新数据，所以传递当前最新时间戳
          timestamp: Date.now()
        })

        // 模拟随机失败的情况
        // if (Math.random() > 0.5) {
        //   JSON.parse('asdsadsadsad')
        // }

        // 2. 将数据追加到列表的顶部
        const { results } = data.data
        this.list.unshift(...results)
        // 3. 关闭下拉刷新的 loading 状态
        this.isRefreshLoading = false

        // 更新下拉刷新成功提示的文本
        this.refreshSuccessText = `刷新成功, 更新了${results.length}条数据`
      } catch (error) {
        this.isRefreshLoading = false
        this.refreshSuccessText = '刷新失败'
      }
    }
  }
}
</script>

<style lang="less" scoped>
.article-list {
  // 百分比单位是相对于父元素的
  // height: 100%;
  height: 79vh;
  overflow-y: auto;
}
</style>
