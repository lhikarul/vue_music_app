<template>
    <div class="song-list">
        <ul>
            <li v-for="(song,index) in songs" :key="index" class="item" @click="selectItem(song,index)">
                <div class="content">
                    <h2 class="name">{{song.name}}</h2>
                    <p class="desc">{{getSongDesc(song)}}</p>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: "songList",
    props: {
        songs: {
            type: Array,
            default: []
        }
    },
    methods: {
        getSongDesc (song) {
            return `${song.singer} / ${song.album}`;
        },
        selectItem(item,index) {
            // 選歌
            this.$emit('select', item, index);
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