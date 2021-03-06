<template>
  <div class="c-comments">
    <div class="c-comments-title g-card-container mdui-typo">
      <h2>评论</h2>
      <div class="mdui-textfield mdui-textfield-floating-label">
        <label class="mdui-textfield-label">说点什么</label>
        <textarea class="mdui-textfield-input" v-model.trim="commentsVal"></textarea>
      </div>
      <button :disabled="!commentsVal" style="float: right" class="mdui-btn mdui-btn-raised mdui-ripple mdui-color-red-900" @click.stop="$emit('get-comments-val', commentsVal)">发送评论</button>
    </div>
    <!-- 热门 -->
    <div class="c-comments-hot g-card-container mdui-text-color-red-900" v-if="hotCommentsDetail.length !== 0">热门评论</div>
    <div class="c-comments-container g-card-container" v-if="hotCommentsDetail.length !== 0">
      <div class="comments-item" v-for="item in hotCommentsDetail" :key="item">
        <div class="mdui-typo">
          <hr />
        </div>
        <img class="comments-item-img" v-lazy="`${item.useravatar}?param=10y10&quality=30`" />
        <span class="comments-item-user">{{ item.username }}</span>
        <span class="comments-item-time">{{ handleTime(item.time) }}</span>
        <p class="comments-item-comments">{{ item.content }}</p>
        <!-- 回复 -->
        <div v-if="item.replied.username" class="comments-item-beforereplay">
          <p v-if="item.replied.content" class="beforereplay-user">{{ item.replied.username }}</p>
          <p v-if="item.replied.content" class="beforereplay-comments">{{ item.replied.content }}</p>
          <p v-else class="beforereplay-comments">该评论已删除</p>
        </div>
        <!-- 点赞 -->
        <i class="comments-item-replaybtn mdui-icon material-icons">textsms</i>
        <span class="comments-item-likecount">{{ item.likedcount }}</span>
        <i class="comments-item-like mdui-icon material-icons" :class="{ 'mdui-text-color-red-900': item.liked }" @click.stop="$emit('thumb-up', item.commentId)">thumb_up</i>
      </div>
      <div class="mdui-typo">
        <hr />
      </div>
    </div>
    <!-- 最新 -->
    <div v-if="commentsDetail.length !== 0" class="c-comments-new g-card-container mdui-text-color-red-900">最新评论</div>
    <div v-if="commentsDetail.length !== 0" class="c-comments-container g-card-container">
      <div class="comments-item" v-for="item in commentsDetail" :key="item">
        <div class="mdui-typo">
          <hr />
        </div>
        <img class="comments-item-img" v-lazy="item.useravatar" />
        <span class="comments-item-user">{{ item.username }}</span>
        <span class="comments-item-time">{{ handleTime(item.time) }}</span>
        <p class="comments-item-comments">{{ item.content }}</p>
        <!-- 回复 -->
        <div v-if="item.replied.username" class="comments-item-beforereplay">
          <p v-if="item.replied.content" class="beforereplay-user">{{ item.replied.username }}</p>
          <p v-if="item.replied.content" class="beforereplay-comments">{{ item.replied.content }}</p>
          <p v-else class="beforereplay-comments">该评论已删除</p>
        </div>
        <!-- 点赞 -->
        <i class="comments-item-replaybtn mdui-icon material-icons">textsms</i>
        <span class="comments-item-likecount">{{ item.likedcount }}</span>
        <i class="comments-item-like mdui-icon material-icons" :class="{ 'mdui-text-color-red-900': item.liked }" @click.stop="$emit('thumb-up', item.commentId)">thumb_up</i>
      </div>

      <div class="mdui-typo">
        <hr />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue'
import { handleTime } from '../utils/time'
import { commentsInt } from '../type/comments.type'
export default defineComponent({
  name: 'Comments',
  props: {
    commentsDetail: Object as PropType<Array<commentsInt>>,
    hotCommentsDetail: Object as PropType<Array<commentsInt>>
  },
  emits: ['get-comments-val', 'thumb-up'],
  setup() {
    const commentsVal = ref('')

    return {
      handleTime,
      commentsVal
    }
  }
})
</script>

<style lang="less" scoped>
.c-comments {
  overflow: hidden;
}
.c-comments-title {
  margin: 100px auto 80px auto;
}
.c-comments-hot {
  margin: 50px auto;
}

.c-comments-new {
  margin: 50px auto;
}

.c-comments-container {
  margin: 50px auto;
  .comments-item {
    width: 100%;
    overflow: hidden;
    .comments-item-img {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      margin-left: 20px;
      margin-top: 10px;
      vertical-align: middle;
      box-sizing: border-box;
      border: 1px solid rgba(0, 0, 0, 0.12);
    }
    .comments-item-user {
      position: absolute;
      margin-left: 10px;
      margin-top: 16px;
      font-size: 0.7em;
    }
    .comments-item-time {
      float: right;
      margin-right: 20px;
      margin-top: 16px;
      font-size: 0.7em;
    }
    .comments-item-comments {
      font-size: 0.85em;
      line-height: 30px;
      margin: 0px 200px 0px 60px;
    }
    .comments-item-replaybtn {
      margin-right: 20px;
      font-size: 0.8em;
      line-height: 16px;
      float: right;
      position: relative;
      opacity: 0.7;
    }
    .comments-item-likecount {
      margin-right: 100px;
      font-size: 0.8em;
      line-height: 16px;
      float: right;
      opacity: 0.7;
    }
    .comments-item-like {
      margin-right: 10px;
      font-size: 0.8em;
      line-height: 16px;
      float: right;
      opacity: 0.7;
      cursor: pointer;
    }
    .comments-item-beforereplay {
      background-color: rgba(0, 0, 0, 0.12);
      margin: 8px 280px -10px 110px;
      overflow: hidden;
      .beforereplay-user {
        font-size: 0.65em;
        margin: 5px 0px 0px 8px;
      }
      .beforereplay-comments {
        font-size: 0.75em;
        margin: 5px 0px 5px 8px;
        color: rgba(0, 0, 0, 0.7);
        line-height: 23px;
      }
    }
  }
}
</style>
