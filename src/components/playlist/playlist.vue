<template>
    <transition name="list-fade">
        <div class="playlist" v-show="showFlag" @click="hide">
            <div class="list-wrapper" @click.stop>
                <div class="list-header">
                    <h1 class="title">
                        <i class="icon" :class="iconMode" @click="changeMode"></i>
                        <span class="text">{{modeText}}</span>
                        <span class="clear" @click="showConfirm"><i class="icon-clear"></i></span>
                    </h1>
                </div>
                <scroll ref="listContent" :data="sequenceList" class="list-content">
                    <transition-group name="list" tag="ul" :refreshDelay="refreshDelay">
                        <li :key="item.id" ref="listItem" class="item" v-for="(item,index) in sequenceList" @click="selectItem(item,index)">
                            <i class="current" :class="getCurrentIcon(item)"></i>
                            <span class="text">{{item.name}}</span>
                            <span class="like" @click.stop="toggleFavorite(item)">
                                <i :class="getFavoriteIcon(item)"></i>
                            </span>
                            <span class="delete" @click.stop="deleteOne(item)">
                                <i class="icon-delete"></i>
                            </span>
                        </li>
                    </transition-group>
                </scroll>

                <div class="list-operate">
                    <div class="add" @click="addSong">
                        <i class="icon-add"></i>
                        <span class="text">添加歌曲</span>
                    </div>
                </div>

                <div class="list-close" @click="hide">
                    <span>關閉</span>
                </div>
                <confirm @confirm="confirmClear" ref="confirm" text="是否清空撥放列表" confirmBtnText="清空"></confirm>
                <add-song ref="addSong"></add-song>
            </div>
        </div>
    </transition>
</template>

<script>

import {mapActions} from 'vuex';
import {playMode} from 'common/js/config';
import Scroll from 'base/scroll/scroll';
import Confirm from 'base/confirm/confirm';
import {playerMixin} from 'common/js/mixin';

import AddSong from 'components/add-song/add-song';

export default {
    name: 'playlist',
    mixins: [playerMixin],
    components: {
        Scroll,
        Confirm,
        AddSong
    },
    data () {
        return {
            showFlag: false,
            refreshDelay: 100
        }
    },
    methods: {
        show () {
            this.showFlag = true;
            setTimeout(() => {
                this.$refs.listContent.refresh();
                this.scrollToCurrent(this.currentSong);
            },20);
        },
        hide () {
            this.showFlag = false;
        },
        getCurrentIcon (item) {
            if (this.currentSong.id === item.id) {
                return 'icon-play';
            }

            return '';
        },
        selectItem(item,index) {
            if (this.mode === playMode.random) {
                index = this.playlist.findIndex((song) => {
                    return song.id === item.id;
                })
            }
            this.setCurrentIndex(index)
            this.setPlayingState(true)
        },
        scrollToCurrent (current) {
            const index = this.sequenceList.findIndex((song) => {
                return current.id === song.id;
            })
            this.$refs.listContent.scrollToElement(this.$refs.listItem[index], 300);
        },
        deleteOne (item) {
            this.deleteSong(item);
            if (!this.playlist.length) {
                this.hide();
            }
        },
        showConfirm () {
            this.$refs.confirm.show();
        },
        confirmClear () {
            this.deleteSongList();
            this.hide();
        },
        addSong () {
            this.$refs.addSong.show();
        },
        ...mapActions([
            'deleteSong',
            'deleteSongList'
        ])
    },
    computed: {
        modeText () {
            return this.mode === playMode.sequence ? '順序撥放' : this.mode === playMode.random ? '隨機撥放' : '單曲循環';
        }
    },
    watch: {
        currentSong (newSong,oldSong) {
            if (!this.showFlag || newSong.id === oldSong.id ) return;

            this.scrollToCurrent(newSong);
        }
    }
}
</script>

<style lang="scss" scoped>
    @import '~common/scss/const';
    @import '~common/scss/mixin';

    .playlist {

        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 200;
        background-color: $color-background-d;

        &.list-fade-enter-active, &.list-fade-leave-active {

            transition: opacity .3s;

            .list-wrapper {
                transition: all .3s;
            }

        }

        &.list-fade-enter, &.list-fade-leave-to {
            opacity: 0;

            .list-wrapper {
                transform: translate3d(0,100%,0);
            }
        }

        .list-wrapper {
            position: absolute;
            left: 0;
            bottom: 0;
            width: 100%;
            background-color: $color-highlight-background;

            .list-header {
                position: relative;
                padding: 20px 30px 10px 20px;

                .title {
                    display: flex;
                    align-items: center;
                    .icon {
                        margin-right: 10px;
                        font-size: 30px;
                        color: $color-theme-d;
                    }
                    .text {
                        flex: 1;
                        font-size: $font-size-medium;
                        color: $color-text-l;
                    }
                    .clear {
                        .icon-clear {
                            font-size: $font-size-medium;
                            color: $color-text-d;
                        }
                    }
                }
            }

            .list-content {
                
                max-height: 240px;
                overflow: hidden;

                .item {

                    display: flex;
                    align-items: center;
                    height: 40px;
                    padding: 0 30px 0 20px;
                    overflow: hidden;

                    &.list-enter-active, &.list-leave-active {
                        transition: all 0.1s;
                    }
                    &.list-enter, &.list-leave-to {
                        height: 0;
                    }

                    .current {
                        flex: 0 0 20px;
                        width: 20px;
                        font-size: $font-size-small;
                        color: $color-theme-d;
                    }

                    .text {
                        flex: 1;
                        font-size: $font-size-medium;
                        color: $color-text-d;
                    }

                    .like {
                        margin-right: 15px;
                        font-size: $font-size-small;
                        color: $color-theme;
                        .icon-favorite {
                            color: $color-sub-theme;
                        }
                    }

                    .delete {
                        font-size: $font-size-small;
                        color: $color-theme;
                    }
                }
            }

        }

        .list-operate {

            width: 140px;
            margin: 20px auto 30px auto;

            .add {
                display: flex;
                align-items: center;
                padding: 8px 16px;
                border: 1px solid $color-text-l;
                border-radius: 100px;
                color: $color-text-l;
            }

            .icon-add {
                margin-right: 5px;
                font-size: $font-size-small-s;
            }

            .text {
                font-size: $font-size-small;
            }

        }

        .list-close {
            text-align: center;
            line-height: 50px;
            background: $color-background;
            font-size: $font-size-medium-x;
            color: $color-text-l;
        }
    }

</style>