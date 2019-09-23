<template>
    <div>
        <music-list :rank="rank" :title="title" :bg-image="bgImage" :songs="songs"></music-list>
    </div>
</template>

<script>
import MusicList from 'components/music-list/musicList';
import {mapGetters} from 'vuex';
import {getMusicList} from 'api/rank';
import {ERR_OK} from 'api/config';
import {createSong} from 'common/js/song';

export default {
    name: 'topList',
    components: {
        MusicList
    },
    data () {
        return {
            songs: [],
            rank: true
        }
    },
    methods: {
        _getMusicList () {

            if (!this.topList.id) {
                this.$router.push({
                    path: '/rank'
                })
                return;
            }

            getMusicList(this.topList.id).then((res) => {
                this.songs = this.normalizeSongs(res.songlist);
            })
        },
        normalizeSongs (list) {
            var ret = [];
            list.forEach((item) => {
                const musicData = item.data;
                if (musicData.songid && musicData.albumid) {
                    ret.push(createSong(musicData))
                }
            })
            return ret;
        }
    },
    computed: {
        title () {
            return this.topList.topTitle;
        },
        bgImage () {
            if (this.songs.length) {
                return this.songs[0].image;
            }
            return ''
        },
        ...mapGetters([
            'topList'
        ])
    },
    created () {
        this._getMusicList();
    }
}
</script>

<style lang="scss" scoped>
    
</style>