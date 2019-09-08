<template>
    <div class="song-list">
        <ul>
            <li v-for="(song,index) in songs" :key="index" class="item">
                <div class="content">
                    <h2 class="name">{{song.name}}</h2>
                    <p class="desc">{{getDesc(song)}}</p>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'songList',
    props: {
        songs: {
            type: Array,
            default: []
        }
    },
    methods: {
        getDesc(song) {
            return `${song.singer}/${song.album}`
        }
    }
}
</script>

<style lang="scss" scoped>
@import "~@/common/scss/const.scss";
@import "~@/common/scss/mixin.scss";
    .song-list {
        .item {
            display: flex;
            align-items: center;
            box-sizing: border-box;
            height: 64px;
            font-size: $font-size-medium;
        }
        .content {
            flex: 1;
            line-height: 20px;
            overflow: hidden;
            .name {
                @include no-wrap();
                color: $color-text;
            }
            .desc {
                @include no-wrap();
                margin-top: 4px;
                color: $color-text-d;
            }
        }
    }
</style>