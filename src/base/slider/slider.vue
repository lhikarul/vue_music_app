<template>
    <div class="slider" ref="slider">
        <div class="slider-group clearfix" ref="sliderGroup">
            <slot></slot>
        </div>
    </div>
</template>

<script>
import BScroll from 'better-scroll';
import { setTimeout } from 'timers';

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
    methods: {
        setSliderWidth () {

            // 找到所有的 slider 元素
            // 計算全部 slider 的總寬度 、 計算當前 slider 客戶端寬度
            // 遍例 slider 元素，以便添加 slider-item class
            // 將客戶端寬度設為 slider 寬度
            // 設置 slider 容器的總寬度

            this.children = this.$refs.sliderGroup.children;

            var width = 0;
            var sliderWidth = this.$refs.slider.clientWidth;

            for (let i=0; i<this.children.length; i++) {
                let child = this.children[i];
                addClass(child, 'slider-item');

                child.style.width = sliderWidth + 'px';
                width += sliderWidth ;

            }

            if (this.loop) {
                width += 2 * sliderWidth;
            }

            this.$refs.sliderGroup.style.width = width + 'px';
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

        }
    },
    mounted() {
        setTimeout(() => {
            this.setSliderWidth();
            this.initSlider();
        },20);
    }
}
</script>

<style lang="scss" scoped>

    .clearfix:after {
        content: '';
        display: table;
        clear: both;
    }

    .slider-item {
        float: left;

        img {
            width: 100%;
        }
    }
</style>