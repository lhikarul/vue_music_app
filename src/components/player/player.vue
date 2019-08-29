<template>
    <div class="player" v-show="playList.length > 0">

        <transition name="normal" @enter="enter" @after-enter="afterEnter" @leave="leave" @after-leave="afterLeave">
            <div class="normal-player" v-show="fullScreen">
                <div class="background">
                    <img width="100%" height="100%" :src="currentSong.image">
                </div>

                <div class="top">
                    <div class="back" @click="back">
                        <i class="icon-back"></i>
                    </div>
                    <h1 class="title">{{currentSong.name}}</h1>
                    <h2 class="subtitle">{{currentSong.singer}}</h2>
                </div>

                <div class="middle">
                    <div class="middle-l">
                        <div class="cd-wrapper" ref="cdWrapper">
                            <div class="cd" :class="cdCls">
                                <img class="image" :src="currentSong.image">
                            </div>
                        </div>
                    </div>
                </div>

                <div class="bottom">
                    
                    <div class="progress-wrappe">
                        <span class="time time-l">{{format(currentTime)}}</span>
                        <div class="progress-bar-wrapper"></div>
                        <span class="time time-r">3:32</span>
                    </div>

                    <div class="operators">
                        <div class="icon i-left">
                            <i class="icon-sequence"></i>
                        </div>
                        <div class="icon i-left" :class="disabledCls">
                            <i @click="prev" class="icon-prev"></i>
                        </div>
                        <div class="icon i-center" :class="disabledCls">
                            <i @click="togglePlaying" :class="playIcon"></i>
                        </div>
                        <div class="icon i-right" :class="disabledCls">
                            <i @click="next" class="icon-next"></i>
                        </div>
                        <div class="icon i-right">
                            <i class="icon icon-not-favorite"></i>
                        </div>
                    </div>
                </div>

            </div>
        </transition>

        <transition name="mini">
            <div class="mini-player" v-show="!fullScreen" @click="open">
                <div class="icon" :class="cdCls">
                    <img width="40" height="40" :src="currentSong.image">
                </div>

                <div class="text">
                    <h2 class="name">{{currentSong.name}}</h2>
                    <p class="desc">{{currentSong.singer}}</p>
                </div>

                <div class="control">
                    <i @click.stop="togglePlaying" :class="miniIcon"></i>
                </div>

                <div class="control">
                    <i class="icon-playlist"></i>
                </div>
            </div>
        </transition>

        <!-- <audio ref="audio" :src="currentSong.url"></audio> -->
        <audio @timeupdate="updateTime" @error="error" @canplay="ready" ref="audio" src="http://aqqmusic.tc.qq.com/amobile.music.tc.qq.com/C400002qpjAV2lYx81.m4a?guid=4278676584&vkey=2C469CE50C4290B1ECFA1FFA3D0651180014B6BD5679990351DE3C112D99FA1A8994408F330DA03F2C4BCF134041F7E8E62913836D375CC7&uin=0&fromtag=38"></audio>

    </div>
</template>

<script>
import {mapGetters, mapMutations} from 'vuex';
import animations from 'create-keyframe-animation';

