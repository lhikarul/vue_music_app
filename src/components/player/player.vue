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
                            <div class="cd">
                                <img class="image" :src="currentSong.image">
                            </div>
                        </div>
                    </div>
                </div>

                <div class="bottom">
                    <div class="operators">
                        <div class="icon i-left">
                            <i class="icon-sequence"></i>
                        </div>
                        <div class="icon i-left">
                            <i class="icon-prev"></i>
                        </div>
                        <div class="icon i-center">
                            <i class="icon-play"></i>
                        </div>
                        <div class="icon i-right">
                            <i class="icon-next"></i>
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
                <div class="icon">
                    <img width="40" height="40" :src="currentSong.image">
                </div>

                <div class="text">
                    <h2 class="name">{{currentSong.name}}</h2>
                    <p class="desc">{{currentSong.singer}}</p>
                </div>

                <div class="control"></div>

                <div class="control">
                    <i class="icon-playlist"></i>
                </div>
            </div>
        </transition>

    </div>
</template>

<script>
import {mapGetters, mapMutations} from 'vuex';
import animations from 'create-keyframe-animation';

export default {
    name: 'player',
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
        ...mapMutations({
            setFullScreen: 'SET_FULL_SCREEN'
        })
    },
    computed: {
        ...mapGetters([
            'fullScreen',
            'playList',
            'currentSong'
        ])
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
    
</style>