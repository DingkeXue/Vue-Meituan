<template>
  <div class="header">
    <!--顶部栏开始-->
    <div class="top-wrapper">
      <div class="back-wrapper">
        <span class="icon-arrow_lift"></span>
      </div>

      <form class="search-wrapper">
        <span class="search-icon"></span>
        <input type="text" placeholder="搜索" class="search-bar">
      </form>

      <div class="more-wrapper">
        <a href="#" class="spelling-bt">拼单</a>
        <div class="more-bt">
          <i class="s-radius"></i>
          <i class="s-radius"></i>
          <i class="s-radius"></i>
        </div>
      </div>
    </div>
    <!--顶部栏结束-->
    <!--主体内容开始-->
    <div class="content-wrapper">
      <div class="icon" :style="head_bg">
        <!--<img :src="poiInfo.pic_url" alt="">-->
      </div>
      <div class="name">
        <h3>{{poiInfo.name}}</h3>
      </div>
      <div class="collect">
        <img src="./img/star.png">
        <span>收藏</span>
      </div>
    </div>
    <!--主体内容结束-->

    <!--公告内容开始-->
    <div class="bulletin-wrapper">
      <img :src="poiInfo.discounts2[0].icon_url" v-if="poiInfo.discounts2" class="icon">
      <span class="text" v-if="poiInfo.discounts2">{{poiInfo.discounts2[0].info}}</span>
      <div class="detail" v-if="poiInfo.discounts2" @click="showBulletin">
        {{poiInfo.discounts2.length}}个活动
        <span class="icon-keyboard_arrow_right"></span>
      </div>
    </div>
    <!--公告内容结束-->

    <!--背景内容开始-->
    <div class="bg-wrapper" :style="head_pic_url">
      <!--<img :src="poiInfo.head_pic_url" alt="">-->
    </div>
    <!--背景内容结束-->

    <!--公告详情-->
    <transition name="bulletin-detail">
      <div class="bulletin-detail" v-if="isShow">
        <div class="detail-wrapper">
          <!--相关内容容器-->
          <div class="main-wrapper" :style="detail_bg">
            <div class="icon" :style="head_bg"></div>
            <h3 class="name">{{poiInfo.name}}</h3>
            <!--星级评价-->
            <div class="score">
              <app-star :score="poiInfo.wm_poi_score"></app-star>
              <span>{{poiInfo.wm_poi_score}}</span>
            </div>
            <!--tip-->
            <p class="tip">
              {{poiInfo.min_price_tip}} <i>|</i> {{poiInfo.shipping_fee_tip}} <i>|</i> {{poiInfo.delivery_time_tip}}
            </p>
            <!--配送时间-->
            <p class="time">
              配送时间： {{poiInfo.shipping_time}}
            </p>
            <!--折扣-->
            <div class="discounts">
              <p>
                <img :src="poiInfo.discounts2[0].icon_url" alt="">
                <span>{{poiInfo.discounts2[0].info}}</span>
              </p>
            </div>
            <!--关闭详情页-->
            <div class="close-wrapper">
              <span class="icon-close" @click="closeBulletin"></span>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <!--公告详情结束-->
  </div>
</template>

