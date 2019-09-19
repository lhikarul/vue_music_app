<template>
    <transition name="slide">
        <music-list :title="title" :bg-image="bgImage"></music-list>
    </transition>
</template>

<script>

import MusicList from 'components/music-list/musicList';
import {mapGetters} from 'vuex';

export default {
    components: {
        MusicList
    },
    computed: {
        title () {
            return this.dissname;
        },
        bgImage () {
            return this.disc.imgurl;
        },
        ...mapGetters([
            'disc'
        ])
    }
}
</script>