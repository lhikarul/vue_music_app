<template>
    <div class="recommend" ref="recommend">
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
                        <li @click="selectItem(item)" class="recommend-list-item" v-for="item in songList" :key="item.listennum" >
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

            <div class="loading-container" v-show="!songList.length">
                <loading></loading>
            </div>

        </scroll>

        <transition name="slide">
            <router-view></router-view>
        </transition>

    </div>
</template>

<script>
import {ERR_OK} from 'api/config';
import {getRecommendList,getRecommendSongs} from 'api/recommend';

import Slider from 'base/slider/slider';
import Scroll from 'base/scroll/scroll';
import Loading from 'base/loading/loading';

import {playlistMixin} from 'common/js/mixin';
import {mapMutations} from 'vuex';

export default {
    name: 'Recommend',
    components: {
        Slider,
        Scroll,
        Loading
    },
    mixins: [playlistMixin],
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
        selectItem (item) {
            this.$router.push({
                path: `/recommend/${item.dissid}`
            })
            this.setDisc(item);
        },
        handlePlaylist (playlist) {
            const bottom = playlist.length > 0 ? '60px' : '';
            this.$refs.recommend.style.bottom = bottom;
            this.$refs.scroll.refresh();
        },
        loadImage () {
            // checkLoaded => 確保這段邏輯只執行一次
            if (!this.checkLoaded) {
                // 加載圖片後，重新計算 bettr-scroll 的高度
                this.$refs.scroll.refresh();
                this.checkLoaded = true;
            }
        },
        ...mapMutations({
            setDisc: 'SET_DISC'
        })
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

        .loading-container {
            position: absolute;
            width: 100%;
            top: 50%;
            transform: translate(0,-50%);
        }
    }

    .slide-enter-active, .slide-leave-active {
        transition: all .3s;
    }

    .slide-enter, .slide-leave-to {
        transform: translate3d(100%, 0 ,0);
    }

</style>