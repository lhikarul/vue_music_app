<template>

        <div class="singer-detail">
    
        </div>

</template>

<script>
import {mapGetters} from 'vuex';

export default {
    name: 'SingerDetail',
    computed: {
        ...mapGetters([
            'singer'
        ])
    },
    created () {
        console.log(this.singer)
    }
}
</script>

<style lang="scss" scoped>
    @import '~common/scss/const';
    .singer-detail {
        position: fixed;
        z-index: 100;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: $color-background;
    }
</style>