<template>
    <scroll class="listview" :data="data" ref="listView" :listenScroll="listenScroll" @scroll="scroll" :probeType="probeType">
        <ul>
            <li v-for="(group,index) in data" :key="index" ref="listGroup">
                <h2 class="list-group-title">{{group.title}}</h2>
                <ul>
                    <li v-for="(item,index) in group.items" class="list-group-item" :key="index">
                        <img class="avatar" v-lazy="item.avatar" />
                        <span class="name">{{item.name}}</span>
                    </li>
                </ul>
            </li>
        </ul>
        <div class="list-shortcut" @touchstart="onShortcutTouchStart" @touchmove.stop.prevent="onShortcutTouchMove">
            <ul>
                <li v-for="(item,index) in shortcutList" 
                    :key="index"
                    class="item"
                    :class="{'current': currentIndex === index}"
                    :data-index="index"
                >
                    {{item}}
                </li>
            </ul>
        </div>
    </scroll>
</template>

<script>
import Scroll from 'base/scroll/scroll';

import {getData} from 'common/js/dom';

const ANCHOR_HEIGHT = 18;

export default {
    components: {
        Scroll
    },
    props: {
        data: {
            type: Array,
            default: function () {
                return []
            }
        }
    },
    data () {
        return {
            scrollY: -1,
            currentIndex: 0
        }
    },
    methods: {
        onShortcutTouchStart(e) {
            //touchEvent => touchstart 手指觸摸螢幕時觸發，即使已經有手指在螢幕上也會觸發

            // 點擊索引切換至對應的歌手列表
            // 將列表的索引對應歌手列表的索引
            // 記錄當下元素點擊的y軸位置
            // 記錄當下元素的索引

            const anchorIndex = getData(e.target, 'index');
            const firstTouch  = e.touches[0];

            this.touch.y1 = firstTouch.pageY;
            this.touch.anchorIndex = anchorIndex;

            this.scrollTo(anchorIndex)
        },
        onShortcutTouchMove(e) {

            // 紀錄第一次滑動的位置
        
            const firstTouch = e.touches[0];
            this.touch.y2  = firstTouch.pageY;            

            // 計算已滑動的距離相對於點擊的位置 => 偏移幾個字母
            const delta = (this.touch.y2 - this.touch.y1) / ANCHOR_HEIGHT | 0 ;

            // 取得滑動結束後，歌手區塊的索引
            const anchorIndex = parseInt(this.touch.anchorIndex) + delta;

            this.scrollTo(anchorIndex);

        },
        scroll (pos) {
            this.scrollY = pos.y
        },
        scrollTo (index) {
            // 歌手區塊索引滾動
            this.$refs.listView.scrollToElement(this.$refs.listGroup[index],0);
        },
        calculateHeight () {
            // 獲得元素各自的高度
            this.listHeight = [];
            const list = this.$refs.listGroup;

            var height = 0;

            this.listHeight.push(height);

            list.forEach(item => {
                height += item.clientHeight;
                this.listHeight.push(height);
            })            
        }
    },
    computed: {
        shortcutList () {
            // 獲取字母列表
            return this.data.map((item) => item.title)
        }
    },
    watch: {
        data () {
            setTimeout(() => {
                this.calculateHeight();
            },20)
        },
        scrollY(newY) {

            // 判斷y的值會落在哪一個區間
            // 滾動至頂部、中間部分滾動、滾動至底部
            const listHeight = this.listHeight;

            if (newY > 0) {
                this.currentIndex = 0;
                return;
            }

            for (let i=0; i<listHeight.length - 1; i++) {
                const minHeight = listHeight[i]
                const maxHeight = listHeight[i+1]

                if (!maxHeight || (-newY > minHeight && -newY < maxHeight)) {
                    this.currentIndex = i;
                    return;
                }
            }

            this.currentIndex = listHeight.length - 2;
        }
    },
    created () {
        this.touch = {}
        this.listenScroll = true;
        this.listHeight = [];

        // 讓 better-scroll 時時監聽滾動
        this.probeType = 3;
    }
}
</script>

<style lang="scss" scoped>

@import "~@/common/scss/const.scss";
@import "~@/common/scss/mixin.scss";
.listview {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background: $color-background;
    .list-group {
        padding-bottom: 30px;
        &-title {
            padding-left: 20px;
            height: 30px;
            line-height: 30px;
            font-size: $font-size-small;
            color: $color-text-l;
            background: $color-highlight-background;
        }
        &-item {
            display: flex;
            align-items: center;
            padding: 20px 0 0 30px;
            .avatar {
                width: 50px;
                height: 50px;
                border-radius: 50%;
            }
            .name {
                margin-left: 20px;
                color: $color-text-l;
                font-size: $font-size-medium;
            }
        }
    }
    .list-shortcut {
        position: absolute;
        top: 50%;
        right: 0;
        z-index: 30;
        padding: 20px 0;
        border-radius: 10px;
        text-align: center;
        background: $color-background-d;
        font-family: Helvetica;
        transform: translateY(-50%);
        .item {
            padding: 3px;
            line-height: 1;
            color: $color-text-l;
            font-size: $font-size-small;
            &.current {
                color: $color-theme;
            }
        }
    }
    .list-fixed {
        position: absolute;
        top: -1px;
        left: 0;
        width: 100%;
        .fixed-title {
            height: 30px;
            line-height: 30px;
            padding-left: 20px;
            font-size: $font-size-small;
            color: $color-text-l;
            background: $color-highlight-background;
        }
    }
}

</style>