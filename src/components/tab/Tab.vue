<template>
    <div class="tab">
        <router-link tag="div" class="tab-item" :to="{name: 'recommend'}">
            <span class="tab-item-link">推薦</span>
        </router-link>
        <router-link tag="div" class="tab-item" :to="{name: 'singer'}">
            <span class="tab-item-link">歌手</span>
        </router-link>
        <router-link tag="div" class="tab-item" :to="{name: 'rank'}">
            <span class="tab-item-link">排行</span>
        </router-link>
        <router-link tag="div" class="tab-item" :to="{name: 'search'}">
            <span class="tab-item-link">搜索</span>
        </router-link>
    </div>
</template>

<script>
export default {
    name: 'Tab'
}
</script>

<style lang="scss" scoped>

@import '~common/scss/tab/tab';

</style>