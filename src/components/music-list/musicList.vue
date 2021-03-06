<template>
    <div class="music-list">

        <div class="back" @click="back">
            <i class="icon-back"></i>
        </div>

        <h1 class="title">{{title}}</h1>

        <div class="bg-image" :style="bgStyle" ref="bgImage">
            <div class="play-wrapper">
                <div class="play" v-show="songs.length > 0" ref="playBtn" @click="random">
                    <i class="icon-play"></i>
                    <span class="text">隨機撥放全部</span>
                </div>
            </div>
            <div class="filter" ref="filter"></div>
        </div>

        <div class="bg-layer" ref="layer"></div>

        <scroll :data="songs" class="list" ref="list" :probeType="probeType" :listenScroll="listenScroll" @scroll="scroll">

            <div class="song-list-wrapper">
                <song-list :rank="rank" :songs="songs" @select="selectItem"></song-list>
            </div>

            <div class="loading-container" v-show="!songs.length">
                <loading></loading>
            </div>

        </scroll>

    </div>
    
</template>

<script>
import Scroll from 'base/scroll/scroll';
import SongList from 'base/song-list/songList';
import Loading from 'base/loading/loading';

import {mapActions} from 'vuex';

import {playlistMixin} from 'common/js/mixin';

const RESERVED_HEIGHT = 40;

export default {
    name: 'musicList',
    components: {
        Scroll,
        SongList,
        Loading
    },
    props: {
        bgImage: {
            type: String,
            default: ''
        },
        songs: {
            type: Array,
            default: ''
        },
        title: {
            type: String,
            default: ''
        },
        rank: {
            type: Boolean,
            default: false
        }
    },
    mixins: [playlistMixin],
    data () {
        return {
            scrollY: 0
        }
    },
    methods: {
        scroll (pos) {
            this.scrollY = pos.y;
        },
        back () {
            this.$router.back();
        },
        selectItem(item,index) {
            this.selectPlay({
                list: this.songs,
                index: index
            })
        },
        random () {
            this.randomPlay({
                list: this.songs
            })
        },
        handlePlaylist (playlist) {
            const bottom = playlist.length > 0 ? '60px' : '';
            this.$refs.list.$el.style.bottom = bottom;
            this.$refs.list.refresh();
        },
        ...mapActions([
            'selectPlay',
            'randomPlay'
        ])
    },
    computed: {
        bgStyle () {
            return `background-image: url(${this.bgImage})`
        }
    },
    watch: {
        scrollY (newY) {

            var translateY = Math.max(this.minTranslateY, newY);
            var zIndex = 0;
            var scale = 1;
            var blur  = 0;
            this.$refs.layer.style['transform'] = `translate3d(0,${translateY}px,0)`;

            const percent = Math.abs(newY / this.imageHeight);

            if (newY > 0) {
                scale = 1 + percent;
                zIndex = 10;
            }else {
                blur = Math.min(20 * percent,20)
            }

            this.$refs.filter.style['backdrop-filter'] = `blur(${blur}px)`;

            if (newY < this.minTranslateY) {
                zIndex = 10;
                this.$refs.bgImage.style.paddingTop = 0;
                this.$refs.bgImage.style.height = `${RESERVED_HEIGHT}px`;
                this.$refs.playBtn.style.display = 'none';
            }else {
                this.$refs.bgImage.style.paddingTop = '70%';
                this.$refs.bgImage.style.height = 0;
                this.$refs.playBtn.style.display = '';
            }

            this.$refs.bgImage.style.zIndex = zIndex;
            this.$refs.bgImage.style['transform'] = `scale(${scale})`;

        }
    },
    created() {
        this.probeType = 3;
        this.listenScroll = true;
    },
    mounted () {
        this.imageHeight = this.$refs.bgImage.clientHeight;
        this.minTranslateY = -this.imageHeight + RESERVED_HEIGHT;
        this.$refs.list.$el.style.top = `${this.imageHeight}px`;
    }
}
</script>

<style lang="scss" scoped>
@import '~common/scss/mixin.scss';
@import '~common/scss/const.scss';
.music-list {
    position: fixed;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    z-index: 100;
    background: $color-background;
    .back {
        position: absolute;
        top: 0;
        left: 6px;
        z-index: 100;
        .icon-back {
            display: block;
            padding: 10px;
            font-size: $font-size-large-x;
            color: $color-theme;
        }
    }

    .title {
        position: absolute;
        top: 0;
        left: 10%;
        z-index: 40;
        width: 80%;
        @include no-wrap();
        text-align: center;
        line-height: 40px;
        font-size: 18px;
        color: #fff;
    }

    .bg-image {
        position: relative;
        width: 100%;
        height: 0;
        padding-top: 70%;
        transform-origin: top;
        background-size: cover;
        .play-wrapper {
            position: absolute;
            bottom: 20px;
            z-index: 50;
            width: 100%;
            .play {
                box-sizing: border-box;
                width: 135px;
                padding: 7px 0;
                margin: 0 auto;
                text-align: center;
                border: 1px solid $color-theme;
                color: $color-theme;
                border-radius: 100px;
                font-size: 0;
                .icon-play {
                    display: inline-block;
                    vertical-align: middle;
                    margin-right: 6px;
                    font-size: $font-size-medium-x;
                }
                .text {
                    display: inline-block;
                    vertical-align: middle;
                    font-size: $font-size-small;
                }
            }
        }
    }

    .filter {
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        background: rgba(7, 17, 27, .4);
    }

    .bg-layer {
        position: relative;
        height: 100%;
        background: $color-background;
    }

    .list {
        position: absolute;
        top: 0;
        bottom: 0;
        width: 100%;
        background: $color-background;
    }

    .song-list-wrapper {
        padding: 20px 30px;
    }
    
    .loading-container {
        position: absolute;
        width: 100%;
        top: 50%;
        transform: translateY(-50%);
    }
}
</style>