<template>
  <div class="c-comments-pagination" ref="domContainer">
    <!-- 评论 -->
    <Comments :commentsDetail="commentsDetail" :hotCommentsDetail="hotCommentsDetail" @get-comments-val="getCommentsVal" @thumb-up="thumbUp" />
    <!-- 分页 -->
    <Pagination :pageCount="pageCount" @page-number="pageNumber" />
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { useRoute } from 'vue-router'

import Comments from './comments.vue'
import Pagination from './pagination.vue'

import { commentsInt } from '../type/comments.type'

import request from '../api/index'

export default defineComponent({
  name: 'commentsPagination',
  props: {
    reuqestURL: String
  },
  emits: ['get-comments-val', 'thumb-up'],
  components: {
    Comments,
    Pagination
  },
  setup(prop, { emit }) {
    const route = useRoute()
    const pageCount = ref(0)
    const commentsDetail: Array<commentsInt> = reactive([])
    const hotCommentsDetail: Array<commentsInt> = reactive([])
    const domContainer = ref(null)

    // 加载评论
    const getComments: (id: string, n?: number) => void = async (id, n = 0) => {
      commentsDetail.length = 0
      const { total, comments, hotComments } = await request['httpGET']([prop.reuqestURL], { 'id': id, 'limit': 20, 'offset': n })

      // 热门评论
      if (n === 0) {
        pageCount.value = Math.ceil(total / 20)
        for (let i = 0; i < hotComments.length; i++) {
          hotCommentsDetail[i] = {
            commentId: hotComments[i].commentId,
            username: hotComments[i].user.nickname,
            useravatar: hotComments[i].user.avatarUrl,
            usertype: hotComments[i].user.userType,
            content: hotComments[i].content,
            liked: hotComments[i].liked,
            likedcount: hotComments[i].likedCount,
            time: hotComments[i].time,
            replied: {
              username: hotComments[i].beReplied.length ? hotComments[i].beReplied[0].user.nickname : undefined,
              content: hotComments[i].beReplied.length ? hotComments[i].beReplied[0].content : undefined
            }
          }
        }
      } else {
        hotCommentsDetail.length = 0
      }

      // 最新评论
      for (let i = 0; i < comments.length; i++) {
        commentsDetail[i] = {
          commentId: comments[i].commentId,
          username: comments[i].user.nickname,
          useravatar: comments[i].user.avatarUrl,
          usertype: comments[i].user.userType,
          content: comments[i].content,
          liked: comments[i].liked,
          likedcount: comments[i].likedCount,
          time: comments[i].time,
          replied: {
            username: comments[i].beReplied.length ? comments[i].beReplied[0].user.nickname : undefined,
            content: comments[i].beReplied.length ? comments[i].beReplied[0].content : undefined
          }
        }
      }
    }
    const pageNumber: (n: number) => void = n => {
      typeof route.query.id === 'string' && getComments(route.query.id, 20 * (n - 1))
      window.scrollTo({ top: 0 })
    }

    const getCommentsVal: (v: string) => void = v => {
      emit('get-comments-val', v)
    }
    const thumbUp: (n: number) => void = n => {
      emit('thumb-up', n)
    }
    typeof route.query.id === 'string' && getComments(route.query.id)

    return {
      commentsDetail,
      hotCommentsDetail,
      pageCount,
      getComments,
      pageNumber,
      domContainer,
      getCommentsVal,
      thumbUp
    }
  }
})
</script>
