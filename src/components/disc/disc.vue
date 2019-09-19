<template>
    <div>
        <music-list :title="title" :bg-image="bgImage" :songs="songs"></music-list>
    </div>
</template>

<script>

import MusicList from 'components/music-list/musicList';
import {mapGetters} from 'vuex';

import {ERR_OK} from 'api/config';
import {getSongList} from 'api/recommend';

import {createSong} from 'common/js/song';

export default {
    components: {
        MusicList
    },
    data () {
        return {
            songs: []
        }
    },
    methods: {
        _getSongList () {

            if (!this.dissid) {
                this.$router.push('/recommend');
                return;
            }

            getSongList(this.disc.dissid).then((res) => {
                if (res.code === ERR_OK) {
                    this.songs = this.normalizeSongs(res.cdlist[0].songlist);
                }
            })
        },
        normalizeSongs (list) {
            var ret = [];
            list.forEach((musicData) => {
                if (musicData.songid && musicData.albumid) {
                    ret.push(createSong(musicData));
                }
            })
            return ret;
        }
    },
    computed: {
        title () {
            return this.disc.dissname;
        },
        bgImage () {
            return this.disc.imgurl;
        },
        ...mapGetters([
            'disc'
        ])
    },
    created () {
        this._getSongList();
    }
}
</script>