<template>
  <div id="discoverDjradio">
    <Recommend :topTitle="'主播电台'" :activeName="activeName" :topList="djList" :cardList="djCardList" @get-id="getIdCallBackDj" />
    <div class="dj-card-container g-card-container">
      <!-- 热门电台/新晋电台toggle -->
      <div class="dj-card-title">
        <h1 class="mdui-typo-title mdui-text-color-red-900">{{ djPanelTitle }}</h1>
        <label class="dj-card-switch mdui-switch">
          <input type="checkbox" @click="handleSwitch" />
          <i class="mdui-switch-icon"></i>
        </label>
      </div>
      <div class="mdui-panel mdui-panel-gapless" mdui-panel>
        <div class="mdui-panel-item mdui-panel-item-open" v-for="item in djPanelList" :key="item.id">
          <div class="mdui-panel-item-header">
            <div class="mdui-panel-item-title">{{ item.name }}</div>
            <div class="mdui-panel-item-summary">{{ item.artist }}</div>
          </div>
          <div class="mdui-panel-item-body">
            <p>更新时间：{{ item.createTime }}</p>
            <p>签名：{{ item.signature }}</p>
            <p>播放次数{{ item.playCount }}</p>
            <p>###{{ item.rcmdtext }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, reactive, computed } from 'vue'
import { useStore } from 'vuex'
import Recommend from '../../components/recommend.vue'

import { topListInt, cardListInt } from '../../type/recommend.type'
import { panelInt } from '../../type/panel'

import request from '../../api/index'
import { handleTime } from '../../utils/time'

export default defineComponent({
  name: 'discoverDjradio',
  components: {
    Recommend
  },
  setup() {
    const store = useStore()
    const djList: Array<topListInt> = reactive([])
    const djCardList: Array<cardListInt> = reactive([])

    const djPanelList: Array<panelInt> = reactive([])
    const djPanelTitle = ref('热门电台Top15')
    const activeName = ref('')
    const djListFull = computed(() => store.state.djListFull)

    const getTopList: () => void = async () => {
      for (let i = 0; i < djListFull.value.length; i++) {
        djList[i] = djListFull.value[i]
      }
      activeName.value = djList[0].name
    }

    // hot new dj
    const getDjPanelList: (s: string) => void = async s => {
      const { toplist } = await request['httpGET']('GET_DJ_TOPLIST', { 'type': s })

      for (let i = 0; i < 15; i++) {
        djPanelList[i] = {
          id: '/djradio?id=' + toplist[i].id.toString(),
          name: toplist[i].name,
          artist: toplist[i].creatorName,
          signature: toplist[i].dj.signature,
          createTime: handleTime(toplist[i].createTime),
          playCount: toplist[i].playCount,
          rcmdtext: toplist[i].rcmdtext
        }
      }
    }

    const getPlayList: (n: number) => void = async n => {
      const { djRadios } = await request['httpGET']('GET_DJ_RADIO_HOT', { 'cateId': n })

      for (let i = 0; i < 10; i++) {
        djCardList[i] = {
          id: '/djradio?id=' + djRadios[i].id.toString(),
          name: djRadios[i].name,
          artist: djRadios[i].dj.nickname,
          picUrl: djRadios[i].picUrl
        }
      }
    }

    const getIdCallBackDj: (n: { id: number; name: string }) => void = n => {
      getPlayList(n.id)

      activeName.value = n.name
    }

    const handleSwitch: (e: Event) => void = e => {
      const _target = e.target as HTMLInputElement
      if (_target.checked) {
        djPanelTitle.value = '新晋电台Top15'
        getDjPanelList('new')
      } else {
        djPanelTitle.value = '热门电台Top15'
        getDjPanelList('hot')
      }
    }
    const getDjListFull: () => void = async () => {
      //  从sessionStorage读取特色dj列表
      if (sessionStorage.djListFull) {
        store.commit('setDjListFull', JSON.parse(sessionStorage.djListFull))
      } else {
        await store.dispatch('getDjListFull')
      }

      getTopList()
    }

    // 获取推荐目录
    getPlayList(1)
    // hot dj
    getDjPanelList('hot')
    getDjListFull()

    return {
      activeName,
      djList,
      djCardList,
      getIdCallBackDj,
      djPanelList,
      djPanelTitle,
      handleSwitch
    }
  }
})
</script>
<style lang="less" scoped>
.dj-card-container {
  margin: 50px auto;
  .dj-card-title {
    margin: 50px 0 40px 0;
    position: relative;
    .dj-card-switch {
      position: absolute;
      left: 180px;
      top: -8px;
    }
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
