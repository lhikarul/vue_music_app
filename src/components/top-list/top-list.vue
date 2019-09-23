<template>
    <div>
        <music-list :title="title" :bg-image="bgImage"></music-list>
    </div>
</template>

<script>
import MusicList from 'components/music-list/musicList';
import {mapGetters} from 'vuex';

export default {
    name: 'topList',
    components: {
        MusicList
    },
    computed: {
        title () {
            return this.topList.topTitle;
        },
        bgImage () {
            return this.topList.picUrl;
        },
        ...mapGetters([
            'topList'
        ])
    }
}
</script>

<style lang="scss" scoped>
    
</style>