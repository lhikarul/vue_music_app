<template>
  <div id="app">
    <my-header></my-header>
    <my-tab></my-tab>

    <keep-alive>
      <router-view></router-view>
    </keep-alive>

    <player></player>

  </div>
</template>

<script>
  import MyHeader from 'components/header/Header';
  import MyTab from 'components/tab/Tab';
  import Player from 'components/player/player';

  export default {
    name: 'home',
    components: {
      MyHeader,
      MyTab,
      Player
    }
  }
</script>

<style lang="scss">
</style>
