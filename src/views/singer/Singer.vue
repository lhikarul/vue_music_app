<template>
    <div class="singer">
        singer
    </div>
</template>

<script>
import {requestSingerList} from 'api/singer';
import {ERR_OK} from 'api/config';
import Singer from 'common/js/singer';

const HOT_NAME = "热门";
const HOT_SINGER_LEN = 10;

export default {
    name: 'Singer',
    data () {
        return {
            singers: []
        }
    },
    methods: {
        getSingerList () {
            requestSingerList().then(res => {
                if (res.code === ERR_OK) {
                    this.singers = res.data.list
                    
                    console.log(this.normalizeSinger(this.singers))

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
        }
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
    
</style>