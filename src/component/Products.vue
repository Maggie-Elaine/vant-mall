<template>
  <!-- 搜索结果页面 -->
  <div class="products_container">
    <!-- 顶部搜索 -->
    <TopBarSearch :keyword="this.$store.state.keyword"></TopBarSearch>
    <!-- 中间部件 -->
    <MiddleBar></MiddleBar>
    <!-- 搜索内容 -->
    <GoodList ischeck="true" class="list_content"></GoodList>
  </div>
</template>

<script>
import MiddleBar from '../component-sub/MiddleBar.vue'
import GoodList from '../component-sub/GoodList.vue'
import TopBarSearch from '../component-sub/TopBar-Search.vue'
export default {
  data() {
    return {
      keyword: this.$store.state.keyword
    }
  },
  methods: {
    goBack() {
      this.common.goBack(this)
    },
    showNav() {},
    getProductList() {}
  },
  components: {
    TopBarSearch,
    MiddleBar,
    GoodList
  },
  created() {}
}
</script>

<style lang="less">
.products_container {
  .ptHeight();
  .searchBarbgc();
  .searchBoxColor();
  .list_content {
    padding: 0 10px;
  }
}
</style>