<template>
  <div class="update-name">
      <!-- 导航栏 -->
      <van-nav-bar
        title="设置昵称"
        left-text="取消"
        right-text="完成"
        @click-left="$emit('close')"
        @click-right="onConfirm"
      />
      <!-- /导航栏 -->

      <!-- 输入框 -->
      <div class="field-wrap">
        <van-field
          v-model.trim="loaclName"
          rows="2"
          autosize
          type="textarea"
          maxlength="7"
          placeholder="请输入昵称"
          show-word-limit
        />
      </div>
      <!-- /输入框 -->
  </div>
</template>

<script>
import { updateUserProfile } from '@/api/user'

export default {
  name: 'UpdateName',
  data () {
    return {
      loaclName: this.value
    }
  },
  props: {
    value: {
      type: String,
      required: true
    }
  },
  methods: {
    async onConfirm () {
      this.$toast({
        message: '更新中...',
        forbidClick: true, // 禁用背景点击
        duration: 0 // 持续展示
      })
      try {
        const loaclName = this.loaclName
        if (!loaclName) {
          this.$toast('昵称不能为空')
          return
        }
        await updateUserProfile({
          name: loaclName
        })
        // 更新视图
        this.$emit('input', loaclName)
        // 关闭弹层
        this.$emit('close')
        // 提示成功
        this.$toast.success('更新成功')
      } catch (error) {
        this.$toast.fail('更新失败')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.field-wrap {
    padding: 10px;
}
</style>
