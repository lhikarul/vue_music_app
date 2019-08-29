<template>
    <transition name="slide">
        <music-list :songs="songs" :bg-image="bgImage" :title="title"></music-list>
    </transition>
</template>

<script>
import {mapGetters} from 'vuex';

import {requestSingerDetail} from 'api/singer';
import {ERR_OK} from 'api/config';
import {getSongVkey} from 'api/song';

import MusicList from 'components/music-list/musicList';
import {createSong} from 'common/js/song';

export default {
    name: "SingerDetail",
    components: {
        MusicList
    },
    data () {
        return {
            songs: []
        }
    },
    methods: {
        getSingerDetail () {
            if (!this.singer.id) {
                this.$router.push('/singer');
                return;
            }

            requestSingerDetail(this.singer.id).then((res) => {
                if (res.code === ERR_OK) {
                    this.songs = this.normalizeSongs(res.data.list);
                }
            })
        },
        normalizeSongs (list) {
            var ret = [];
            list.forEach((item) => {

                let {musicData} = item;
                if (musicData.songid && musicData.albummid) {
                    ret.push(createSong(musicData))
                }

                // let {musicData} = item;

                // getSongVkey(musicData.songmid).then((res) => {
                //     const songVkey = res.data.items[0].vkey
                //     if (musicData.songid && musicData.albummid) {

                //         ret.push(createSong(musicData, songVkey))
                //     }
                // })

            })

            return ret;
        }
    },
    computed: {
        title () {
            return this.singer.name;
        },
        bgImage () {
            return this.singer.avatar;
        },
        ...mapGetters([
            'singer'
        ])
    },
    created () {
        this.getSingerDetail()
    }
}
</script>

<style lang="scss" scoped>
@import '~common/scss/mySingerDetail/mySingerDetail';

</style>