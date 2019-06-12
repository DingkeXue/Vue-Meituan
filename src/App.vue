<template>
  <div id="app">
    <!--header-->
    <div class="header">
      <app-header :poiInfo="poiInfo"></app-header>
    </div>
    <!--navbar-->
    <div class="navbar">
      <app-navbar :commentNum="commentNum"></app-navbar>
    </div>
    <!--content-->
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import Header from './components/header/Header'
  import Navbar from './components/nav/Navbar'
export default {
  name: 'App',
  components:  {
    'app-header': Header,
    'app-navbar': Navbar
  },
  data() {
    return {
      poiInfo: {},
      commentNum: 0
    }
  },
  created() {
    // 获取商品数据
    fetch('/api/goods')
      .then((response) => {
        return response.json();
      })
      .then((res) => {
        this.poiInfo = res.data.poi_info;
      })
      .catch(() => {
        alert('数据请求出错啦');
      });
    // 获取评价数据
    fetch('/api/ratings')
      .then(response => {
        return response.json();
      })
      .then(res => {
        this.commentNum = res.data.comment_num;
      })
      .catch(() => {
        alert('数据请求出错啦');
      })
  }
}
</script>

<style>
#app {

}
</style>
