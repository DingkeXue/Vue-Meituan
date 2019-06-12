<template>
  <div class="nav">
    <router-link class="nav-item" to="/goods"> 点餐 <i class="line"></i></router-link>
    <router-link class="nav-item" to="/ratings"> 评价({{commentNum}}) <i class="line"></i></router-link>
    <router-link class="nav-item" to="/seller"> 商家 <i class="line"></i></router-link>
  </div>
</template>

<script>
  export default {
    props: {
      commentNum: {
        type: Number,
        default: 0
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.nav {
  display: flex;
  height: 45px;
  line-height: 40px;
  width: 100%;
  justify-content: space-around;
  border-bottom: 1px solid #e4e4e4;
  }

.nav-item {
  text-decoration: none;
  color: #666666;
  text-align: center;
  position: relative;
}

.nav .active {
  color: #ffbb22;
}

.nav .active .line {
  border-bottom: 1px solid #FFBB22;
  width: 20px;
  height: 2px;
  margin-left: -10px;
  left: 50%;
  bottom: 0;
  position: absolute;
}
</style>
