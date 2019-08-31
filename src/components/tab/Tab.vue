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

@import '~common/scss/const';
@import '~common/scss/mixin';

    .tab {
        display: flex;
        height: 44px;
        line-height: 44px;
        text-align: center;

        &-item {
            flex: 1;
        }

        &-item-link {
            padding-bottom: 5px;
            color: $color-text-l;
        }

        &-item.router-link-active {
            .tab-item-link {
                color: $color-theme;
                border-bottom: 2px solid $color-theme;
            }
        }
    }
</style>