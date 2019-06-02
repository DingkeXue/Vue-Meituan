<template>
  <div id="app">
    <!--header-->
    <div class="header">
      <app-header :poiInfo="poiInfo"></app-header>
    </div>
    <!--navbar-->
    <div class="navbar">
      <app-navbar></app-navbar>
    </div>
    <!--content-->
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import Header from './components/Header'
  import Navbar from './components/Navbar'
export default {
  name: 'App',
  components:  {
    'app-header': Header,
    'app-navbar': Navbar
  },
  data() {
    return {
      poiInfo: {}
    }
  },
  created() {
    fetch('/api/goods')
      .then((response) => {
        return response.json();
      })
      .then((res) => {
        this.poiInfo = res.data.poi_info;
      })
  }
}
</script>

<style>
#app {

}
</style>
