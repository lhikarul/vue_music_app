<template>
    <div class="slider" ref="slider">
        <div class="slider-group" ref="sliderGroup">
            <slot></slot>
        </div>
        <div class="dots">
            <span class="dot" v-for="(dot,index) in dots" :key="index" :class="{'active': index === currentPageIndex}"></span>
        </div>
    </div>
</template>

<script>
import BScroll from 'better-scroll';
import { setTimeout, clearTimeout } from 'timers';

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

            // 找到所有的 slider 元素
            // 計算全部 slider 的總寬度 、 計算當前 slider 客戶端寬度
            // 遍例 slider 元素，以便添加 slider-item class
            // 將客戶端寬度設為 slider 寬度
            // 設置 slider 容器的總寬度
            // 循環撥放模式，總寬度不能累加 窗口resize 的寬度

            this.children = this.$refs.sliderGroup.children;

            var width = 0;
            var sliderWidth = this.$refs.slider.clientWidth;

            for (let i=0; i<this.children.length; i++) {
                let child = this.children[i];
                addClass(child, 'slider-item');

                child.style.width = sliderWidth + 'px';
                width += sliderWidth ;

            }
            
            // 只有初始化循環模式時，才需要前後計算寬度，重新變更窗口就不需要計算
            if (this.loop && !isResize) {
                width += 2 * sliderWidth;
            }

            this.$refs.sliderGroup.style.width = width + 'px';
        },
        initSlider () {

            // 初始化 BS slider
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

            // 滾動結束後，派發 scrollEnd事件
            // 獲取當前的 slider Index
            // 自動撥放模式，先清除自動撥放，再開啟自動撥放，避免手動輪播後，又立即自動輪，

            this.slider.on('scrollEnd', () => {

                var pageIndex = this.slider.getCurrentPage().pageX;
                this.currentPageIndex = pageIndex;
            })

            if (this.autoPlay) {
                
                clearTimeout(this.timer);
                this.play();
            }


        },
        initDots () {
            // 算出 slider 所需的按鈕數量
            this.dots = new Array(this.children.length);
        },
        play () {
             // 變更當前 slider 的索引
            var pageIndex = this.currentPageIndex + 1;

            this.timer = setTimeout(() => {
                this.slider.goToPage(pageIndex,0,400);
            },this.interval)

        }
    },
    mounted() {
        setTimeout(() => {
            this.setSliderWidth();
            this.initDots();
            this.initSlider();

            // 自動撥放 slider
            if (this.autoPlay) {
                this.play();
            }

        },20);

        // 窗口改變事件，重新計算 slider 寬度
        window.addEventListener('resize', () => {
            if (!this.slider) return;
            this.setSliderWidth(true);
        })   
    }
}
</script>

<style lang="scss" scoped>
@import '~common/scss/const';

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
                width: 8px;
                height: 8px;
                margin: 0 4px;
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