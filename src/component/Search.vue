<template>
  <!-- 搜索框页面 -->
  <div class="shop_search">
    <!-- 顶部 -->
    <TopBarSearch :keyword="this.$store.state.keyword">
      <van-button type="danger" size="small" slot="right" @click="search">搜索</van-button>
    </TopBarSearch>
  </div>
</template>

<script>
import TopBarSearch from '../component-sub/TopBar-Search.vue'
export default {
  data() {
    return {}
  },
  methods: {
    goBack() {
      this.common.goBack(this)
    },
    search() {
      //这里先转跳products页面 最后由products发生axios请求 获取数据
      this.$router.push({
        name: 'products',
        query: { keyword: this.$store.state.keyword }
      })
    }
  },
  components: {
    TopBarSearch
  }
}
</script>

<style lang="less">
.shop_search {
  .searchBoxColor();
  header {
    button {
      border-radius: 5px;
    }
  }
}
</style>