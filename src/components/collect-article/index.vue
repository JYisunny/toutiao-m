<template>
  <van-button
    :icon="value ? 'star' : 'star-o'"
    :class="{collected: value}"
    :loading="loading"
    @click="onCollect" />
</template>

<script>
import { addCollect, deleteCollect } from '@/api/article'

export default {
  name: 'CollectArticle',
  data () {
    return {
      loading: false
    }
  },
  props: {
    value: {
      type: Boolean,
      required: true
    },
    articleId: {
      type: [Number, String, Object],
      required: true
    }
  },
  methods: {
    async onCollect () {
      this.loading = true
      try {
        if (this.value) { // 以收藏，则取消收藏
          await deleteCollect(this.articleId)
        } else { // 未收藏，则添加收藏
          await addCollect(this.articleId)
        }

        // 更新视图
        this.$emit('input', !this.value)
        this.$toast.success(!this.value ? '收藏成功' : '取消收藏')
      } catch (error) {
        this.$toast('操作失败，请重试')
      }
      this.loading = false
    }
  }
}
</script>

<style lang="less" scoped>
    .collected {
        .van-icon {
            color: #ffa500
        }
    }
</style>
