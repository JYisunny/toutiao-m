<template>
    <van-button
      v-if="value"
      class="follow-btn"
      round
      :loading="loading"
      size="small"
      @click="onFollow"
      >已关注</van-button
    >
    <van-button
      v-else
      class="follow-btn"
      type="info"
      color="#3296fa"
      round
      :loading="loading"
      size="small"
      icon="plus"
      @click="onFollow"
      >关注</van-button
    >
</template>

<script>
import { addFollow, deleteFollow } from '@/api/user'

export default {
  name: 'FollowUser',
  props: {
    value: {
      type: Boolean,
      required: true
    },
    userId: {
      type: [Number, String, Object],
      required: true
    }
  },
  data () {
    return {
      loading: false
    }
  },
  methods: {
    async onFollow () {
      this.loading = true // 展示关注按钮的 loading 状态
      try {
        if (this.value) { // 已关注，取消关注
          await deleteFollow(this.userId)
          // this.value     = false
        } else { // 未关注， 添加关注
          await addFollow(this.userId)
          // this.value = true
        }
        // 更新视图状态
        // this.article.is_followed = !this.article.is_followed
        this.$emit('input', !this.value)
        // this.$emit('update-is_followed', !this.value)
      } catch (error) {
        let message = '操作失败，请重试'
        if (error.response && error.response.status === 400) {
          message = '你不能关注你自己！'
        }
        this.$toast(message)
        console.log(error)
      }
      this.loading = false // 无论关注成功与否，均关闭 loading
    }
  }
}
</script>

<style lang="less" scoped>
</style>
