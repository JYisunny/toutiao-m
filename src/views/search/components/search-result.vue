<template>
  <div class="search-result">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      :error.sync="error"
      error-text="请求失败，点击重新加载"
      @load="onLoad"
    >
      <van-cell
        v-for="(article, index) in list"
        :key="index"
        :title="article.title" />
    </van-list>
  </div>
</template>

<script>
import { getSearchResult } from '@/api/search'

export default {
  name: 'SearchResult',
  data () {
    return {
      list: [],
      loading: false,
      error: false,
      finished: false,
      page: 1,
      per_page: 20

    }
  },
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  methods: {
    async onLoad () {
      try {
        // 1. 请求获取数据
        const { data } = await getSearchResult({
          page: this.page, // 页码
          per_page: this.per_page, // 每页每页数量
          q: this.searchText // 搜索关键词
        })
        // 模拟随机失败的情况
        // if (Math.random() > 0.5) {
        //   JSON.parse('asdsadsadsad')
        // }

        // 2. 将数据添加到数组列表中
        const { results } = data.data
        console.log(results)
        this.list.push(...results)
        // 3. 将本次加载中 loading 关闭
        this.loading = false
        // 4. 判断是否还有数据
        if (results.length) {
        //    如果有，则更新获取下一页数据的页码
          this.page++
        } else {
        //    没有，  则将加载状态设置为 finished 结束
          this.finished = true
        }
      } catch (error) {
        // 展示加载失败的提示状态
        this.error = true
        // 加载失败， loading 也要关闭
        this.loading = false
        this.$toast('数据获取失败，请稍后重试')
      }
    }
  }
}
</script>

<style lang="less" scoped>
</style>