export default {
    name: 'player',
    data () {
        return {
            songReady: false,
            currentTime: 0
        }
    },
    methods: {
        back () {
            this.setFullScreen(false);
        },
        open () {
            this.setFullScreen(true);
        },
        enter (el, done) {

            const {x,y,scale} = this.getPosAndScale();

            var animation = {
                0: {
                    transform: `translate3d(${x}px,${y}px,0) scale(${scale})`
                },
                60: {
                    transform: `translate3d(0,0,0) scale(1.1)`
                },
                100: {
                    transform: `translate3d(0,0,0) scale(1)`
                }
            }

            animations.registerAnimation({
                name: 'move',
                animation,
                presets: {
                    duration: 400,
                    easing: "linear"
                }
            })

            animations.runAnimation(this.$refs.cdWrapper, 'move', done);

        },
        afterEnter () {
            animations.unregisterAnimation('move');
            this.$refs.cdWrapper.style.animation = '';
        },
        leave(el, done) {
            this.$refs.cdWrapper.style.transition = 'all .4s';
            const {x,y,scale} = this.getPosAndScale();
            this.$refs.cdWrapper.style.transform = `translate3d(${x}px,${y}px,0) scale(${scale})`;
            this.$refs.cdWrapper.addEventListener("transitionend", done);
        },
        afterLeave () {
            this.$refs.cdWrapper.style.transition = '';
            this.$refs.cdWrapper.style.transform  = '';
        },
        getPosAndScale () {
            const targetWidth   = 40;
            const paddingLeft   = 40;
            const paddingBottom = 30;
            const paddingTop    = 80;
            const width         = window.innerWidth * 0.8;
            const scale         = targetWidth / width;
            const x             = -(window.innerWidth / 2 - paddingLeft);
            const y             = window.innerHeight - paddingTop - (width/2) - paddingBottom;

            return {
                x,y,scale
            }

        },
        togglePlaying () {
            this.setPlayingState(!this.playing);
        },
        next () {

            if (!this.songReady) return;

            const index = this.currentIndex + 1;
            if (index === this.playList.length) {
                index = 0;
            }
            this.setCurrentIndex(index);

            if (!this.playing) {
                this.togglePlaying()
            }

            // this.songReady = false;
            // 由於前 song url 為固定，直接調用 ready ()
            this.ready();

        },
        prev () {

            if (!this.songReady) return;

            const index = this.currentIndex - 1;
            if (index === -1) {
                index = this.playList.length - 1;
            }
            this.setCurrentIndex(index);

            if (!this.playing) {
                this.togglePlaying()
            }

            // this.songReady = false;
        },
        ready () {
            this.songReady = true;
        },
        error () {
            this.songReady = true;
        },
        updateTime(e) {
            this.currentTime = e.target.currentTime;
        },
        format(interval) {
            interval = interval | 0 ;
            const minute = interval / 60 | 0;
            const second = this.pad(interval % 60) ;
            return `${minute}:${second}`
        },
        pad (num, n=2) {
            var len = num.toString().length;
            while (len < n) {
                num = '0' + num;
                len++
            }
            return num;
        },
        ...mapMutations({
            setFullScreen: 'SET_FULL_SCREEN',
            setPlayingState: 'SET_PLAYING_STATE',
            setCurrentIndex: 'SET_CURRENT_INDEX'
        })
    },
    computed: {
        ...mapGetters([
            'fullScreen',
            'playList',
            'currentSong',
            'playing',
            'currentIndex'
        ]),
        playIcon () {
            return this.playing ? 'icon-pause' : 'icon-play'
        },
        miniIcon () {
            return this.playing ? 'icon-pause-mini' : 'icon-play-mini'
        },
        disabledCls () {
            return this.songReady ? '' : 'disable'
        },
        cdCls () {
            return this.playing ? 'play' : 'play pause';
        }
    },
    watch: {
        currentSong() {
            this.$nextTick(() => {
                this.$refs.audio.play();
            })
        },
        playing (newPlaying) {
            const audio = this.$refs.audio;

            this.$nextTick(() => {
                newPlaying ? audio.play() : audio.pause();
            })
        }
    }
}
</script>

<style lang="scss" scoped>
@import '~common/scss/const.scss';
@import '~common/scss/mixin.scss';

