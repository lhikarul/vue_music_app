<template>
  <div id="app">
    <my-header></my-header>
    <my-tab></my-tab>
    <router-view></router-view>
  </div>
</template>

<script>
  import MyHeader from 'components/header/Header';
  import MyTab from 'components/tab/Tab';

  export default {
    name: 'home',
    components: {
      MyHeader,
      MyTab
    }
  }
</script>

<style lang="scss">
</style>
