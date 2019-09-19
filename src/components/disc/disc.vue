<template>
    <div>
        <music-list :title="title" :bg-image="bgImage"></music-list>
    </div>
</template>

<script>

import MusicList from 'components/music-list/musicList';
import {mapGetters} from 'vuex';

import {ERR_OK} from 'api/config';
import {getSongList} from 'api/recommend';

export default {
    components: {
        MusicList
    },
    methods: {
        _getSongList () {
            console.log('wtf')
            getSongList(this.disc.dissid).then((res) => {
                if (res.code === ERR_OK) {
                    console.log(res.cdlist[0].songlist)
                }
            })
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