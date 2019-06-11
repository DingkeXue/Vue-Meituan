<template>
  <div class="cart-control">
    <!--现实减号和购物数量时动画-->
   <transition name="move">
     <div class="cart-decrease icon-remove_circle_outline" v-show="food.count" @click.stop.prevent="decreaseCart"></div>
   </transition>
    <div class="cart-count" v-show="food.count">
      {{food.count}}
      <i class="bg"></i>
    </div>
    <div class="cart-add icon-add_circle" @click.stop.prevent="increaseCart">
      <i class="bg"></i>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
export default  {
  props: {
    food: {
      type: Object
    }
  },
  methods: {
    increaseCart() {
      if (!this.food.count) {
        Vue.set(this.food, "count", 1);
      } else {
        this.food.count++;
      }
    },
    decreaseCart() {
      this.food.count--;
    }
  }
}
</script>

<style>
  @import url(../../common/css/icon.css);
  .cart-control {
    font-size: 0;
  }
  
  .cart-decrease,
  .cart-add {
    display: inline-block;
    width: 26px;
    height: 26px;
    font-size: 26px;
  }

  .cart-decrease {
    color: #b4b4b4;
  }

  .cart-add .bg {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: black;
    position: absolute;
    left: 3px;
    top: 3px;
    z-index: -1;
  }
  
  .cart-count {
    display: inline-block;
    width: 25px;
    text-align: center;
    font-size: 12px;
    line-height: 26px;
    vertical-align: top;
  }
  
  .cart-add {
    color: #ffd161;
    position: relative;
  }

  /* 动画 */
  .move-enter-active,
  .move-leave-active {
    transition: all .2s linear;
  }

  .move-enter,
  .move-leave-to {
    transform: translateX(20px) rotate(180deg);
  }
</style>
