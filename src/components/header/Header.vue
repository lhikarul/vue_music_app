<template>
    <div class="header">
        <div class="icon"></div>
        <h1 class="text">Chick Music</h1>
        <router-link to="/user" class="mine" tag="div">
            <i class="icon-mine"></i>
        </router-link>
    </div>
</template>

<script>
export default {
    name: 'headerComponent'
}
</script>

<style lang="scss" scoped>
    @import '~common/scss/header/header';
    
    .mine {
        position: absolute;
        top: 0;
        right: 0;
    }

    .icon-mine {
        display: block;
        padding: 12px;
        font-size: 20px;
        color: #ffcd32;
    }

</style>