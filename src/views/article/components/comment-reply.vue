<template>
  <div class="comment-reply">
        <van-nav-bar
          :title="comment.reply_count > 0 ? `${comment.reply_count}条回复` : '暂无回复'"
        >
        <van-icon slot="left" name="cross" @click="$emit('close')" />
        </van-nav-bar>

        <div class="scroll-wrap">
        <!-- 当前评论项 -->
        <comment-item :comment="comment" />
        <!-- /当前评论项 -->

        <!-- 评论的回复列表 -->
        <van-cell title="全部回复" />
        <comment-list :list="commentList" :source="comment.com_id" type="c" />
        <!-- /评论的回复列表 -->
        </div>

        <!-- 发布评论 -->
        <div class="post-wrap">
          <van-button class="write-btn" size="small" round @click="isPostShow=true">写评论</van-button>
        </div>
        <!-- /发布评论 -->

        <!-- 评论弹出层 -->
        <van-popup v-model="isPostShow" position="bottom">
          <comment-post
            :target="comment.com_id"
            @post-success="onPostSuccess"
          />
        </van-popup>
        <!-- /评论弹出层 -->
  </div>
</template>

<script>
import CommentItem from './comment-item'
import CommentList from './comment-list'
import CommentPost from './comment-post'

export default {
  data () {
    return {
      isPostShow: false,
      commentList: [] // 评论的回复列表
    }
  },
  props: {
    comment: {
      type: Object,
      required: true
    }
  },
  components: {
    CommentItem,
    CommentList,
    CommentPost
  },
  methods: {
    onPostSuccess (data) {
      // 更新回复的数量
      this.comment.reply_count++
      // 关闭弹层
      this.isPostShow = false
      // 将最新回复内容展示到列表顶部
      this.commentList.unshift(data.new_obj)
    }
  }
}
</script>

<style lang="less" scoped>
.scroll-wrap {
  position: fixed;
  top: 92px;
  left: 0;
  right: 0;
  bottom: 88px;
  overflow-y: auto;
}
.post-wrap {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 88px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  border-top: 1px solid #d8d8d8;
  .write-btn {
    width: 60%;
  }
}
</style>
