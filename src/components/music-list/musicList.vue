<template>
    <div class="music-list">
        <div class="back">
            <i class="icon-back"  @click="back"></i>
        </div>
        <h1 class="title">{{title}}</h1>
        <div class="bg-image" :style="bgStyle" ref="bgImage">
            <div class="play-wrapper">
                <div class="play" v-show="songs.length > 0" ref="playBtn">
                    <i class="icon-play"></i>
                    <span class="text">隨機撥放全部</span>
                </div>
            </div>
            <div class="filter" ref="filter"></div>
        </div>

        <div class="bg-layer" ref="layer"></div>

        <scroll @scroll="scroll" :probe-type="probeType" :listen-scroll="listenScroll" :data="songs" class="list" ref="list">
            <div class="song-list-wrapper">
                <song-list :songs="songs"></song-list>
            </div>
            <div class="loading-container" v-show="!songs.length">
                <loading></loading>
            </div>
        </scroll>
    </div>
</template>

<script>
import Scroll from 'base/scroll/scroll';
import SongList from 'base/songlist/songList';
import Loading from 'base/loading/loading';

const RESERVED_HEAD_HEIGHT = 40;

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
            default: []
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
            // 監聽當前y軸的值
            this.scrollY = pos.y;
        },
        back () {
            this.$router.back();
        }
    },
    computed: {
        bgStyle () {
            return `background-image: url(${this.bgImage})`;
        }
    },
    watch: {
        scrollY(yValue) {
            var translateY = Math.max(this.minTranslateY, yValue);
            var zIndex = 0;
            var scale = 1;
            var blur = 0;
            
            const percent = Math.abs(yValue / this.imageHeight );

            // bg-layer 的 y軸變化最多只跟圖片高度一樣
            this.$refs.layer.style['transform'] = `translate3d(0,${translateY}px, 0)`;

            // 變更圖片比例
            if (yValue > 0) {
                scale = 1 + percent;
                zIndex = 10;
            }else {
                blur = Math.min(20*percent, 20);
            }

            this.$refs.filter.style['backdrop-filter'] = `blur${blur}px`;

            // 根據 y 軸變更圖片高度;
            if (yValue < this.minTranslateY) {
                zIndex = 10;
                this.$refs.bgImage.style.paddingTop = 0;
                this.$refs.bgImage.style.height = RESERVED_HEAD_HEIGHT + 'px';
                this.$refs.playBtn.style.display = 'none';
            }else {
                this.$refs.bgImage.style.paddingTop = "70%";
                this.$refs.bgImage.style.height = 0;
                this.$refs.playBtn.style.display = '';
            }

            this.$refs.bgImage.style.zIndex = zIndex;
            this.$refs.bgImage.style['transform'] = `scale(${scale})`;

        }
    },
    created () {
        this.probeType = 3;
        this.listenScroll = true;
    },
    mounted () {
        this.imageHeight   = this.$refs.bgImage.clientHeight;
        this.minTranslateY = -this.imageHeight + RESERVED_HEAD_HEIGHT;
        this.$refs.list.$el.style.top = this.imageHeight + 'px';
    }
}
</script>

<style lang="scss" scoped>
@import "~common/scss/myMusicList/myMusicList.scss";
</style>