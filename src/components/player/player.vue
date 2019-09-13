<template>
    <div class="player" v-show="playlist.length > 0">

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
                    <div class="cd-wrapper">
                        <div class="cd">
                            <img class="image" :src="currentSong.image">
                        </div>
                    </div>
                </div>
            </div>

            <div class="bottom">
                
                <div class="progress-wrapper">
                    <span class="time time-l"></span>
                    <div class="progress-bar-wrapper">
                        
                    </div>
                    <span class="time time-r"></span>
                </div>

                <div class="operators">
                    <div class="icon i-left" >
                        <i></i>
                    </div>
                    <div class="icon i-left">
                        <i class="icon-prev"></i>
                    </div>
                    <div class="icon i-center">
                        <i></i>
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

        <div class="mini-player" v-show="!fullScreen" @click="open">
            <div class="mini-player">
                <div class="icon">
                    <img width="40" height="40" :src="currentSong.image">
                </div>

                <div class="text">
                    <h2 class="name">{{currentSong.name}}</h2>
                    <p class="desc">{{currentSong.singer}}</p>
                </div>

                <div class="control">
                    
                </div>

                <div class="control">
                    <i class="icon-playlist"></i>
                </div>
            </div>
        </div>
        
    </div>
</template>

<script>
import {mapGetters, mapMutations} from 'vuex';

export default {
    name: 'Player',
    computed: {
        ...mapGetters([
            'fullScreen',
            'playlist',
            'currentSong'
        ])
    },
    methods: {
        open () {
            this.setFullScreen(true);
        },
        back () {
            this.setFullScreen(false);
        },
        ...mapMutations({
            setFullScreen: 'SET_FULL_SCREEN'
        })
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