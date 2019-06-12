<template>
  <div class="seller" ref="sellerView">
    <div class="seller-wrapper">
      <app-split></app-split>
      <!--商家预览部分-->
      <div class="seller-view">
        <!--商家地址-->
        <div class="address-wrapper">
          <div class="address-left">
            {{seller.address}}
          </div>
          <div class="address-right">
            <div class="content"></div>
          </div>
        </div>
        <!--商家图片-->
        <div class="picture-wrapper" ref="picsView" v-if="seller.poi_env">
          <ul class="pics-list" ref="picsList">
            <li class="pics-item" v-for="(imgurl,index) in seller.poi_env.thumbnails_url_list"
                :key="index" ref="picsItem">
              <img :src="imgurl">
            </li>
          </ul>
        </div>
        <!--商家食品安全-->
        <div class="safety-wrapper">
          <span class="text">查看食品安全档案</span>
          <span class="icon-keyboard_arrow_right arrow"></span>
        </div>
      </div>
      <app-split></app-split>
      <!--商家详情部分-->
      <div class="tip-wrapper">
        <div class="delivery-wrapper">
          <span>配送服务：{{seller.app_delivery_tip}}</span>
        </div>
        <div class="delivery-time">
          <span>配送时间：{{seller.delivery_time_tip}}</span>
        </div>
      </div>
      <app-split></app-split>
      <!--商家其他信息部分-->
      <div class="other-wrapper">
        <div class="server-wrapper">
          <span>商家服务</span>
          <div class="poi-server" v-for="(item, index) in seller.poi_service" :key="index">
            <img :src="item.icon">{{item.content}}
          </div>
        </div>
        <div class="discounts-wrapper">
          <div class="discount-item" v-for="(item, index) in seller.discounts2" :key="index">
            <div class="icon">
              <img :src="item.icon_url">
            </div>
            <div class="text">{{item.info}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Split from '../split/Split'
  import BScroll from 'better-scroll'

  export default {
    data() {
      return {
        seller: {},
        sellerScroll: {}
      }
    },
    components: {
      'app-split': Split
    },
    created() {
      // 获取商家详情
      fetch('/api/seller')
        .then(response => {
          return response.json();
        })
        .then(res => {
          if (res.code === 0) {
            // console.log(res.data)
            this.seller = res.data;

            // 初始化 better-scroll
            this.$nextTick(() => {
              let picsList = this.seller.poi_env.thumbnails_url_list;
              if (picsList) {
                let imgWidth = this.$refs.picsItem[0].clientWidth;
                let marginRight = 11;
                let width = (imgWidth + marginRight) * picsList.length;
                this.$refs.picsList.style.width = width + "px";

                this.BScroll = new BScroll(this.$refs.picsView, {
                  scrollX: true
                })
              }
              this.sellerScroll = new BScroll(this.$refs.sellerView, {
                click: true
              })
            })
          }
        })
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import "../../common/css/icon.css";

  .seller {
    position: absolute;
    left: 0;
    top: 210px;
    bottom: 0;
    width: 100%;
    color: #666666;
    background: #f4f4f4;
    overflow: hidden;
  }

  .seller ul {
    padding: 0;
    list-style: none;
  }

  .seller-wrapper {
    background: white;
  }

  .seller-wrapper .seller-view {
    padding-left: 15px;
  }

  .seller-view .address-wrapper {
    display: flex;
    padding: 16px 0;
    border-bottom: 1px solid #f4f4f4;
  }

  .address-left {
    flex: 1;
    background: url("./img/address.png") no-repeat left center;
    padding-left: 26px;
    background-size: 14px 16px;
    font-size: 14px;
    line-height: 19px;
  }

  .address-right {
    flex: 0 0 60px;
    background: url("./img/line.png") no-repeat left center;
    background-size: 1px 5px;
  }

  .address-right .content {
    width: 100%;
    height: 100%;
    background: url("./img/phone.png") no-repeat center;
    background-size: 18px 18px;
  }

  .picture-wrapper {
    padding: 10px 0;
    overflow: hidden;
    border-bottom: 1px solid #f4f4f4;
    white-space: nowrap;
  }

  .pics-list .pics-item {
    display: inline-block;
    margin-right: 11px;
    width: 110px;
    height: 93px;
  }

  .pics-list img {
    width: 100%;
    height: 100%;
    border-radius: 2px;
  }

  .safety-wrapper {
    padding: 15px;
    background: url("./img/safety.png") no-repeat left center;
    background-size: 14px 16px;
    font-size: 14px;
  }

  .safety-wrapper .text {
    margin-left: 8px;
  }

  .safety-wrapper .arrow {
    float: right;
    font-size: 14px;
  }

  .tip-wrapper,
  .other-wrapper {
    padding-left: 15px;
  }

  .delivery-wrapper {
    background: url("./img/delivery.png") no-repeat left center;
    background-size: 14px 16px;
    padding: 15px 0 15px 25px;
    font-size: 14px;
    border-bottom: 1px solid #f4f4f4;
  }

  .delivery-time {
    background: url("./img/time.png") no-repeat left center;
    padding: 15px 17px 15px 25px;
    background-size: 15px 15px;
    font-size: 14px;
    line-height: 18px;
  }

  .other-wrapper .server-wrapper {
    background: url("./img/server.png") no-repeat left center;
    background-size: 15px 15px;
    padding: 15px 0 17px 25px;
    font-size: 14px;
    border-bottom: 1px solid #f4f4f4;
  }

  .server-wrapper .poi-server {
    display: inline-block;
    margin-left: 17px;
  }

  .poi-server img {
    width: 16px;
    height: 16px;
    margin-right: 6px;
    vertical-align: middle;
  }

  .discounts-wrapper {
    padding: 17px 24px 19px 0;
  }

  .discounts-wrapper .discount-item {
    display: flex;
  }

  .discount-item .icon {
    flex: 0 0 25px;
  }

  .discount-item .icon img {
    width: 16px;
    height: 16px;
  }

  .discount-item .text {
    flex: 1;
    font-size: 14px;
  }

</style>
