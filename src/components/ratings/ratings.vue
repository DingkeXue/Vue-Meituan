<template>
  <div class="ratings" ref="ratingView">
    <div class="ratings-wrapper">
      <!--评价预览-->
      <div class="overview">
        <div class="overview-left">
          <div class="comment-score">
            <p class="score">{{ratings.comment_score}}</p>
            <p class="text">商家评价</p>
          </div>
          <div class="other-score">
            <div class="quality-score item">
              <span class="text">口味</span>
              <app-star :score="ratings.quality_score" class="star"></app-star>
              <span class="score"></span>
            </div>
            <div class="pack-score item">
              <span class="text">包装</span>
              <app-star :score="ratings.pack_score" class="star"></app-star>
              <span class="score"></span>
            </div>
          </div>
        </div>
        <div class="overview-right">
          <div class="delivery-score">
            <p class="score">{{ratings.delivery_score}}</p>
            <p class="text">配送评分</p>
          </div>
        </div>
      </div>
      <!--分隔符-->
      <app-split></app-split>
      <!--评价详情-->
      <div class="content">
        <!--评价选择-->
        <div class="rating-select" v-if="ratings.tab">
          <span class="item" @click="selectFn(2)" :class="{'active': selectType == 2}">
            {{ratings.tab[0].comment_score_title}}
          </span>
          <span class="item" @click="selectFn(1)" :class="{'active': selectType == 1}">
            {{ratings.tab[1].comment_score_title}}
          </span>
          <span class="item" @click="selectFn(0)" :class="{'active': selectType == 0}">
            {{ratings.tab[2].comment_score_title}}
          </span>
        </div>
        <!--评价标签-->
        <div class="labels-view">
          <span class="item" v-if="ratings.labels"
                v-for="(label, index) in ratings.labels" :key="index"
          >{{label.content}}{{label.label_count}}</span>
        </div>
        <!--评价列表-->
        <ul class="rating-list">
          <li class="comment-item" v-for="(comment,index) in selectComments" :key="index">
            <!--用户头像-->
            <div class="comment-header">
              <img :src="comment.user_pic_url" v-if="comment.user_pic_url">
              <img src="./img/anonymity.png" v-if="!comment.user_pic_url">
            </div>
            <!--评价内容-->
            <div class="comment-main">
              <div class="user">{{comment.user_name}}</div>
              <div class="time"></div>
              <div class="star-wrapper">
                <span class="text">评分</span>
                <app-star :score="comment.order_comment_score"></app-star>
              </div>
              <div class="content">{{comment.comment}}</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import Split from '../split/Split'
  import Star from '../star/Star'
  import BScoll from 'better-scroll'

  // 定义评价类型
  const ALL = 2;
  const PICTURE = 1;
  const DP = 0;

  export default {
    data() {
      return {
        ratings: {},
        selectType: ALL
      }
    },
    components: {
      'app-star': Star,
      'app-split': Split
    },
    created() {
      fetch('/api/ratings')
        .then(response => {
          return response.json();
        })
        .then(res => {
          // console.log(res);
          if (res.code === 0) {
            this.ratings = res.data;
            this.$nextTick(() => {
              if (!this.BScroll) {
                this.BScroll = new BScoll(this.$refs.ratingView, {
                  click: true
                })
              } else {
                this.BScroll.refresh();
              }
            })
          }
        })
        .catch(err => {
          console.log(err);
        })
    },
    methods: {
      // 根据点击事件来判断选择评价类型
      selectFn(type) {
        this.selectType = type;
        // console.log(this.selectType);
      }
    },
    computed: {
      selectComments() {
        if (this.selectType === ALL) {
          return this.ratings.comments;
        } else if (this.selectType === PICTURE) {
          let arr = [];
          this.ratings.comments.forEach(comment => {
            if (comment.comment_pics.length) {
              arr.push(comment)
            }
          });
          return arr;
        } else {
          return this.ratings.comments_dp.comments;
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .ratings {
    position: absolute;
    left: 0;
    top: 191px;
    width: 100%;
    overflow: hidden;
  }

  .ratings ul {
    padding: 0;
    list-style: none;
  }

  /* 评价预览 */
  .ratings .overview {
    padding: 20px 0 18px 0;
    display: flex;
  }

  .overview .overview-left {
    flex: 1;
    padding-left: 26px;
  }

  .overview-left .comment-score,
  .other-score,
  .item .text,
  .item .star,
  .item .score {
    float: left;
  }

  .overview-left .comment-score {
    font-weight: bold;
    color: #ffb000;
    margin-bottom: 9px;
  }

  .comment-score .text {
    font-size: 11px;
  }

  .comment-score .text,
  .item .text {
    color: #666666;
  }

  .overview-left .other-score {
    margin-top: 3px;
  }

  .other-score .item {
    height: 11px;
  }

  .item .text {
    font-size: 11px;
    margin-right: 11px;
  }

  .item .star {
    margin-right: 11px;
  }

  .item .score {
    font-size: 11px;
    color: #ffb000;
  }

  .other-score .quality-score {
    margin-bottom: 14px;
  }

  .overview-right {
    flex: 0 0 100px;
    text-align: center;
    border-left: 1px solid #9d9d9d;
  }

  .delivery-score .score {
    font-size: 19px;
    font-weight: 500;
    color: #999999;
    margin-bottom: 10px;
    margin-top: 3px;
  }

  .delivery-score .text {
    font-size: 11px;
    color: #999999;
  }

  /* 评价内容 */
  .content {
    padding: 16px;
  }

  .content .rating-select {
    width: 100%;
    box-sizing: border-box;
    font-size: 0;
    margin-bottom: 11px;
    border-radius: 3px;
    border: 1px solid #ffb000;
    border-right: 0;
  }
  
  .rating-select .item {
    width: 33.3%;
    font-size: 14px;
    line-height: 33px;
    display: inline-block;
    text-align: center;
    color: #ffb000;
    height: 33px;
    border-right: 1px solid #ffb000;
    box-sizing: border-box;
  }
  
  .rating-select .item.active {
    background: #fbb000;
    color: #000;
  }
  
  .labels-view .item {
    display: inline-block;
    height: 27px;
    padding: 0 10px;
    font-size: 12px;
    background: #f4f4f4;
    margin-right: 6px;
    margin-bottom: 6px;
    border-radius: 3px;
    color: #999999;
  }

  .rating-list .comment-item {
    padding: 16px 16px 16px 0;
    border-bottom: 1px solid #f4f4f4;
    width: 100%;
    display: flex;
    box-sizing: border-box;
  }

  .comment-item .comment-header {
    flex: 0 0 35px;
    margin-right: 11px;
  }

  .comment-header img {
    width: 35px;
    height: 35px;
    border-radius: 50%;
  }
  
  .comment-main {
    flex: 1;
  }
  
  .comment-main .user {
    width: 50%;
    float: left;
    font-size: 11px;
    color: #333333;
  }

  .comment-main .star-wrapper {
    float: left;
    margin-top: 12px;
    margin-bottom: 15px;
    width: 100%;
  }

  .star-wrapper .text {
    color: #999999;
    font-size: 11px;
    float: left;
  }

  .star-wrapper .star {
    float: left;
    margin-left: 7px;
  }
</style>
