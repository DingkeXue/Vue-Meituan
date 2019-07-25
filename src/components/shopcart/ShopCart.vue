<template>
<div class="shopcart" :class="{'heightlight': totalCount > 0}">
  <div class="shopcart-wrapper">
    <!--购物车左边-->
    <div class="content-left">
      <div class="logo-wrapper" :class="{'heightlight': totalCount > 0}">
        <span class="icon-shopping_cart logo" :class="{'heightlight': totalCount > 0}"
        @click="toggleList"
        ></span>
        <i class="num" v-show="totalCount">{{totalCount}}</i>
      </div>
      <div class="desc-wrapper">
        <p class="total-price" v-show="totalPrice">￥{{totalPrice}}</p>
        <p class="tip" :class="{'heightlight': totalCount > 0}">另需{{poiInfo.shipping_fee_tip}}</p>
      </div>
    </div>
    <!--购物车右边-->
    <div class="content-right" :class="{'heightlight': totalCount > 0}">{{payStr}}</div>
    <!--购物车详情-->
    <div class="shopcart-list" v-show="listShow" :class="{'show': listShow}">
      <div class="list-top" v-if="poiInfo.discounts2">
        {{poiInfo.discounts2[0].info}}
      </div>
      <div class="list-header">
        <div class="title">购物车</div>
        <div class="empty" @click="clearAll">
          <img src="./img/ash_bin.png">
          <span>清空购物车</span>
        </div>
      </div>
      <div class="list-content" ref="listContent">
        <ul>
          <li class="food-item" v-for="(food, index) in selectFoods" :key="index">
            <div class="desc-wrapper">
              <div class="desc-left">
                <p class="name">
                  {{food.name}}
                </p>
              </div>
              <div class="desc-right">
                ￥{{food.min_price}}
              </div>
            </div>
            <div class="cartcontrol-wrapper">
              <app-cart-control :food="food"></app-cart-control>
            </div>
          </li>
        </ul>
      </div>
      <div class="list-bottom"></div>
    </div>
  </div>
  <!--购物车蒙版-->
  <div class="shopcart-mask" v-show="listShow" @click="hideMask"></div>
</div>
</template>

<script>
  import BScroll from 'better-scroll'
  import CartControl from '../cartcontrol/CartControl'
  export default {
    data() {
      return {
        fold: true
      }
    },
    components: {
      'app-cart-control': CartControl
    },
    props: {
      poiInfo: {
        type: Object,
        default: {}
      },
      selectFoods: {
        type: Array,
        default() {
          return []
        }
      }
    },
    computed: {
      totalCount() {
        let num = 0;
        this.selectFoods.forEach((item) => {
          num += item.count;
          // console.log(num);
        });
        return num;
      },
      totalPrice() {
        let total = 0;
        this.selectFoods.forEach((item) => {
          total += item.count * parseFloat(item.min_price);
        });
        return total;
      },
      payStr() {
        if (this.totalCount > 0) {
          return "去结算";
        } else {
          return this.poiInfo.min_price_tip;
        }
      },
      listShow() {
        if (!this.totalCount) {
          this.fold = true;
          return false;
        } else {
          let show = !this.fold;
          if (show) {
            this.$nextTick(() => {
              if (!this.shopScroll) {
                this.shopScroll = new BScroll(this.$refs.listContent, {
                  click: true
                })
              } else {
                this.shopScroll.refresh();
              }
            });
          }
          return show;
        }
      }
    },
    methods: {
      toggleList() {
        if (!this.totalCount) {
          return;
        } else {
          this.fold = !this.fold;
        }
      },
      hideMask() {
        this.fold = true;
      },
      clearAll() {
        this.selectFoods.forEach(food => {
          food.count = 0;
        })
      }
    }
  }
</script>

<style scoped>
  @import url(../../common/css/icon.css);

  .shopcart-wrapper {
    width: 100%;
    height: 51px;
    background: #514f4f;
    position: fixed;
    left: 0;
    bottom: 0;
    display: flex;
    z-index: 99;
  }

  .shopcart-wrapper .content-left {
    flex: 1;
  }

  .content-right {
    flex: 0 0 110px;
    font-size: 15px;
    color: #BAB9B9;
    line-height: 61px;
    text-align: center;
    font-weight: bold;
  }

  .logo-wrapper {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: #666666;
    position: relative;
    top: -14px;
    left: 10px;
    text-align: center;
    float: left;
  }

  .logo-wrapper .logo {
    font-size: 28px;
    color: #c4c4c4;
    line-height: 50px;
  }

  .desc-wrapper {
    float: left;
    margin-left: 13px;
  }

  .desc-wrapper .total-price {
    font-size: 18px;
    line-height: 33px;
    color: white;
    margin: 0;
  }

  .desc-wrapper .tip {
    font-size: 12px;
    color: #bab9b9;
    line-height: 31px;
    margin-top: 0;
  }

  /* 货物车里有物品时状态 */
  .heightlight {
    color: #fff161;
  }

  .logo.heightlight,
  .content-right.heightlight {
    color: #2D2B2A;
  }

  .tip.heightlight {
    line-height: 12px;
  }

  .content-right.heightlight,
  .logo-wrapper.heightlight {
    background: #ffd161;
  }

  .logo-wrapper .num {
    width: 17px;
    height: 17px;
    border-radius: 50%;
    color: white;
    position: absolute;
    background: red;
    right: 0;
    top: 0;
    font-size: 11px;
  }

  /* 购物车详情 */
  .shopcart-list {
    position: absolute;
    left: 0;
    top: 0;
    z-index: -1;
    width: 100%;
    color: #646158;
  }

  .shopcart-list ul {
    padding-left: 0;
    list-style: none;
  }

  .shopcart-list.show {
    transform: translateY(-100%);
  }

  .shopcart-list .list-top {
    height: 30px;
    text-align: center;
    line-height: 30px;
    font-size: 11px;
    background: #f3e6c6;
    color: #646158;
  }

  .list-header {
    height: 30px;
    background: #f4f4f4;
  }

  .title {
    float: left;
    border-left: 4px solid #53c123;
    padding-left: 6px;
    line-height: 30px;
    font-size: 12px;
  }

  .empty {
    float: right;
    line-height: 30px;
    margin-right: 10px;
    font-size: 0;
  }

  .empty img {
    height: 14px;
    margin-right: 9px;
    vertical-align: middle;
  }

  .empty span {
    font-size: 12px;
    vertical-align: middle;
  }

  .list-content {
    max-height: 360px;
    overflow: hidden;
    background: white;
  }

  .food-item {
    height: 38px;
    padding: 12px;
    border-bottom: 1px solid #f4f4f4;
  }

  .food-item .desc-wrapper,
  .food-item .desc-left {
    float: left;
  }

  .food-item .desc-wrapper,
  .food-item .desc-left {
    width: 60%;
  }

  .desc-left .name {
    font-size: 16px;
    height: 24px;
    /*超出部分隐藏*/
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    -webkit-line-clamp: 1;
  }

  .desc-left .unit,
  .desc-left .description {
    font-size: 12px;
    color: #b4b4b4;
  }

  .desc-left .description {
    /*超出部分隐藏*/
    overflow: hidden;
    height: 12px;
  }

  .desc-wrapper .desc-right {
    float: right;
    width: 70px;
    text-align: right;
  }

  .desc-right {
    font-size: 12px;
    line-height: 38px;
  }

  .cartcontrol-wrapper {
    float: right;
    margin-top: 6px;
  }

  .shopcart-mask {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 98;
    background: rgba(7, 17, 27, .5);
  }
</style>
