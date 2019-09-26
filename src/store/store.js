import Vue from 'vue'
import Vuex from 'vuex';

import * as types from './mutation-types';

import createLogger from 'vuex/dist/logger';

import {playMode} from 'common/js/config';
import {shuffle} from 'common/js/util';

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
        currentIndex: -1,
        disc: {},
        topList: ''
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
        [types.SET_PLAY_MODE](state,mode) {
            state.mode = mode
        },
        [types.SET_CURRENT_INDEX](state,index) {
            state.currentIndex = index
        },
        [types.SET_DISC](state,disc) {
            state.disc = disc;
        },
        [types.SET_TOP_LIST](state,topList) {
            state.topList = topList;
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
        },
        disc: state => state.disc,
        topList: state => state.topList
    },
    actions: {
        selectPlay ({commit,state},{list,index}) {
            commit(types.SET_SEQUENCE_LIST,list);
            
            if (state.mode === playMode.random) {
                var randomList = shuffle(list);
                commit(types.SET_PLAYLIST, randomList);
                index = findIndex(randomList,list[index]);
            }else {
                commit(types.SET_PLAYLIST, list);
            }

            commit(types.SET_CURRENT_INDEX,index);
            commit(types.SET_FULL_SCREEN, true);
            commit(types.SET_PLAYING_STATE, true);
        },
        randomPlay({commit},{list}) {

            commit(types.SET_PLAY_MODE, playMode.random);
            commit(types.SET_SEQUENCE_LIST,list);

            var randomList = shuffle(list);
            commit(types.SET_PLAYLIST,randomList);
            commit(types.SET_CURRENT_INDEX,0);
            commit(types.SET_FULL_SCREEN, true);
            commit(types.SET_PLAYING_STATE, true);
        },
        insertSong ({commit,state}, song) {
            var playlist = state.playlist.slice();
            var sequenceList = state.sequenceList.slice();
            var currentIndex = state.currentIndex;

            // 紀錄當前歌曲
            var currentSong = playlist[currentIndex];

            // 查找當前列表是否有待插入的歌曲
            var fpIndex = findIndex(playlist, song);
            
            // 因為是插入歌曲，所以索引 + 1
            currentIndex++;

            // 插入這首歌到當前索引位置
            playlist.splice(currentIndex,0,song);

            // 如果已經包含這首歌
            if (fpIndex > -1) {
                // 如果當前插入的序號 > 列表中的序號
                if (currentIndex > fpIndex) {
                    playlist.splice(fpIndex, 1);
                    currentIndex--;
                }else {
                    playlist.splice(fpIndex + 1,1)
                }
            }

            var currentSIndex = findIndex(sequenceList, currentSong) + 1;

            var fsIndex = findIndex(sequenceList,song);

            sequenceList.splice(currentSIndex,0,song);

            if (fsIndex > -1) {
                if (currentSIndex > fsIndex) {
                    sequenceList.splice(fsIndex, 1)
                }else {
                    sequenceList.splice(fsIndex + 1, 1)
                }
            }

            commit(types.SET_PLAYLIST,playlist)
            commit(types.SET_SEQUENCE_LIST,sequenceList)
            commit(types.SET_CURRENT_INDEX, currentIndex)
            commit(types.SET_FULL_SCREEN,true)
            commit(types.SET_PLAYING_STATE,true)            
        }
    },
    strict: debug,
    plugins: debug ? [createLogger()] : []
})


function findIndex(list,song) {
    return list.findIndex((item) => {
        return item.id === song.id;
    })
}