<template>
    <scroll class="listview" :data="singers" ref="listview" :listenScroll="listenScroll" :probeType="probeType" @scroll="scroll">
        <ul>
            <li v-for="(singer,index) in singers" :key="index" ref="listGroup" class="list-group">
                <h2 class="list-group-title">{{singer.title}}</h2>
                <ul>
                    <li v-for="item in singer.items" class="list-group-item" :key="item.id" @click="selectSinger(item)">
                        <img v-lazy="item.avatar" class="avatar">
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
        <div class="list-fixed" ref="fixed" v-show="fixedTitle">
            <h1 class="fixed-title">{{fixedTitle}}</h1>
        </div>
    </scroll>
</template>

<script>
import Scroll from 'base/scroll/scroll';
import { getDataSet } from 'common/js/dom';

const ANCHOR_HEIGHT = 18;
const TITLE_HEIGHT  = 30;

export default {
    name: "ListView",
    components: {
        Scroll
    },
    props: {
        singers: {
            type: Array,
            default: []
        }
    },
    data () {
        return {
            scrollY: -1,
            currentIndex: 0,
            diff: -1
        }
    },
    methods: {
        onShortcutTouchStart (e) {

             //touchEvent => touchstart 手指觸摸螢幕時觸發，即使已經有手指在螢幕上也會觸發
            var anchorIndex = getDataSet(e.target, 'index');
            var firstTouch  = e.touches[0];

             // 獲取觸碰節點的高度
            this.touch.y1 = firstTouch.pageY;

            this.touch.anchorIndex = anchorIndex;

            this.scrollTo(anchorIndex);
        },
        onShortcutTouchMove (e) {
             // tocuhmove 手指在螢幕滑動時觸發
            var firstTouch = e.touches[0];
            this.touch.y2  = firstTouch.pageY;

             // 向下取整
            var delta = (this.touch.y2 - this.touch.y1) / ANCHOR_HEIGHT | 0 ;

             // 新的滑動高度
            var anchorIndex = parseInt(this.touch.anchorIndex) + delta;
            this.scrollTo(anchorIndex);
        },
        scroll (pos) {
            this.scrollY = pos.y;
        },
        scrollTo (index) {

            if (!index && index !== 0) return;

            if (index < 0) {
                index = 0;
            }else if (index > this.listHeight.length - 2) {
                 // 最後一個元素的初始位置
                index = this.listHeight.length - 2;
            }
              // 第二個參數 => 滾動的動畫時間
            this.scrollY = -this.listHeight[index];
            this.$refs.listview.scrollToElement(this.$refs.listGroup[index], 0);
        },
        calculateHeight () { // 計算 list-group 的高度

            this.listHeight = [];

            const list = this.$refs.listGroup;
            var height = 0;

            this.listHeight.push(height);

             // 累加每一個 list-group 的 clientHeight
            for (let i=0; i<list.length; i++) {
                let item = list[i];
                height += item.clientHeight;
                this.listHeight.push(height);
            }
        },
        selectSinger (singer) {
            this.$emit('select', singer);
        }
    },
    computed: {
        shortcutList () {
            return this.singers.map((group) => {
                return group.title.substr(0,1);
            })
        },
        fixedTitle () {
            if (this.scrollY > 0) {
                return '';
            }
            return this.singers[this.currentIndex] ? this.singers[this.currentIndex].title : "";
        }
    },
    watch: {
        singers () {
            setTimeout(() => {
                this.calculateHeight();
            },20)
        },
        scrollY(newY) {
            
            const listHeight = this.listHeight;

            // 當滾動到頂部 -> newY > 0
            if (newY > 0) {
                // 高亮第一個元素
                this.currentIndex = 0;
                return;
            }

            // 在中間部分滾動
            for (let i=0; i<listHeight.length - 1; i++) {
                // 下限與上限
                var height1 = listHeight[i];
                var height2 = listHeight[i + 1];
                if ((-newY >= height1 && -newY < height2)){
                    this.currentIndex = i;
                    // 元素的上限 - 當前滾動位置
                    this.diff = height2 + newY;
                    return;
                }
            }

            // 滾動到底部，且 -newY 大於 最後一個元素的上限
            this.currentIndex = listHeight.length - 2;
        },
        diff(newVal) {
            var fixedTop = (newVal > 0 && newVal < TITLE_HEIGHT) ? newVal - TITLE_HEIGHT : 0; 

            if (this.fixedTop === fixedTop) {
                return;
            }
            this.fixedTop = fixedTop;

            this.$refs.fixed.style.transform = `translate3d(0, ${fixedTop}px, 0)`;
        }
    },
    created () {
        this.touch = [];
        this.listenScroll = true;
        this.listHeight = [];
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