.player {
    .normal-player {
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        z-index: 150;
        background: $color-background;
        .background {
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            z-index: -1;
            opacity: .6;
            filter: blur(20px);
        }

        .top {
            .icon-back {
                position: absolute;
                top: 0;
                left: 6px;
                z-index: 50;

                display: block;
                padding: 9px;
                font-size: $font-size-large-x;
                color: $color-theme;
                transform: rotate(-90deg);
            }

            .title {
                width: 70%;
                margin: 0 auto;
                line-height: 40px;
                text-align: center;
                @include no-wrap();
                font-size: $font-size-large;
                color: $color-text;
            }

            .subtitle {
                line-height: 20px;
                text-align: center;
                font-size: $font-size-medium;
                color: $color-text;
            }
        }

        .middle {
            position: fixed;
            width: 100%;
            top: 80px;
            bottom: 170px;
            white-space: nowrap;
            font-size: 0;

            &-l {
                display: inline-block;
                vertical-align: top;
                position: relative;
                width: 100%;
                height: 0;
                padding-top: 80%;

                .cd-wrapper {
                    position: absolute;
                    left: 10%;
                    top: 0;
                    width: 80%;
                    height: 100%;

                    .cd {
                        width: 100%;
                        height: 100%;
                        box-sizing: border-box;
                        border: 10px solid rgba(255,255,255,.1);
                        border-radius: 50%;

                        &.play {
                            animation: rotate 20s linear infinite;
                        }

                        &.pause {
                            animation-play-state: paused;
                        }

                        .image {
                            position: absolute;
                            left: 0;
                            top: 0;
                            width: 100%;
                            height: 100%;
                            border-radius: 50%;
                        }
                    }
                }
            }
        }

        .bottom {
            position: absolute;
            bottom: 50px;
            width: 100%;

            .operators {
                display: flex;
                align-items: center;

                &.disabledCls {
                    color: $color-theme-d;
                }

                .icon {
                    flex: 1;
                    color: $color-theme;

                    i {
                        font-size: 30px;
                    }
                }

                .i-left {
                    text-align: right;
                }

                .i-center {
                    padding: 0 20px;
                    text-align: center;
                    i {
                        font-size: 40px;
                    }
                }

                .i-right {
                    text-align: left;
                }

                .icon-favorite {
                    color: $color-sub-theme;
                }
            }
        }

        &.normal-enter-active, &.normal.leave-active {
            transition: all 3s;

            .top, .bottom {
                transition: all 3s cubic-bezier(0.86,0.18,0.82,1.32);
            }
        }

        &.nomral-enter, &.normal-leave-to {
            opacity: 0;
            .top {
                transform: translate3d(0, -100px, 0);
            }
            .bottom {
                transform: translate3d(0, 100px, 0);
            }
        }
    }

    .mini-player {
        display: flex;
        align-items: center;
        position: fixed;
        left: 0;
        bottom: 0;
        z-index: 100;
        width: 100%;
        height: 60px;
        background: $color-highlight-background;

        &.mini-enter-active, &.mini-leave-active {
            transition: all .4s;
        }

        &.mini-enter, &.mini-leave-to {
            opacity: 0;
        }

        .icon {
            flex: 0 0 40px;
            width: 40px;
            padding: 0 10px 0 20px;

            &.play {
                animation: rotate 20s linear infinite;
            }
            &.pause {
                animation-play-state: paused;
            }

            img {
                border-radius: 50%;
            }
        }

        .text {
            display: flex;
            flex-direction: column;
            justify-content: center;
            flex: 1;
            line-height: 20px;
            overflow: hidden;
            .name {
                margin-bottom: 2px;
                @include no-wrap();
                font-size: $font-size-medium;
                color: $color-text;
            }
            .desc {
                @include no-wrap();
                font-size: $font-size-small;
                color: $color-text-d
            }
        }

        .control {
            position: relative;
            flex: 0 0 30px;
            width: 30px;
            height: 30px;
            padding: 0 10px;

            .icon-playlist {
                font-size: 30px;
                color: $color-theme-d;
            }

        }
    }
}

@keyframes rotate {
    0% {
        transform: rotate(0);
    }
    100% {
        transform: rotate(360deg);
    }
}
    
</style>