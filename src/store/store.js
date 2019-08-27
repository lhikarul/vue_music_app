import Vue from 'vue'
import Vuex from 'vuex';
import * as types from './mutation-types';

import {playMode} from 'common/js/config';

import createLogger from 'vuex/dist/logger';

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  state: {
    singer: {},
    playing: false,
    fullScreen: false,
    playList: [],
    sequenceList: [],
    mode: playMode.sequence,
    currentIndex: -1
  },
  getters: {
    singer: state => state.singer,
    playing: state => state.playing,
    fullScreen: state => state.fullScreen,
    playList: state => state.playList,
    sequenceList: state => state.sequenceList,
    mode: state => state.mode,
    currentIndex: state => state.currentIndex,
    currentSong: (state) => {
      return state.playList[state.currentIndex] || {}
    }
  },
  mutations: {
    [types.SET_SINGER](state,singer) {
      state.singer = singer;
    },
    [types.SET_PLAYING_STATE](state, flag) {
      state.playing = flag
    },
    [types.SET_FULL_SCREEN](state,flag) {
      state.fullScreen = flag
    },
    [types.SET_PLAYLIST](state,list) {
      state.playList = list
    },
    [types.SET_SEQUENCE_LIST](state,list) {
      state.sequenceList = list
    },
    [types.SET_PLAY_MODE](state, mode) {
      state.mode = mode
    },
    [types.SET_CURRENT_INDEX](state,index) {
      state.currentIndex = index
    }
  },
  actions: {
    // 選取的歌
    selectPlay ({commit,state}, {list,index}) {
      commit(types.SET_SEQUENCE_LIST, list);
      commit(types.SET_PLAYLIST, list);
      commit(types.SET_CURRENT_INDEX, index);
      commit(types.SET_FULL_SCREEN, true);
      commit(types.SET_PLAYING_STATE, true);
    }
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
})
