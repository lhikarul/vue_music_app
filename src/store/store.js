import Vue from 'vue'
import Vuex from 'vuex';

import * as types from './mutation-types';

import createLogger from 'vuex/dist/logger';

import {playMode} from 'common/js/config';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== ' production';

export default new Vuex.Store({
    state: {
        singer: {},
        playing: false,
        fullScreen: false,
        playlist: [],
        sequenceList: [],
        mode: playMode.sequence,
        currentIndex: -1
    },
    mutations: {
        [types.SET_SINGER](state,singer) {
            state.singer = singer;
        },
        [types.SET_PLAYING_STATE](state,flag) {
            state.playing = flag
        },
        [types.SET_FULL_SCREEN](state,flag) {
            state.fullScreen = flag
        },
        [types.SET_PLAYLIST](state,list) {
            state.playlist = list
        },
        [types.SET_SEQUENCE_LIST](state,list) {
            state.sequenceList = list
        },
        [types.SET_PLAY_MODE](state,list) {
            state.sequenceList = list
        },
        [types.SET_PLAY_MODE](state,mode) {
            state.mode = mode
        },
        [types.SET_CURRENT_INDEX](state,index) {
            state.currentIndex = index
        }
    },
    getters: {
        singer: state => state.singer,
        playing: state => state.playing,
        fullScreen: state => state.fullScreen,
        playlist: state => state.playlist,
        sequenceList: state => state.sequenceList,
        mode: state => state.mode,
        currentIndex: state => state.currentIndex,
        currentSong: (state) => {
            return state.playlist[state.currentIndex] || {}
        }
    },
    actions: {
        selectPlay ({commit,state},{list,index}) {
            commit(types.SET_SEQUENCE_LIST,list);
            commit(types.SET_PLAYLIST, list);
            commit(types.SET_CURRENT_INDEX,index);
            commit(types.SET_FULL_SCREEN, true);
            commit(types.SET_PLAYLIST, true);
        }
    },
    strict: debug,
    plugins: debug ? [createLogger()] : []
})