<script>
  import Star from '../star/Star'
  export default {
    name: 'Header',
    data() {
      return {
        isShow:　false
      }
    },
    components: {
      'app-star': Star
    },
    props: {
      poiInfo: {
        type: Object,
        default: {}
      }
    },
    computed: {
      head_bg() {
        return "background-image: url(" + this.poiInfo.pic_url + ");"
      },
      head_pic_url() {
        return "background-image: url(" + this.poiInfo.head_pic_url + ");"
      },
      detail_bg() {
        return "background-image: url(" + this.poiInfo.poi_back_pic_url + ");"
      }
    },
    methods: {
      showBulletin() {
        this.isShow = true
      },
      closeBulletin() {
        this.isShow = false
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import "../../common/css/icon.css";
.header {
  height: 130px;
  padding-top: 20px;
}

  /* 顶部通栏样式 */
  .header .top-wrapper {
    position: relative;
  }

  .header .top-wrapper .back-wrapper {
    width: 50px;
    height: 31px;
    position: absolute;
    left: 0;
    top: 0;
    text-align: center;
    line-height: 31px;
  }

  .header .back-wrapper .back-wrapper span {
    display: inline-block;
    color: white;
  }

  .header .search-wrapper {
    width: 100%;
    height: 31px;
    padding: 0 104px 0 50px;
    box-sizing: border-box;
  }

  .header .search-wrapper .search-icon {
    width: 28px;
    height: 31px;
    background: url("./img/search.png") no-repeat 11px center;
    background-size: 13px 13px;
    position: absolute;
  }

  .header .search-wrapper .search-bar {
    width: 100%;
    height: 31px;
    border: 0;
    box-sizing: border-box;
    background: #cdcdcc;
    border-radius: 28px;
    outline: none;
    padding-left: 28px;
  }

  .header .top-wrapper .more-wrapper {
    width: 65px;
    height: 24px;
    position: absolute;
    right: 0;
    top: 0;
    padding: 7px 15px 0 24px;
  }

  .header .spelling-bt {
    width: 30px;
    height: 17px;
    color: white;
    line-height: 17px;
    border: 1px solid white;
    text-align: center;
    float: left;
    text-decoration: none;
    font-size: 10px;
  }

  .header .more-bt {
    float: right;
    width: 20px;
    height: 24px;
    margin-left: 13px;
    margin-top: 6px;
  }

  .header .s-radius {
    width: 3px;
    height: 3px;
    border-radius: 50%;
    border: 1px solid white;
    display: block;
    float: left;
    margin-right: 1px;
  }
  
  /* 背景图片样式 */
  .header .bg-wrapper {
    width: 100%;
    height: 160px;
    position: absolute;
    left: 0;
    top: 0;
    z-index: -10;
    background-size: 100% 125%;
    background-position: center -12px;
  }

  /* 主体内容样式*/
  .header .content-wrapper {
    padding: 17px 10px 11px;
    height: 50px;
  }
  
  .header .content-wrapper .icon {
    width: 50px;
    height: 50px;
    background-size: 135% 100%;
    background-position: center;
    border-radius: 5px;
    float: left;
  }

  .header .content-wrapper .name {
    float: left;
    padding-left: 12px;
  }

  .header .name h3 {
    font-size: 16px;
    font-weight: bold;
    color: white;
  }

  .header .content-wrapper .collect {
    width: 25px;
    height: 37px;
    float: right;
    text-align: center;
    padding-top: 6px;
  }

  .header .collect img {
    width: 20px;
    height: 20px;
  }

  .header .collect span {
    margin-top: 7px;
    color: white;
    font-size: 11px;
  }

  /* 公告样式 */
  .header .bulletin-wrapper {
    height: 16px;
    padding: 0 10px;
  }

  .header .bulletin-wrapper .icon {
    width: 16px;
    height: 16px;
    float: left;
    margin-right: 6px;
  }

  .header .bulletin-wrapper .text {
    font-size: 11px;
    color: white;
    float: left;
    line-height: 16px;
  }

  .header .bulletin-wrapper .detail {
    color: white;
    float: right;
    font-size: 11px;
    line-height: 16px;
  }

  .header .bulletin-wrapper .detail span {
    font-size: 16px;
    line-height: 16px;
    float: right;
  }

  /* 公告详情样式 */
  .header .bulletin-detail {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    background: rgba(98, 98, 98, .8);
    z-index: 99;
  }

  .header .bulletin-detail .detail-wrapper {
    width: 100%;
    height: 100%;
    padding: 43px 20px 125px;
    box-sizing: border-box;
  }

  .header .detail-wrapper .main-wrapper {
    width: 100%;
    height: 100%;
    background-size: 100% 100%;
    border-radius: 10px;
    text-align: center;
  }

  .header .bulletin-detail .icon {
    width: 60px;
    height: 60px;
    background-size: 135% 100%;
    background-position: center;
    border-radius: 5px;
    display: inline-block;
    margin-top: 40px;
  }

  .header .bulletin-detail .name {
    font-size: 15px;
    color: white;
    margin-top: 13px;
  }

  .header .bulletin-detail .score {
    height: 10px;
    margin-top: 6px;
    text-align: center;
    font-size: 0;
  }

  .bulletin-detail .score .star {
    display: inline-block;
    margin-right: 7px;
  }

  .bulletin-detail .score span {
    display: inline-block;
    font-size: 10px;
    color: white;
  }

  .bulletin-detail .tip {
    font-size: 11px;
    color: #bababc;
    margin-top: 8px;
  }

  .bulletin-detail .tip i {
    margin: 0 7px;
  }

  .bulletin-detail .time {
    font-size: 11px;
    color: #bababc;
    margin-top: 13px;
  }

  .bulletin-detail .discounts {
    margin-top: 20px;
    padding: 0 20px;
  }

  .bulletin-detail .discounts p {
    margin-top: 20px;
    padding: 0 20px;
  }

  .bulletin-detail .discounts img {
    width: 16px;
    height: 16px;
    vertical-align: middle;
  }

  .bulletin-detail .discounts span {
    font-size: 11px;
    line-height: 16px;
    color: white;
  }

  .bulletin-detail .close-wrapper {
    padding-top: 20px;
    height: 40px;
    text-align: center;
  }

  .bulletin-detail .close-wrapper span {
    width: 40px;
    height: 40px;
    line-height: 40px;
    border-radius: 50%;
    font-size: 14px;
    color: white;
    display: inline-block;
    background: rgba(118, 118, 118, .7);
    border: 1px solid rgba(140, 140, 140, .9);
  }

  /* 公告详情过度效果 */
  .bulletin-detail-enter-active,
  .bulletin-detail-leave-active {
    transition: 2s all;
  }

  .bulletin-detail-enter,
  .bulletin-detail-leave-to {
    opacity: 0;
  }

  .bulletin-detail-enter-to,
  .bulletin-detail-leave {
    opacity: 1;
  }

</style>
