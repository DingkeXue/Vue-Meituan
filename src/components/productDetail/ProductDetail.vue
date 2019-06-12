<template>
  <transition name="food-detail">
    <div class="food" ref="foodView" v-show="showFlag">
      <div class="food-wrapper">
        <!--外面介绍-->
        <div class="food-content">
          <div class="img-wrapper">
            <img :src="food.picture" class="food-img">
            <span class="close-bt icon-close" @click="closeView"></span>
            <img src="./img/share.png" class="share-bt">
            <img src="./img/more.png" class="more-bt">
          </div>
          <div class="content-wrapper">
            <h3 class="name">{{food.name}}</h3>
            <p class="saled">{{food.month_saled_content}}</p>
            <p class="price">
              <span class="text">￥{{food.min_price}}</span>
              <span class="unit">/{{food.unit}}</span>
            </p>
            <div class="cartcontrol-wrapper">
              <app-cart-control :food="food"></app-cart-control>
            </div>
            <div v-show="!food.count || food.count === 0" class="buy" @click="addProduct">
              购买
            </div>
          </div>
        </div>
        <app-split></app-split>
        <!--外面评价-->
        <div class="rating-wrapper">
          <!--评价头部-->
          <div class="rating-title">
            <div class="like-ratio" v-if="food.rating">
              <span class="title">{{food.rating.title}}</span>
              <span class="ratio">
                ({{food.rating.like_ratio_desc}} <i>{{food.rating.like_ratio}}</i>)
              </span>
            </div>
            <div class="snd-title" v-if="food.rating">
              <span class="text">{{food.rating.snd_title}}</span>
              <span class="icon icon-keyboard_arrow_right"></span>
            </div>
          </div>
          <!--评价内容-->
          <ul class="rating-content" v-if="food.rating">
            <li class="comment-item" v-for="(comment, index) in food.rating.comment_list" :key="index">
              <!--用户头像-->
              <div class="comment-header">
                <img :src="comment.user_icon" v-if="comment.user_icon">
                <img src="./img/anonymity.png" v-if="!comment.user_icon">
              </div>
              <!--评价具体内容-->
              <div class="comment-main">
                <div class="user">
                  {{comment.user_name}}
                </div>
                <div class="time">
                  {{comment.comment_time}}
                </div>
                <div class="content">
                  {{comment.comment_content}}
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  import BScroll from 'better-scroll'
  import Vue from 'vue'
  import Split from '../split/Split'
  import CartControl from '../cartcontrol/CartControl'

  export default {
    data() {
      return {
        showFlag: false
      }
    },
    components: {
      'app-cart-control': CartControl,
      'app-split': Split
    },
    props: {
      food: {
        type: Object
      }
    },
    methods: {
      showView() {
        this.showFlag = true;
        // console.log(this.food);

        this.$nextTick(() => {
          if (!this.BScroll) {
            this.BScroll = new BScroll(this.$refs.foodView, {
              click: true
            })
          } else {
            this.BScroll.refresh();
          }
        })
      },
      closeView() {
        this.showFlag = false;
      },
      addProduct() {
        Vue.set(this.food, "count", 1);
      }
    }
  }
</script>

<style scoped>
  @import "../../common/css/icon.css";

  .food {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 51px;
    background: white;
    z-index: 97;
  }

  /* 图片部分 */
  .food,
  .img-wrapper,
  .food-content .img-wrapper,
  .img-wrapper .food-img {
    width: 100%;
  }
  
  .food-img {
    position: absolute;
    left: 0;
    bottom: 0;
    height: 100%;
  }

  .img-wrapper {
    position: relative;
    height: 0;
    padding-top: 100%;
  }
  
  .img-wrapper .close-bt {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    left: 10px;
    top: 20px;
    position: absolute;
    text-align: center;
    color: white;
    background: #999999;
    font-size: 30px;
  }

  .img-wrapper .share-bt,
  .img-wrapper .more-bt {
    width: 30px;
    height: 30px;
    top: 20px;
    position: absolute;
  }

  .share-bt {
    right: 60px;
  }

  .more-bt {
    right: 20px;
  }

  .content-wrapper {
    padding: 0 0 16px 16px;
    position: relative;
  }

  .content-wrapper .name {
    font-size: 15px;
    color: #333333;
    line-height: 30px;
    font-weight: bold;
  }

  .content-wrapper .saled {
    font-size: 11px;
    color: #9d9d9d;
    margin-bottom: 6px;
  }

  .content-wrapper .price {
    font-size: 0;
  }

  .price .text {
    font-size: 17px;
    color: #fb4e44;
  }

  .price .unit {
    font-size: 11px;
    color: #9d9d9d;
  }

  .cartcontrol-wrapper {
    position: absolute;
    right: 12px;
    bottom: 10px;
    padding: 2px;
  }

  .food-content .buy {
    width: 64px;
    height: 30px;
    font-size: 12px;
    line-height: 30px;
    background: #ffd161;
    border-radius: 30px;
    position: absolute;
    right: 12px;
    bottom: 10px;
    text-align: center;
  }

  /* 评价部分 */
  .rating-wrapper {
    padding-left: 16px;
  }

  .rating-wrapper ul {
    padding: 0;
    list-style: none;
  }

  .rating-title {
    padding: 16px 16px 16px 0;
  }

  .rating-title .like-ratio {
    float: left;
    font-size: 0;
  }

  .like-ratio .title {
    font-size: 13px;
  }

  .like-ratio .ratio {
    font-size: 11px;
    color: #fb4e44;
  }

  .rating-title .snd-title {
    float: right;
    font-size: 0;
  }

  .snd-title .text,
  .snd-title .icon {
    font-size: 13px;
    color: #9d9d9d;
    display: inline-block;
  }

  .comment-item {
    padding: 15px 15px 15px 0;
    width: 100%;
    border-bottom: 1px solid #cccccc;
    box-sizing: border-box;
    display: flex;
  }

  .comment-item .comment-header {
    flex: 0 0 41px;
    margin-right: 10px;
  }

  .comment-header img {
    width: 41px;
    height: 41px;
    border-radius: 50%;
  }

  .comment-item .comment-main {
    flex: 1;
    margin-top: 8px;
  }

  .comment-main .user {
    width: 50%;
    float: left;
    font-size: 12px;
    color: #333333;
  }

  .comment-main .time {
    width: 50%;
    float: right;
    text-align: right;
    font-size: 10px;
    color: #666666;
  }

  .comment-main .content {
    margin-top: 17px;
    font-size: 13px;
    line-height: 19px;
  }

  /* 进入和离开时动画 */
  .food-detail-enter-active,
  .food-detail-leave-active {
    transition: all 1s;
  }

  .food-detail-enter,
  .food-detail-leave-to {
    transform: translateY(100%);
  }
</style>
