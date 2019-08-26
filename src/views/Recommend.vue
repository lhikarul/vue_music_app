<template>
    <div class="recommend">
        <scroll class="recommend-content" ref="scroll" :data="recommendSongs">
            <div>
                <div class="slider-wrapper" v-if="recommendSlider.length">
                    <slider>
                        <div v-for="item in recommendSlider" :key="item.id">
                            <a :href="item.linkUrl">
                                <img :src="item.picUrl">
                            </a>
                        </div>
                    </slider>
                </div>
                <div class="recommend-list">
                    <h1 class="list-title">熱門歌單推薦</h1>
                    <ul>
                        <li v-for="item in recommendSongs" :key="item.listennum" class="item">
                            <div class="icon">
                                <img width="60" height="60" v-lazy="item.imgurl" >
                            </div>
                            <div class="text">
                                <h2 class="name">{{item.creator.name}}</h2>
                                <p class="desc">{{item.dissname}}</p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="loading-container" v-show="!recommendSlider.length">
                <loading></loading>
            </div>
        </scroll>
    </div>
</template>

<script>
import {ERR_OK} from 'api/config';
import {requestRecommendSlider,requestRecommendSongs} from 'api/recommend';

import Slider from 'base/slider/slider';
import Scroll from 'base/scroll/scroll';
import Loading from 'base/loading/loading';

export default {
    name: 'recommend',
    components: {
        Slider,
        Scroll,
        Loading
    },
    data () {
        return {
            recommendSlider: '',
            recommendSongs: []
        }
    },
    methods: {
        getRecommendSlider () {
            requestRecommendSlider().then((res) => {
                if (res.code === ERR_OK) {
                    this.recommendSlider = res.data.slider;
                }
            })
        },
        getRecommendSongs () {
            requestRecommendSongs().then((res) => {
                if (res.code === ERR_OK) {
                    this.recommendSongs = res.data.list;
                }
            })
        },
        loadImage () {
            if (!this.checkLoaded) {
                this.$refs.scroll.refresh();
                this.checkLoaded = true;
            }
        }

    },
    created() {
        this.getRecommendSlider();
        this.getRecommendSongs();
    },
}
</script>

<style lang="scss" scoped>
@import '~common/scss/myRecommend/myRecommend.scss';
</style>