<template>
    <div class="player" v-show="playList.length > 0">
        <div class="normal-player" v-show="fullScreen">
            撥放器
        </div>
        <div class="mini-player" v-show="!fullScreen"></div>
    </div>
</template>

<script>
import {mapGetters} from 'vuex';

export default {
    name: 'player',
    computed: {
        ...mapGetters([
            'fullScreen',
            'playList'
        ])
    }
}
</script>

<style lang="scss" scoped>
@import '~common/scss/const.scss';
@import '~common/scss/mixin.scss';

.player {
    .normal-player {
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        z-index: 150;
        background: $color-background;
    }
}
    
</style>