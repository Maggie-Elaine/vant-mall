<template>
  <div class="product_container">
    <!-- 顶部通栏 -->
    <TopBarProduct></TopBarProduct>
    <!-- 轮播图 -->
    <van-swipe :autoplay="3000" indicator-color="#e93b3d">
      <van-swipe-item v-for="(item, index) in swipeList" :key="index" @click="imgPreview(index)">
        <van-image :src="item" radius="10px" width="100%" lazy-load>
          <template v-slot:error>加载失败</template>
        </van-image>
      </van-swipe-item>
    </van-swipe>
    <!-- 购买区 -->
    <div class="buy_area">
      <!-- 价格栏 -->
      <div class="price_box">
        <span>
          ￥
          <strong>{{price/100}}</strong>.00
        </span>
        <a href>
          <van-icon name="star-o" />
          <span>收藏</span>
        </a>
      </div>
      <!-- 标题栏 -->
      <div>
        <h1 class="item_name">
          <van-tag type="danger">自营</van-tag>
          <span>华为 HUAWEI P30 Pro 超感光徕卡四摄10倍混合变焦麒麟980芯片屏内指纹 8GB+128GB极光色全网通版双4G手机</span>
        </h1>
      </div>

      <div class="gap"></div>
      <!-- sku栏 -->
      <div class="sku_box" @click="showSku">
        <div class="info_first">
          <span>已选</span>
          <span style="color:#000;font-size:14px">{{name}},{{version}},标准版,{{num}}个</span>
        </div>
        <div class="info_second">
          <span></span>
          <span>本商品支持保障服务，点击可选服务</span>
        </div>
        <van-icon name="ellipsis" size="18px" class="box_icon" />
      </div>
      <!-- 配送区域栏 -->
      <div class="sku_box" @click="showAddress">
        <div class="info_first">
          <span>送至</span>
          <span style="color:#000;font-size:14px">北京朝阳区三环至四环之间</span>
        </div>
        <div class="info_second">
          <span></span>
          <span style="color:#e93b3d">现货</span>
        </div>
        <div class="info_second">
          <span>重量</span>
          <span>0.54kg</span>
        </div>
        <van-icon name="ellipsis" size="18px" class="box_icon" />
      </div>
      <!-- 售后服务栏 -->
      <div class="sku_box detail_server">
        <span>
          <van-icon name="passed" color="#e93b3d" />99元免基础运费(20kg以内)
        </span>
        <span>
          <van-icon name="passed" color="#e93b3d" />211限时达
        </span>

        <span>
          <van-icon name="passed" color="#e93b3d" />7天无理由退货
        </span>
        <span>
          <van-icon name="passed" color="#e93b3d" />免举证退还
        </span>
        <span>
          <van-icon name="passed" color="#e93b3d" />原厂维修
        </span>

        <span>
          <van-icon name="passed" color="#e93b3d" />可配送港澳台以及海外
        </span>
        <span>
          <van-icon name="passed" color="#e93b3d" />可使用优惠券
        </span>

        <van-icon name="ellipsis" size="18px" class="box_icon" />
      </div>
    </div>

    <div class="gap"></div>
    <!-- 评论区 -->
    <div class="cmt_container">
      <div class="cmt_bar">
        <h3>
          评价
          <small>好评 97%</small>
        </h3>
        <p>
          共 48万+条评价
          <van-icon name="arrow" />
        </p>
      </div>
    </div>
    <!-- 商品规格sku -->
    <van-sku
      ref="productSku"
      v-model="showSkuflag"
      :sku="skuData.sku"
      :goods="skuData.goods_info"
      :goods-id="skuData.goods_id"
      :hide-stock="skuData.sku.hide_stock"
      :quota="skuData.quota"
      :quota-used="skuData.quota_used"
      :initial-sku="skuData.initialSku"
      :close-on-click-overlay="closeOnClickOverlay"
      disable-stepper-input
      :custom-sku-validator="customSkuValidator"
      @buy-clicked="onBuyClicked"
      @add-cart="onAddCartClicked"
      @stepper-change="onStepperChange"
      @sku-selected="onskuSekect"
    ></van-sku>
    <!-- 区域选择 -->
    <van-action-sheet title="区域选择" v-model="showAreaflag">
      <van-area :area-list="areaList" :columns-num="2" title="区域选择" />
    </van-action-sheet>

    <!-- 商品导航 -->
    <van-goods-action>
      <van-goods-action-icon icon="chat-o" text="客服" />
      <van-goods-action-icon
        icon="cart-o"
        text="购物车"
        :info="this.$store.state.productList.length>0?this.$store.state.productList.length:''"
        to="/cart"
      />
      <van-goods-action-icon icon="shop-o" text="店铺" />
      <van-goods-action-button type="warning" text="加入购物车" @click="onAddCartClicked" />
      <van-goods-action-button type="danger" text="立即购买" @click="onBuyClicked" />
    </van-goods-action>
  </div>
</template>

