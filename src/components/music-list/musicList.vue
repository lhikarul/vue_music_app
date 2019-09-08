<template>
    <div class="music-list">

        <div class="back">
            <i class="icon-back"></i>
        </div>

        <h1 class="title">{{title}}</h1>

        <div class="bg-image" :style="bgStyle" ref="bgImage">
            <div class="filter"></div>
        </div>

        <div class="bg-layer" ref="layer"></div>

        <scroll :data="songs" class="list" ref="list" :probeType="probeType" :listenScroll="listenScroll" @scroll="scroll">
            <div class="song-list-wrapper">
                <song-list :songs="songs"></song-list>
            </div>
        </scroll>
    </div>
</template>

<script>
import Scroll from 'base/scroll/scroll';
import SongList from 'base/song-list/songList';

const RESERVED_HEIGHT = 40;

export default {
    name: 'musicList',
    components: {
        Scroll,
        SongList
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
        }
    },
    data () {
        return {
            scrollY: 0
        }
    },
    methods: {
        scroll (pos) {
            this.scrollY = pos.y;
        }
    },
    computed: {
        bgStyle () {
            return `background-image: url(${this.bgImage})`
        }
    },
    watch: {
        scrollY (newY) {
            var translateY = Math.max(this.minTranslateY, newY);
            this.$refs.layer.style['transform'] = `translate3d(0,${translateY}px,0)`;
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