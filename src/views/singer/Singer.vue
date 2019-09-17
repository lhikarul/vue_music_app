<template>
    <div class="singer" ref="singer">
        
        <list-view :data="singers" @select="selectSinger" ref="list"></list-view>

        <transition name="slide">
            <router-view></router-view>
        </transition>
        
    </div>
</template>

<script>
import {requestSingerList} from 'api/singer';
import {ERR_OK} from 'api/config';

import Singer from 'common/js/singer';
import {playlistMixin} from 'common/js/mixin';

import ListView from 'base/listview/listView';

import {mapMutations} from 'vuex';

const HOT_NAME = "热门";
const HOT_SINGER_LEN = 10;

export default {
    name: 'Singer',
    components: {
        ListView
    },
    mixins: [
        playlistMixin
    ],
    data () {
        return {
            singers: []
        }
    },
    methods: {
        getSingerList () {
            requestSingerList().then(res => {
                if (res.code === ERR_OK) {
                    this.singers = this.normalizeSinger(res.data.list);
                }
            })
        },
        normalizeSinger (list) {
            // 獲取熱門數據、歌手對應字母數據
            // 熱門數據只抓前10個
            // 建立字母表 a,b,c,d,e, etc...
            // 封裝歌手數據
            // 將列表轉成有序列表，a、b、c 排序
            const map = {
                hot: {
                    title: HOT_NAME,
                    items: []
                }
            }

            list.forEach((item,index) => {

                if (index < HOT_SINGER_LEN) {
                    map.hot.items.push(new Singer({
                        id: item.Fsinger_mid,
                        name: item.Fsinger_name
                    }))
                }

                const key = item.Findex;

                if (!map[key]) {
                    map[key] = {
                        title: key,
                        items: []
                    }
                }

                map[key].items.push(new Singer({
                    id: item.Fsinger_mid,
                    name: item.Fsinger_name
                }))
            })

            const hot = [];
            const ret = [];

            for (let k in map) {

                let val = map[k];

                if (val.title.match(/[a-zA-Z]/)){
                    ret.push(val)
                }else if (val.title === HOT_NAME) {
                    hot.push(val);
                }
            }

            ret.sort((a,b) => {
                return a.title.charCodeAt(0) - b.title.charCodeAt(0);
            })
            
            return hot.concat(ret);
        },
        selectSinger(singer) {

            this.$router.push({
                path: `/singer/${singer.id}`
            })

            // 將 stroe 的 singer 狀態設為傳入的歌手
            this.setSinger(singer);
        },
        handlePlaylist(playlist) {
            const bottom = playlist.length > 0 ? '60px' : '';
            this.$refs.singer.style.bottom = bottom;
            this.$refs.list.refresh();
        },
        ...mapMutations({
            setSinger: 'SET_SINGER'
        })
    },
    created () {
        this.getSingerList();
    }
}
</script>

<style lang="scss" scoped>
    .singer {
        // better-scroll 父容器的高度需設置好，藉由子元素撐開高度，才能滾動
        position: fixed;
        width: 100%;
        top: 88px;
        bottom: 0;
    }

    .slide-enter-active, .slide-leave-active {
        transition: all .3s;
    }

    .slide-enter, .slide-leave-to {
        transform: translate3d(100%, 0, 0);
    }

    
</style>