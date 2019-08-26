import Vue from 'vue'
import Vuex from 'vuex'
import * as types from './mutation-types'

import createLogger from 'vuex/dist/logger'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  state: {
    singer: {}
  },
  getters: {
    singer: state => state.singer
  },
  mutations: {
    [types.SET_SINGER](state,singer) {
      state.singer = singer;
    }
  },
  actions: {

  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
})
