import { createStore } from 'vuex'
import mdui from 'mdui'

import { topListInt } from '../type/recommend.type'
import request from '../api/index'
import { removeToken } from '../utils/auth'

export default createStore({
  state: {
    toolbarTitle: '发现音乐',
    toolbarSubTitle: '推荐',
    curIndex: -1,
    curChildIndex: -1,
    topListFull: [],
    playListFull: [],
    djListFull: [],
    userId: '',
    loginStatus: 'unlogin',
    songList: [] as Array<string>,
    loop: false
  },
  mutations: {
    setToolbarTitle: (state, i) => {
      state.toolbarTitle = i
    },
    setToolbarSubTitle: (state, i) => {
      state.toolbarSubTitle = i
    },
    setCurIndex: (state, i) => {
      i = i === undefined ? -1 : i
      state.curIndex = i
    },
    setCurChildIndex: (state, i) => {
      i = i === undefined ? -1 : i
      state.curChildIndex = i
    },
    setTopListFull: (state, i) => {
      state.topListFull = i
    },
    setPlayListFull: (state, i) => {
      state.playListFull = i
    },
    setDjListFull: (state, i) => {
      state.djListFull = i
    },
    setUserId: (state, i) => {
      sessionStorage.userId = i
      state.userId = i
    },
    setLoaginStatus: (state, i) => {
      sessionStorage.login = i
      state.loginStatus = i
    },
    setSongList: (state, i) => {
      if (typeof i === 'string') {
        if (state.songList[0] !== i) {
          state.songList.unshift(i)
          mdui.snackbar({
            message: '已添加到播放列表',
            position: 'right-bottom',
            timeout: 1200
          })
        }
        if (state.songList.includes(i)) {
          state.songList = [...new Set(state.songList)]
        }
      } else {
        state.songList = state.songList.concat(i)
        mdui.snackbar({
          message: '已添加到播放列表',
          position: 'right-bottom',
          timeout: 1200
        })
      }
    },
    pushHeadToLast: state => {
      if (!state.loop) {
        const arr = state.songList.shift()
        if (arr !== undefined) {
          state.songList.push(arr)
        }
      } else {
        state.songList = state.songList.concat([])
      }
    },
    pullLastToHead: state => {
      if (!state.loop) {
        const arr = state.songList.pop()
        if (arr !== undefined) {
          state.songList.unshift(arr)
        }
      } else {
        state.songList = state.songList.concat([])
      }
    },
    clearSongList: state => {
      state.songList.length = 0
    },
    toggleLoop: state => {
      state.loop = !state.loop
    }
  },
  actions: {
    getTopListFull: async ({ commit }) => {
      const _list: Array<topListInt> = []

      const { list } = await request['httpGET']('GET_TOPLIST')

      for (let i = 0; i < list.length; i++) {
        _list.push({
          id: list[i].id,
          name: list[i].name
        })
      }
      sessionStorage.topListFull = JSON.stringify(_list)
      commit('setTopListFull', _list)
    },
    getPlayListFull: async ({ commit }) => {
      const _list: Array<topListInt> = []
      const { sub } = await request['httpGET']('GET_PLAYLIST_CATLIST')

      _list[0] = {
        id: -1,
        name: '全部'
      }
      for (let i = 0; i < sub.length; i++) {
        _list[i + 1] = {
          id: i,
          name: sub[i].name
        }
      }

      sessionStorage.playListFull = JSON.stringify(_list)
      commit('setPlayListFull', _list)
    },
    getDjListFull: async ({ commit }) => {
      const _list: Array<topListInt> = []
      const { data } = await request['httpGET']('GET_DJ_CATEGORY_RECOMMEND')

      for (let i = 0; i < data.length; i++) {
        _list[i] = {
          id: data[i].categoryId,
          name: data[i].categoryName
        }
      }
      sessionStorage.djListFull = JSON.stringify(_list)
      commit('setDjListFull', _list)
    },
    getUserId: async ({ commit }) => {
      const { profile } = await request['httpGET']('GET_LOGIN_STATUS')
      commit('setUserId', profile.userId)
    },
    getLoaginStatus: async ({ commit }) => {
      const { code, profile } = await request['httpGET']('GET_LOGIN_STATUS')

      if (code === 200) {
        commit('setLoaginStatus', 'login')
        commit('setUserId', profile.userId)
        mdui.snackbar({
          message: '登录成功',
          position: 'right-bottom',
          timeout: 800
        })
      } else {
        commit('setLoaginStatus', 'unlogin')
        commit('setUserId', '')
        removeToken()
      }
    }
  },
  modules: {}
})
