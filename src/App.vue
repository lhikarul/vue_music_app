<template>
    <div id="app">

        <header-component></header-component>
        <Tab></Tab>

        <!-- 將 dom 緩存至內存 -->
        <keep-alive> 
            <router-view></router-view>
        </keep-alive>

        <player></player>

    </div>
</template>

<script>
import HeaderComponent from 'components/header/Header';
import Tab from 'components/tab/Tab';
import Player from 'components/player/player';

console.log(process.env.NODE_ENV)

export default {
    name: 'app',
    components: {
        HeaderComponent,
        Tab,
        Player
    }
}
</script>

<style lang="scss">

</style>