<template>
    <scroll class="suggest" :data="result" :pullup="pullup" :beforeScroll="beforeScroll" @beforeScroll="listScroll" @scrollToEnd="searchMore" ref="suggest">
        <ul class="suggest-list">
            <li @click="selectItem(item)" class="suggest-item" v-for="(item,index) in result" :key="index">
                <div class="icon">
                    <i :class="getIconCls(item)"></i>
                </div>
                <div class="name">
                    <p class="text">{{getDisplayName(item)}}</p>
                </div>
            </li>
            <loading v-show="hasMore" title=""></loading>
        </ul>
        <div class="no-result-wrapper">
            <no-result v-show="!hasMore && !result.length" title="暫無搜尋結果"></no-result>
        </div>
    </scroll>
</template>

<script>
import {search} from 'api/search';
import {ERR_OK} from 'api/config';
import {createSong} from 'common/js/song';

import Scroll from 'base/scroll/scroll';
import Loading from 'base/loading/loading';
import Singer from 'common/js/singer';

import {mapMutations,mapActions} from 'vuex';

import NoResult from 'base/no-result/no-result';

const TYPE_SINGER = 'singer';
const perpage = 20;

export default {
    name: 'suggest',
    props: {
        query: {
            type: String,
            default: ''
        },
        showSinger: {
            type: Boolean,
            default: true
        }
    },
    components: {
        Scroll,
        Loading,
        NoResult
    },
    data () {
        return {
            page: 1,
            result: [],
            pullup: true,
            hasMore: true,
            beforeScroll: true
        }
    },
    methods: {
        _search () {
            this.page = 1;
            this.hasMore = true;
            this.$refs.suggest.scrollTo(0,0);

            search(this.query,this.page,this.showSinger,perpage).then((res) => {
                if (res.code === ERR_OK) {
                    this.result = this._getResult(res.data);
                    this.checkMore(res.data)
                }
            })
        },
        _getResult (data) {
            var ret = [];

            if (data.zhida && data.zhida.singerid) {
                ret.push({
                    ...data.zhida,
                    ...{type: TYPE_SINGER}
                })
            }

            if (data.song) {
                ret = ret.concat(this._normalizeSongs(data.song.list));
            }

            return ret;
        },
        getIconCls(item) {
            if (item.type === TYPE_SINGER) {
                return 'icon-mine';
            }else {
                return 'icon-music'
            }
        },
        getDisplayName (item) {
            if (item.type === TYPE_SINGER) {
                return item.singername
            }else {
                return `${item.name}-${item.singer}`;
            }
        },
        _normalizeSongs (list) {
            var ret = [];
            list.forEach((musicData) => {
                if (musicData.songid && musicData.albumid) {
                    ret.push(createSong(musicData));
                }
            })
            return ret;
        },
        searchMore () {
            if (!this.hasMore) return;

            this.page++;
            search(this.query, this.page, this.showSinger, perpage).then((res) => {
                if (res.code === ERR_OK) {
                    this.result = this.result.concat(this._getResult(res.data));
                    this.checkMore(res.data)
                }
            })
        },
        checkMore (data) {
            const song = data.song;
            if (!song.list.length || (song.curnum + song.curpage * perpage) > song.totalnum) {
                this.hasMore = false;
            }
        },
        selectItem (item) {

            if (item.type === TYPE_SINGER) {
                const singer = new Singer({
                    id: item.singermid,
                    name: item.singername
                })

                this.$router.push({
                    path: `/search/${singer.id}`
                })

                this.setSinger(singer);
            }else {
                this.insertSong(item)
            }

        },
        listScroll () {
            this.$emit('listScroll');
        },
        ...mapMutations({
            setSinger: 'SET_SINGER'
        }),
        ...mapActions([
            'insertSong'
        ])
    },
    watch: {
        query () {
            this._search();
        }
    }
}
</script>

<style lang="scss" scoped>
@import '~common/scss/const';
@import '~common/scss/mixin';

.suggest {
  height: 100%;
  overflow: hidden;
  .suggest-list {
    padding: 0 30px;
    .suggest-item {
      display: flex;
      align-items: center;
      padding-bottom: 20px;
    }
    .icon {
      flex: 0 0 30px;
      width: 30px;
      [class^="icon-"] {
        font-size: 14px;
        color: $color-text-d;
      }
    }
    .name {
      flex: 1;
      font-size: $font-size-medium;
      color: $color-text-d;
      overflow: hidden;
      .text {
        @include no-wrap();
      }
    }
  }
  .no-result-wrapper {
    position: absolute;
    width: 100%;
    top: 50%;
    transform: translateY(-50%);
  }
}
</style>