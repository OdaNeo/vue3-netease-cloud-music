<template>
  <div class="c-hot-recommend">
    <div v-if="topList" class="recommend-playlist">
      <!-- 分割线 -->
      <div class="recommend-typo-top mdui-typo">
        <hr />
      </div>
      <span class="recommend-title mdui-text-color-red-900">{{ topTitle }}</span>
      <div class="recommend-hot-chip mdui-chip" v-for="item in topList" :class="{ 'mdui-color-red-900': item.name === activeName }" :key="item.id" @click="handleListSwitch(item)">
        <span class="mdui-chip-title">{{ item.name }}</span>
      </div>
      <!-- 右侧插槽 -->
      <slot></slot>
      <!-- 分割线 -->
      <div class="recommend-typo-bottom mdui-typo">
        <hr />
      </div>
    </div>
    <div v-if="cardList" class="recommend-card-container" style="width: 100%; height: 350px">
      <div v-show="toggleCoverShow" class="recommend-card-cover">
        <div class="recommend-card-inner mdui-spinner"></div>
      </div>
      <div v-show="!toggleCoverShow" class="recommend-card">
        <div class="recommend-card-item">
          <div class="recommend-card-item-container" :style="{ left: cardItemContainerLeft }">
            <Card v-for="item in cardList" :key="item.id" :item="item" />
          </div>
        </div>
        <button v-show="arrowShow" class="recommend-card-arrow-left mdui-fab mdui-color-red-900 mdui-ripple" @click="handleCardItemContainerLeft">
          <i class="mdui-icon material-icons">chevron_left</i>
        </button>
        <button v-show="!arrowShow" class="recommend-card-arrow-right mdui-fab mdui-color-red-900 mdui-ripple" @click="handleCardItemContainerRight">
          <i class="mdui-icon material-icons">chevron_right</i>
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, PropType, onMounted, computed } from 'vue'
import { topListInt, cardListInt } from '../type/recommend.type'
import Card from './card.vue'
import mdui from 'mdui'

export default defineComponent({
  name: 'Recommend',
  props: {
    cardList: Array as PropType<Array<cardListInt>>,
    topList: Array as PropType<Array<topListInt>>,
    topTitle: String,
    activeName: {
      type: String,
      default: ''
    }
  },
  components: {
    Card
  },
  setup(props, { emit }) {
    const cardItemContainerLeft = ref('0px')
    const arrowShow = ref(false)

    const listName = ref(props.activeName)

    const toggleCoverShow = ref(true)
    const n = ref(0)
    const recommendCardItemWidth = ref(0)

    const diff = computed(() => {
      return 222 * n.value - recommendCardItemWidth.value
    })

    const handleCardItemContainerLeft: () => void = () => {
      if (cardItemContainerLeft.value === '0px') {
        return
      }
      cardItemContainerLeft.value = '0px'
      arrowShow.value = false
    }

    const handleCardItemContainerRight: () => void = () => {
      if (cardItemContainerLeft.value === `-${diff.value}px`) {
        return
      }
      cardItemContainerLeft.value = `-${diff.value}px`
      arrowShow.value = true
    }

    const handleListSwitch: (one: { name: string }) => void = obj => {
      if (props.activeName === '') {
        listName.value = ''
      } else {
        toggleCoverShow.value = true
        listName.value = obj.name
        // 切换后，滑动条归左
        handleCardItemContainerLeft()
      }
      // 抛出点击按钮的歌曲/歌单id
      emit('get-id', obj)
    }

    watch(
      () => {
        return props.cardList
      },
      val => {
        if (val) {
          val.length !== 0 ? ((n.value = val.length), (toggleCoverShow.value = false)) : (toggleCoverShow.value = true)
        }
      },
      { deep: true, immediate: true }
    )
    onMounted(() => {
      mdui.mutation()

      if (props.cardList) {
        const recommendCardItem = document.querySelector('.recommend-card-item') as Element
        recommendCardItemWidth.value = parseInt(window.getComputedStyle(recommendCardItem).getPropertyValue('width'))
      }
    })

    return {
      toggleCoverShow,
      cardItemContainerLeft,
      handleCardItemContainerLeft,
      handleCardItemContainerRight,
      handleListSwitch,
      arrowShow
    }
  }
})
</script>

<style lang="less" scoped>
@media screen and(min-width: 749px) {
  .c-hot-recommend .recommend-playlist {
    width: 1150px;
  }
  .recommend-card-item {
    width: 1150px;
  }
  .recommend-card-arrow-left {
    left: calc((100% - 1150px) / 2);
  }
  .recommend-card-arrow-right {
    right: calc((100% - 1150px) / 2);
  }
}
@media screen and(min-width: 1919px) {
  .c-hot-recommend .recommend-playlist {
    width: 1400px;
  }
  .recommend-card-item {
    width: 1400px;
  }
  .recommend-card-arrow-left {
    left: calc((100% - 1400px) / 2);
  }
  .recommend-card-arrow-right {
    right: calc((100% - 1400px) / 2);
  }
}
@media screen and(min-width: 2398px) {
  .c-hot-recommend .recommend-playlist {
    width: 1600px;
  }
  .recommend-card-item {
    width: 1600px;
  }
  .recommend-card-arrow-left {
    left: calc((100% - 1600px) / 2);
  }
  .recommend-card-arrow-right {
    right: calc((100% - 1600px) / 2);
  }
}
@media screen and(min-width: 2559px) {
  .c-hot-recommend .recommend-playlist {
    width: 1850px;
  }
  .recommend-card-item {
    width: 1850px;
  }
  .recommend-card-arrow-left {
    left: calc((100% - 1850px) / 2);
  }
  .recommend-card-arrow-right {
    right: calc((100% - 1850px) / 2);
  }
}
.recommend-playlist {
  min-height: 71px;
  position: relative;
  margin: 0 auto;
  .recommend-typo-top {
    position: absolute;
    left: 0px;
    top: 0px;
    height: 11px;
    width: 100%;
  }
  .recommend-title {
    display: inline-block;
    font-size: 24px;
    vertical-align: -4px;
    margin-top: 31px;
    margin-left: 10px;
    margin-right: 20px;
    font-weight: 600;
    letter-spacing: 2px;
  }
  .recommend-hot-chip {
    margin: 0px 10px 24px;
  }
  .recommend-typo-bottom {
    position: absolute;
    left: 0px;
    bottom: 0px;
    height: 11px;
    width: 100%;
  }
}

.recommend-card-container {
  height: 350px;
  width: 100%;
  .recommend-card-cover {
    height: 350px;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
    .recommend-card-inner {
      height: 50px;
      width: 50px;
    }
  }
}

.recommend-card {
  width: 100%;
  height: 350px;
  position: relative;

  .recommend-card-item {
    position: relative;
    height: 350px;
    margin: 0 auto;
    overflow-x: hidden;
    .recommend-card-item-container {
      position: absolute;
      top: 0px;
      transition: left 0.2s ease-in-out;
      display: flex;
      .recommend-card-list {
        display: inline-block;
        width: 192px;
        margin: 35px 25px 0px 10px;
      }
    }
  }
  .recommend-card-arrow-left {
    position: absolute;
    top: 50%;
    transform: translate(-50%, -126%);
  }
  .recommend-card-arrow-right {
    position: absolute;
    top: 50%;
    transform: translate(50%, -126%);
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.1s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
