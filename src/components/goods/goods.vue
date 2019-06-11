<template>
  <div class="goods">
    <!--左边导航栏-->
    <div ref="menuScroll" class="menu-wrapper">
      <ul>
        <!--专场-->
        <li class="menu-item" :class="{'current': currentIndex === 0}" @click="selectMenu(0)">
          <p class="text">
            <img class="icon" :src="container.tag_icon" v-if="container.tag_icon">
            <span>{{container.tag_name}}</span>
          </p>
        </li>
        <!--热销-->
        <li class="menu-item" v-for="(item, index) in goods" :key="index"
            :class="{'current': currentIndex === index + 1}" @click="selectMenu(index+1)">
          <p class="text">
            <img class="icon" :src="item.icon" v-if="item.icon">
            {{item.name}}
          </p>
          <!--显示购物车中个数-->
          <i class="num" v-show="calculateCount(item.spus)">{{calculateCount(item.spus)}}</i>
        </li>
      </ul>
    </div>
    <!--右边详情页-->
    <div ref="foodScroll" class="foods-wrapper">
      <ul>
        <!--专场分类-->
        <li class="container-list food-list-hook">
          <div v-for="(item, index) in container.operation_source_list" :key="index">
            <img :src="item.pic_url">
          </div>
        </li>
        <!--具体分类-->
        <li class="food-list food-list-hook" v-for="(item, index) in goods"
            :key="index">
          <h3 class="title">{{item.name}}</h3>
          <!--具体分类下面的商品-->
          <ul>
            <li class="food-item" v-for="(food, index) in item.spus" :key="index"  @click="showDetail(food)">
              <!--商品图片-->
              <div class="icon" :style="icon_bg(food.picture)"></div>
              <!--商品具体描述-->
              <div class="content">
                <h3 class="sub-title">{{food.name}}</h3>
                <p class="desc" v-if="food.description">{{food.description}}</p>
                <div class="extra">
                  <span class="saled">{{food.month_saled}}</span>
                  <span class="praise">{{food.praise_content}}</span>
                </div>
                <img class="product" :src="food.product_label_picture">
                <p class="price">
                  <span class="text">￥{{food.min_price}}</span>
                  <span class="unit">￥{{food.unit}}</span>
                </p>
              </div>
              <!--添加商品按钮-->
              <div class="cartcontrol-wrapper">
                <app-cart-control :food="food"></app-cart-control>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <!--底部购物车-->
    <app-shop-cart :poiInfo="poiInfo" :selectFoods="selectFoods"></app-shop-cart>
    <app-product-detail :food="selectFood" ref="foodView"></app-product-detail>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  import ShopCart from '../shopcart/ShopCart'
  import CartControl from '../cartcontrol/CartControl'
  import ProductDetail from '../productDetail/ProductDetail'
  export default {
    data() {
      return {
        container: {},
        goods: [],
        poiInfo: {},
        listHeight: [],
        menuScroll: {},
        foodScroll: {},
        scrollY: 0,
        selectFood: {}
      }
    },
    components: {
      'app-shop-cart': ShopCart,
      'app-cart-control': CartControl,
      'app-product-detail': ProductDetail
    },
    methods: {
      icon_bg(url) {
        return 'background-image: url(' + url + ')'
      },
      initScroll() {
        this.menuScroll = new BScroll(this.$refs.menuScroll);
        this.foodScroll = new BScroll(this.$refs.foodScroll, {
          probeType: 3,
          click: true
        });

        // foodScroll 监听事件
        this.foodScroll.on('scroll', (pos) => {
          this.scrollY = Math.abs(Math.round(pos.y));
          // console.log(this.scrollY);

        })
      },
      calculateHeight() {
        // 获取元素高度
        let foodlist = this.$refs.foodScroll.getElementsByClassName('food-list-hook');
        let height = 0;
        this.listHeight.push(height);
        for (let i = 0; i < foodlist.length; i++) {
          let item = foodlist[i];
          height += item.clientHeight;
          this.listHeight.push(height);
        }
      },
      selectMenu(index) {
        let foodList = this.$refs.foodScroll.getElementsByClassName('food-list-hook');
        let element = foodList[index];
        // 滚动到对应的具体商品位置
        this.foodScroll.scrollToElement(element, 200);
      },
      calculateCount(spus) {
        let num = 0;
        spus.forEach(item => {
          if (item.count > 0) {
            num += item.count;
          }
        });
        return num;
      },
      showDetail(food) {
        this.selectFood = food;

        this.$refs.foodView.showView();
      }
    },
    created() {
      fetch('/api/goods')
        .then((response) => {
          return response.json();
        })
        .then(res => {
          if (res.code === 0) {
            this.container = res.data.container_operation_source;
            this.goods = res.data.food_spu_tags;
            this.poiInfo = res.data.poi_info;
            // DOM　已经更新完
            this.$nextTick(() => {
              // 执行滚动方法
              this.initScroll();
              // 计算分类的高度
              this.calculateHeight();
            })
          }
      })
    },
    computed: {
      currentIndex() {
        for (let i = 0; i < this.listHeight.length; i++) {
          // 获取商品区间的范围
          let height1 = this.listHeight[i];
          let height2 = this.listHeight[i+1];

          // 是否在上述区间中
          if (!height2 || (this.scrollY >= height1 &&　this.scrollY <= height2)) {
            return i;
          }
        }
        return 0;
      },
      // 添加商品时遍历所以商品并找出添加的具体商品
      selectFoods() {
        let foods = [];
        this.goods.forEach((myFood) => {
          myFood.spus.forEach((item) => {
            if (item.count > 0) {
              foods.push(item);
            }
          })
        });
        return foods;
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .goods {
    display: flex;
    width: 100%;
    position: absolute;
    top: 200px;
    bottom: 51px;
    overflow: hidden;
  }

  .goods .menu-wrapper {
    background: #f4f4f4;
    flex: 0 0 85px;

  }

  .goods .foods-wrapper {
    flex: 1;
  }

  .goods ul {
    list-style: none;
    padding-left: 0;
    margin-top: 0;
  }

  /* 左边导航栏 */
  .goods .menu-item {
    padding: 16px 5px 15px 10px;
    border-bottom: 1px solid #E4E4E4;
    position: relative;
  }

  .goods .menu-item .text {
    font-size: 13px;
    color: #333333;
    line-height: 16px;
    vertical-align: middle;
    overflow: hidden;
  }

  .goods .menu-item .icon {
    width: 15px;
    height: 15px;
    vertical-align: middle;
  }

  /* 专场样式 */
  .goods .container-list {
    padding: 11px 11px 0 11px;
    border-bottom: 1px solid #e4e4e4;
  }

  .container-list img {
    width: 100%;
    margin-bottom: 11px;
    border-radius: 5px;
  }

  /* 具体分类商品布局 */
  .goods .food-list {
    padding: 11px
  }

  .food-list .title {
    height: 13px;
    font-size: 13px;
    background: url("./img/btn_yellow_highlighted@2x.png") no-repeat left center;
    background-size: 2px 10px;
    margin-bottom: 12px;
    padding-left: 7px;
  }

  .food-list  .food-item {
    display: flex;
    margin-bottom: 25px;
    position: relative;
  }

  .food-list .food-item .icon {
    flex: 0 0 63px;
    background: center no-repeat;
    background-size: 120% 100% ;
    margin-right: 11px;
    height: 75px;
  }

  .food-list .content {
    flex: 1;
  }

  /* 每个具体商品的样式 */
  .food-list .content .sub-title {
    font-size: 16px;
    line-height: 21px;
    color: #333333;
    margin-bottom: 10px;
    padding-right: 27px;
  }

  .food-list .desc {
    font-size: 10px;
    line-height: 19px;
    color: #bfbfbf;
    margin-bottom: 8px;
  }

  .food-list .extra {
    font-size: 10px;
    color: #BFBFBF;
    margin-bottom: 10px;
  }

  .food-list .saled {
    margin-right: 14px;
  }
  
  .food-list .price {
    font-size: 0;
  }

  .food-list .product {
    height: 15px;
    margin-bottom: 6px;
  }
  
  .food-list .text {
    font-size: 14px;
    color: #fb4e44;
  }
  
  .food-list .unit {
    font-size: 12px;
    color: #BFBFBF;
  }

  /* 当前被选中 */
  .goods .menu-item.current {
    background: white;
    font-weight: bold;
    margin-top: -1px;
  }

  .goods .menu-item:first-child.current {
    margin-top: 1px;
  }

  /* 添加按钮 */
  .cartcontrol-wrapper {
    position: absolute;
    right: 0;
    bottom: 0;
  }

  /* 左边导航栏显示购物车中数量 */
  .menu-item .num {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    top: 16px;
    right: 5px;
    color: white;
    background: red;
    text-align: center;
    font-size: 10px;
    line-height: 13px;
    position: absolute;
  }


</style>
