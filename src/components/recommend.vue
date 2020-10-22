<template>
  <div class="c-hot-recommend">
    <div class="recommend-playlist">
      <!-- 分割线 -->
      <div class="mdui-typo">
        <hr />
      </div>
      <span class="recommend-title mdui-text-color-red-900">{{ topTitle }}</span>
      <div class="recommend-hot-chip mdui-chip" v-for="(item, index) in topList" :class="{ 'mdui-color-red-900': index === listIndex }" :key="item.id" @click="handleListSwitch(item, index)">
        <span class="mdui-chip-title">{{ item.name }}</span>
      </div>
      <!-- 右侧插槽 -->
      <slot></slot>

      <!-- 分割线 -->
      <div class="mdui-typo">
        <hr />
      </div>
    </div>
    <div style="width:100%;height:380px">
      <transition name="fade" mode="out-in">
        <div v-if="toggleCoverShow" class="recommend-card-cover">
          <div class="recommend-card-inner"></div>
        </div>
        <div v-else class="recommend-card">
          <div class="recommend-card-item">
            <div class="recommend-card-item-container" :style="{ left: cardItemContainerLeft }">
              <div class="recommend-card-list mdui-card mdui-hoverable" v-for="item in cardList" :key="item.id">
                <card :item="item"></card>
              </div>
            </div>
          </div>
          <button v-if="arrowShow" class="recommend-card-arrow-left mdui-fab mdui-color-red-900 mdui-ripple" @click="handleCardItemContainerLeft">
            <i class="mdui-icon material-icons">chevron_left</i>
          </button>
          <button v-else class="recommend-card-arrow-right mdui-fab mdui-color-red-900 mdui-ripple" @click="handleCardItemContainerRight">
            <i class="mdui-icon material-icons">chevron_right</i>
          </button>
        </div>
      </transition>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch } from 'vue'

import Card from './card.vue'

import mdui from 'mdui'

export default defineComponent({
  props: {
    cardList: Array,
    topList: Array,

    topTitle: String,
    activeIndex: {
      type: Number,
      default: 0
    }
  },
  components: {
    Card
  },
  setup(props, { emit }) {
    const cardItemContainerLeft = ref('0px')
    const arrowShow = ref(false)

    const listIndex = ref(props.activeIndex)

    const toggleCoverShow = ref(true)

    const handleCardItemContainerLeft: () => void = () => {
      if (cardItemContainerLeft.value === '0px') {
        return
      }
      arrowShow.value = !arrowShow.value

      cardItemContainerLeft.value = '0px'
    }

    const handleCardItemContainerRight: () => void = () => {
      if (cardItemContainerLeft.value === '-670px') {
        return
      }
      arrowShow.value = !arrowShow.value

      cardItemContainerLeft.value = '-670px'
    }

    const handleListSwitch: (one: object, two: number) => void = (obj, index) => {
      if (listIndex.value === index) {
        return
      }
      toggleCoverShow.value = true

      listIndex.value = index

      // 抛出点击按钮的歌曲/歌单id
      emit('getid', obj)
    }

    watch(
      () => {
        return props.cardList
      },
      () => {
        toggleCoverShow.value = false
      },
      { deep: true }
    )

    onMounted(() => {
      mdui.mutation()
    })
    return {
      toggleCoverShow,
      arrowShow,
      cardItemContainerLeft,
      handleCardItemContainerLeft,
      handleCardItemContainerRight,
      listIndex,
      handleListSwitch
    }
  }
})
</script>

<style lang="less" scoped>
.c-hot-recommend {
  width: 100%;
  .recommend-playlist {
    width: 1400px;
    min-height: 82px;
    margin: 0 auto;
    .recommend-title {
      font-size: 24px;
      vertical-align: -4px;
      margin-left: 10px;
      margin-right: 20px;
      font-weight: 600;
      letter-spacing: 2px;
    }

    .recommend-hot-chip {
      margin: 20px 10px 8px;
    }
  }

  .recommend-card-cover {
    width: 1400px;
    height: 380px;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
    .recommend-card-inner {
      height: 100px;
      width: 100px;
    }
  }

  .recommend-card {
    width: 100%;
    height: 380px;
    position: relative;

    .recommend-card-item {
      position: relative;
      height: 380px;
      width: 1400px;
      margin: 0 auto;
      overflow-x: hidden;
      .recommend-card-item-container {
        position: absolute;
        top: 0px;
        height: 100%;
        width: 9999px;
        transition: left 0.5s ease-in-out;
        .recommend-card-list {
          display: inline-block;
          width: 225px;
          margin: 35px 25px 0px 10px;
        }
      }
    }
    .recommend-card-arrow-left {
      position: absolute;
      left: calc((100% - 1400px) / 2);
      top: 50%;
      transform: translate(-50%, -126%);
    }
    .recommend-card-arrow-right {
      position: absolute;
      right: calc((100% - 1400px) / 2);
      top: 50%;
      transform: translate(50%, -126%);
    }
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>