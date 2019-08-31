<template>
    <div class="singer">
        <list-view :singers="singers" @select="selectSinger"></list-view>
        <router-view></router-view>
    </div>
</template>

<script>
import {mapMutations} from 'vuex';

import {ERR_OK} from 'api/config';
import {requestSingerList} from 'api/singer';

import ListView from 'base/listview/listview';

import Singer from '@/common/js/singer';

const HOT_NAME = "热门";
const HOT_SINGER_LEN = 10;

export default {
    name: 'singer',
    components: {
        ListView
    },
    data () {
        return {
            singers: []
        }
    },
    methods: {
        getSingerList () {
            requestSingerList().then((res) => {
                if (res.code === ERR_OK) {
                    this.singers = this.normalizeSinger(res.data.list);
                }
            })
        },
        normalizeSinger (signerList) {
            const map = {
                hot: {
                    title: HOT_NAME,
                    items: []
                }
            }

            signerList.forEach((item,index) => {
                 // 將前10位熱門歌手 push 至 hot array
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

                // 將歌手資料 push 至所屬的字母表
                map[key].items.push(new Singer({
                    id: item.Fsinger_mid,
                    name: item.Fsinger_name
                }))
            })

            // 為了得到有序列表，需要處理 map
            var hot = [];
            var ret = [];

            for (let key in map) {

                let val = map[key];

                // title 含有 a ~ z
                if (val.title.match(/[a-zA-Z]/)) {
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
        selectSinger (singer) {

            this.$router.push({
                path: `/singer/${singer.id}`
            })

            this.set_singer(singer);

        },
        ...mapMutations({
             set_singer: 'SET_SINGER' // 將 this.set_singer 映射為 this.$store.commit('SET_SINGER);
        })
    },
    created() {
        this.getSingerList()
    },

}
</script>

<style lang="scss" scoped>
    @import "~common/scss/mySinger/mySinger.scss";
</style>