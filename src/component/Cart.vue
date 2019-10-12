<template>
  <div class="cart_container">
    <TopBar :title="title"></TopBar>
    <div class="login_bar" v-show="!this.$store.state.islogin">
      <span>登录后可同步账户购物车中的商品</span>
      <van-button type="danger" size="small" to="/login">登录</van-button>
    </div>
    <div class="cart_empyt" v-show="this.$store.state.productList.length==0">
      <van-image width="20%" src="../images/cart.png" />
      <p v-show="!this.$store.state.islogin">登录后可同步购物车中的商品</p>
      <p v-show="this.$store.state.islogin">购物车空空如也,去逛逛吧~</p>
    </div>
    <!-- 商品卡片 -->
    <div class="cart_product">
      <van-checkbox-group v-model="result">
        <van-checkbox
          v-for="(item, index) in list"
          :key="index"
          :name="item"
          checked-color="#e93b3d"
        >
          <van-card :price="item.selectedSkuComb.price/100" :desc="item.info1 + ',' + item.info2">
            <van-image
              slot="thumb"
              width="100px"
              height="100px"
              :src="item.good.imgs[0]"
              @click="toProduct(item.goodsId)"
            />
            <span
              slot="title"
              class="van-card__title"
              @click="toProduct(item.goodsId)"
            >{{item.good.title}}</span>
            <van-stepper
              slot="num"
              v-model="item.selectedNum"
              min="1"
              max="3"
              integer
              disable-input
            />

            <div slot="tags">
              <van-tag plain type="danger">秒杀中</van-tag>
              <van-tag plain type="danger">满减</van-tag>
            </div>
            <div slot="footer">
              <van-button size="mini" @click.stop="delProduct(item)">删除</van-button>
            </div>
          </van-card>
        </van-checkbox>
      </van-checkbox-group>
    </div>

    <!-- 推荐栏 -->
    <div class="cart_empty_rc">
      <van-divider>你可能还想要</van-divider>
      <GoodList :ischeck="ischeck"></GoodList>
    </div>

    <!-- 提交订单栏 -->
    <van-submit-bar
      :price="totalPrice"
      button-text="提交订单"
      @submit="onSubmit"
      v-show="this.$store.state.productList.length!=0"
    >
      <van-checkbox v-model="checked" @click="isfullSelect" checked-color="#e93b3d">全选</van-checkbox>
    </van-submit-bar>
  </div>
</template>

<script>
import TopBar from '../component-sub/TopBar.vue'
import GoodList from '../component-sub/GoodList.vue'
export default {
  data() {
    return {
      title: '购物车',
      ischeck: true,
      checked: false,
      flag: true,
      list: [],
      result: []
    }
  },
  methods: {
    initList() {
      this.list = this.$store.state.productList || []
      this.isfullSelect()
    },
    isfullSelect() {
      this.checked = !this.checked
      if (this.checked) {
        this.list.forEach((item, index) => {
          this.result = this.$store.state.productList
        })
      } else {
        this.result = []
      }
    },
    toProduct(goodsId) {
      //写死了转跳地址
      this.common.toProduct(this, { id: 1 })
    },
    delProduct(item) {
      this.$store.commit('deleteProduct', item)
    },
    onSubmit() {}
  },
  watch: {
    result() {
      if (this.result.length == this.list.length) {
        this.checked = true
      } else {
        this.checked = false
      }
    }
  },
  computed: {
    totalPrice() {
      var total = 0
      if (this.result.length > 0)
        this.result.forEach(item => {
          total += item.selectedNum * item.selectedSkuComb.price
        })
      return total
    }
  },
  components: {
    TopBar,
    GoodList
  },
  created() {
    this.initList()
  }
}
</script>

<style lang="less">
.cart_container {
  background-color: @bgc;
  font-size: @fs - 1;
  .login_bar {
    background-color: @white;
    text-align: center;
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    span {
      padding-right: 5px;
    }
  }
  .cart_empyt {
    padding: 65px 0;
    text-align: center;
    p {
      padding-top: 10px;
    }
  }
  .cart_empty_rc {
    background-color: @white;
    padding: 8px 10px 20px;
  }

  .cart_product {
    .gap {
      position: absolute;
      left: 0;
    }
  }

  .van-checkbox {
    background-color: @white;
    margin-bottom: 15px;
    position: relative;
    padding-left: 10px;
  }
  .van-checkbox__label {
    width: 100%;
  }
  .van-card {
    padding-top: 20px;
    margin-bottom: 10px;
    background-color: @white;
  }
  .van-card__thumb {
    width: 100px;
    height: 100px;
  }
  .van-card__title {
    font-size: @fs;
  }
  .van-card__price {
    font-size: @fs + 2;
    font-weight: 900;
  }
  .van-stepper {
    padding-bottom: 5px;
  }
}
</style>