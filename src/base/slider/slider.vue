<template>
    <div class="slider" ref="slider">
        <div class="slider-group" ref="sliderGroup">
            <!-- slot 接收父組件傳入的模板 -->
            <slot></slot>
        </div>
        <div class="dots">
            <span class="dot" v-for="(item,index) in dots" :key="index" :class="{'active': currentPageIndex === index}"></span>
        </div>
    </div>
</template>

<script>
import BScroll from 'better-scroll';
import {addClass} from 'common/js/dom';

export default {
    name: 'Slider',
    props: {
        loop: {
            type: Boolean,
            default: true
        },
        autoPlay: {
            type: Boolean,
            default: true
        },
        interval: {
            type: Number,
            default: 4000
        }
    },
    data () {
        return {
            dots: [],
            currentPageIndex: 0
        }
    },
    methods: {
        setSliderWidth (isResize) {

            // get sliderGroup 的子節點
            this.children = this.$refs.sliderGroup.children;
            var width = 0;
            var sliderWidth = this.$refs.slider.clientWidth;

            // 動態添加 class、 計算 sliders 總寬度
            for (let i=0; i<this.children.length; i++) {
                let child = this.children[i];
                addClass(child, 'slider-item');
                child.style.width = sliderWidth + 'px';
                width += sliderWidth;
            }

            // 避免視窗寬度發生變化，width一直疊加
            if (this.loop && !isResize) {
                 // 循環 => 前後添加DOM
                width += 2 * sliderWidth;
            }

            // sliderGroup 總寬度 ex: 2625px
            this.$refs.sliderGroup.style.width = width + 'px';
        },
        initDots () {
            // empty x 5 的陣列
            this.dots = new Array(this.children.length);
        },
        initSlider () {

            this.slider = new BScroll(this.$refs.slider,{
                scrollX: true,
                scrollY: false,
                momentum: false,
                click: true,
                snap: {
                    loop: this.loop,
                    threshold: .3,
                    speed: 400
                }
            })

            // 獲取當前 slider 的 index
            this.slider.on('scrollEnd', () => {
                var pageIndex = this.slider.getCurrentPage().pageX;
                this.currentPageIndex = pageIndex;
                
                if (this.autoPlay) {
                    // 避免手動輪播後，又立即自動輪播
                    clearTimeout(this.timer);
                    this.play();
                }
            })
        },
        play () {
            var pageIndex = this.currentPageIndex + 1;
            this.timer = setTimeout(() => {
                this.slider.goToPage(pageIndex, 0 ,400);
            }, this.interval)
        }
    },
    mounted () {
        setTimeout(() => {
            this.setSliderWidth();
             // 確保 dots 與 slider 保持一致。
            this.initDots();
            this.initSlider();
        },20)

        if (this.autoPlay) {
            this.play();
        }

        window.addEventListener('resize',() => {
            if (!this.slider) return;
            // 重新計算 slider width
            this.setSliderWidth(true);
            this.slider.refresh();
        })
    },
    destroyed() {
        // 切換 slider 組件會調用 destroyed 生命週期函式
        clearTimeout(this.timer);
    },
}
</script>

<style lang="scss" scoped>
@import "~@/common/scss/const.scss";
@import "~@/common/scss/mixin.scss";

    .slider {
        min-height: 1px;
        position: relative;

        &-group {
            overflow: hidden;
            white-space: nowrap;
        }

        &-item {
            float: left;
            box-sizing: border-box;
            text-align: center;
            overflow: hidden;

            a {
                display: block;
                width: 100%;
                overflow: hidden;
                text-decoration: none;
            }
            img {
                display: block;
                width: 100%;
            }
        }

        .dots {
            position: absolute;
            right: 0;
            left: 0;
            bottom: 12px;
            text-align: center;
            .dot {
                display: inline-block;
                margin: 0 4px;
                width: 8px;
                height: 8px;
                border-radius: 50%;
                background: $color-text-l;
                &.active {
                    width: 20px;
                    border-radius: 5px;
                    background: $color-text-ll;
                }
            }
        }
    }
</style>