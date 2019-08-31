<template>
    <div id="app">
        <header-component></header-component>
        <Tab></Tab>
        <router-view></router-view>
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