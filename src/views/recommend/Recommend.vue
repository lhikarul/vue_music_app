<template>
    <div class="recommend">
        <scroll ref="scroll" class="recommend-content" :data="songList">
            <div>
                <div class="slider-wrapper" v-if="recommendsList.length">
                    <slider>
                        <div v-for="item in recommendsList" :key="item.id">
                            <a :href="item.linkUrl">
                                <img @load="loadImage" :src="item.picUrl">
                            </a>
                        </div>
                    </slider>
                </div>
                <div class="recommend-list">
                    <h1 class="recommend-list-title">熱門歌單推薦</h1>
                    <ul>
                        <li class="recommend-list-item" v-for="item in songList" :key="item.listennum" >
                            <div class="item-image">
                                <img width="60" height="60" v-lazy="item.imgurl">
                            </div>
                            <div class="item-content">
                                <h2 class="name">{{item.creator.name}}</h2>
                                <p class="desc">{{item.dissname}}</p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </scroll>
    </div>
</template>

<script>
import {ERR_OK} from 'api/config';
import {getRecommendList,getRecommendSongs} from 'api/recommend';

import Slider from 'base/slider/slider';
import Scroll from 'base/scroll/scroll';

export default {
    name: 'Recommend',
    components: {
        Slider,
        Scroll
    },
    data () {
        return {
            recommendsList: [],
            songList: []
        }
    },
    methods: {
        requestRecommendList () {
            getRecommendList().then((res) => {

                if (res.code === ERR_OK) {
                    this.recommendsList = res.data.slider;
                }

            })
        },
        requestSongsList () {
            getRecommendSongs().then((res) => {

                if (res.code === ERR_OK) {
                    this.songList = res.data.list;
                }

            })
        },
        loadImage () {
            // checkLoaded => 確保這段邏輯只執行一次
            if (!this.checkLoaded) {
                // 加載圖片後，重新計算 bettr-scroll 的高度
                this.$refs.scroll.refresh();
                this.checkLoaded = true;
            }
        }
    },
    created () {
        this.requestRecommendList();
        this.requestSongsList();
    }
}
</script>

<style lang="scss" scoped>

@import '~common/scss/const';
@import '~common/scss/mixin';

    .recommend {
        position: fixed;
        width: 100%;
        top: 88px;
        bottom: 0;

        &-content {
            position: relative;
            height: 100%;
            overflow: hidden;

            .slider-wrapper {
                position: relative;
                width: 100%;
                overflow: hidden;
            }
        }

        &-list {

            &-title {
                height: 65px;
                line-height: 65px;
                text-align: center;
                font-size: $font-size-medium;
                color: $color-theme;
            }

            .recommend-list-item {
                padding: 0 20px 20px 20px;
                display: flex;
                align-items: center;
                box-sizing: border-box;

                .item-image {
                    flex: 0 0 60px;
                    width: 60px;
                    padding-right: 20px;
                }

                .item-content {
                    font-size: $font-size-medium;
                }

                .name {
                    margin-bottom: 10px;
                    color: $color-text;
                }

                .desc {
                    color: $color-text-d;
                }
            }

        }
    }
</style>