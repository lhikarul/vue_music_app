<template>
    <div id="app">
        <header-component></header-component>
        <Tab></Tab>

        <!-- 將 dom 緩存至內存 -->
        <keep-alive> 
            <router-view></router-view>
        </keep-alive>

    </div>
</template>

<script>
import HeaderComponent from 'components/header/Header';
import Tab from 'components/tab/Tab';

export default {
    name: 'app',
    components: {
        HeaderComponent,
        Tab
    }
}
</script>

<style lang="scss">


</style>