<script>
import TopBarProduct from '../component-sub/TopBar-Product.vue'
import { ImagePreview, Toast } from 'vant'
import skuData from '../fake/data.js'
import areaList from '../fake/area.js'
export default {
  data() {
    return {
      good: {}, //axios获取的商品信息
      swipeList: [],
      num: 1,
      name: '极光色',
      version: '8GB+128GB',
      price: '498800',
      //sku相关
      showSkuflag: false,
      showAreaflag: false,
      areaList: areaList,
      skuData: skuData,
      showBase: true,
      showCustom: false,
      showStepper: false,
      showSoldout: false,
      closeOnClickOverlay: true,
      customSkuValidator: () => '请选择xxx!'
    }
  },
  methods: {
    initSwipeList() {
      this.axios
        // .get(`../fake/product${this.$route.params.id}.json`)
        .get(`../fake/product1.json`)
        .then(res => {
          this.good = res.data
          this.swipeList = res.data.imgs
        })
    },
    imgPreview(index) {
      ImagePreview({
        images: this.swipeList,
        startPosition: index,
        onClose() {
          // do something
        }
      })
    },
    showSku() {
      this.showSkuflag = true
    },
    onBuyClicked(data) {
      var product = this.$refs.productSku.getSkuData()
      Toast('目前只有加入购物车功能')
    },
    onAddCartClicked(data) {
      var product = this.$refs.productSku.getSkuData()
      //{"goodsId":"10011","selectedNum":1,"selectedSkuComb":{"id":20022,"price":599900,"s1":"0002","s2":"0022","s3":"0","stock_num":111}}
      //goodsid:商品总id ,id:组合类别id ,s1:类别1 ,s2:类别2

      //登录检验 4参数: this/url/data/callback
      //模拟后台
      this.common.loginAxios(this, '', {}, () => {
        //成功后 将数据存到vuex
        this.getSkuName(product)
        product.good = this.good
        this.$store.commit('addProduct', product)
        // console.log(JSON.stringify(product))
        Toast({
          message: '加入购物车成功',
          icon: 'success'
        })
      })
    },
    onStepperChange(value) {
      this.num = value
    },
    onskuSekect(data) {
      var skuValue = data.skuValue
      if (skuValue.skuKeyStr == 's1') {
        this.name = skuValue.name
      } else if (skuValue.skuKeyStr == 's2') {
        this.version = skuValue.name
      }
      if (data.selectedSkuComb) this.price = data.selectedSkuComb.price
    },
    initSkuList() {
      //模拟全部组合
      var list = this.skuData.sku.list
      var tree = this.skuData.sku.tree
      var treeA = tree[0].v
      var treeB = tree[1].v
      treeA.forEach(itemA => {
        treeB.forEach(itemB => {
          this.skuData.sku.list.push({
            id: itemA.id + itemB.id,
            price: 499900,
            s1: itemA.id,
            s2: itemB.id,
            s3: '0',
            stock_num: 111
          })
        })
      })
      // console.log(this.skuData.sku.list)
      // console.log(JSON.stringify(list))
    },
    showAddress() {
      this.showAreaflag = true
    },
    getSkuName(product) {
      //获取s1 s2对应的名字
      var tree = this.skuData.sku.tree
      var treeA = tree[0].v
      var treeB = tree[1].v
      treeA.some(t => {
        if (t.id == product.selectedSkuComb.s1) {
          product.info1 = t.name
          return true
        }
      })
      treeB.some(t => {
        if (t.id == product.selectedSkuComb.s2) {
          product.info2 = t.name
          return true
        }
      })
    }
  },
  created() {
    this.initSwipeList()
  },
  components: {
    TopBarProduct
  }
}
</script>

<style lang="less" >
@marginRL: 10px;
.product_container {
  padding-bottom: @tbBottom;
  .buy_area {
    div:nth-child(n) {
      padding-right: 10px;
      padding-left: 10px;
    }
    .price_box {
      background-color: @white;
      margin: 5px 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      span {
        color: @red;
        strong {
          font-size: @fs + 10;
        }
      }
      a {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        span {
          font-size: @fs - 3;
          color: @grey;
          padding-top: 5px;
        }
      }
    }
    .item_name {
      background-color: @white;

      span {
        line-height: @lh;
      }
    }
    .sku_box {
      padding: 10px 0;
      font-size: @fs - 2;
      line-height: @lh2;
      color: @grey;
      position: relative;
      .borderBottom();
      div:nth-of-type(n) {
        position: relative;
        padding-right: 33px;
        padding-left: 33px;
        span:first-of-type {
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
        }
      }
      .box_icon {
        position: absolute;
        right: 10px;
        top: 10px;
      }
      &.detail_server {
        display: flex;
        flex-flow: row wrap;
        span {
          padding-right: 10px;
          display: flex;
          align-items: center;
          i {
            padding-right: 3px;
          }
        }
      }
    }
  }

  .cmt_container {
    font-size: @fs;
    padding: 0 10px;
    .cmt_bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px 0;
      h3 {
        font-size: @fs + 1;
      }
      small {
        padding-left: 8px;
        color: @red;
        font-weight: 400;
        font-size: @fs - 2;
      }
      p {
        font-size: @fs - 2;
        color: @grey;
      }
    }
  }

  //自定义散件 vant组件
  .gap {
    height: 10px;
    background-color: @grey3;
    padding: 0 !important;
    margin: 0 !important;
  }
  .van-picker__toolbar {
    display: none;
  }
}
</style>