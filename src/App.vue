<template>
  <div class="shop_contianer" ref="shopContainer">
    <!-- 顶部 -->

    <!-- 中间路由 -->
    <router-view></router-view>

    <!-- 尾部  -->
    <footer class="tabBar" route v-show="flag">
      <van-tabbar v-model="myactive" active-color="#ff911a">
        <van-tabbar-item icon="home-o" to="/home">首页</van-tabbar-item>
        <van-tabbar-item icon="apps-o" to="/category">分类</van-tabbar-item>
        <van-tabbar-item icon="cart-o" to="/cart">购物车</van-tabbar-item>
        <van-tabbar-item icon="user-o" to="/login" v-if="!this.$store.state.islogin">未登录</van-tabbar-item>
        <van-tabbar-item icon="user-o" to="/userhome" v-if="this.$store.state.islogin">我的</van-tabbar-item>
      </van-tabbar>
    </footer>
  </div>
</template>

<script>
import { NavBar } from 'vant'
import { Tabbar, TabbarItem } from 'vant'

export default {
  data() {
    return {
      active: 0,
      flag: true,
      islogin: false 
    }
  },
  methods: {},
  watch: {},
  computed: {
    //底部通栏 激活
    myactive() {
      this.flag = true
      if (this.$route.path.indexOf('/home') == 0) {
        this.active = 0
      } else if (this.$route.path.indexOf('/category') == 0) {
        this.active = 1
      } else if (this.$route.path.indexOf('/cart') == 0) {
        this.active = 2
      } else if (this.$route.path.indexOf('/login') == 0) {
        if (!this.$store.state.islogin) this.islogin = false
        else this.$router.push('/home') //在已登录的情况下,访问login,跳到home
        this.active = 3
      } else if (this.$route.path.indexOf('/userhome') == 0) {
        if (this.$store.state.islogin) this.islogin = true
        else this.$router.push('/login') //在未登录的情况下,访问user,login
        this.active = 3
      } else this.flag = false
      return this.active
    }
  },
  mounted() {}
}
</script>

<style lang="less">
.shop_contianer {
}
</style>