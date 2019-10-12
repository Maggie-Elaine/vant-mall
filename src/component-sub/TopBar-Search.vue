<template>
  <!-- 搜索框组件 -->
  <header>
    <!-- 左边 -->
    <slot name="left">
      <van-icon name="arrow-left" slot="left" @click="goBack" size="20px" />
    </slot>
    <!-- 中间 -->
    <van-search
      v-model="value"
      left-icon="search"
      placeholder="请输入搜索关键词"
      shape="round"
      @focus="onSearchFocuse"
      @input="onTextChange"
    ></van-search>
    <!-- 右边 -->
    <slot name="right">
      <van-icon name="ellipsis" slot="right" @click="showNav" size="20px" />
    </slot>
  </header>
</template>

<script>
export default {
  props: ['keyword'],
  data() {
    return {
      value: this.keyword
    }
  },
  methods: {
    onSearchFocuse() {
      if (this.$route.path !== '/search') this.$router.push('/search')
    },
    onTextChange(value) {
      this.$store.commit('setKeyword', this.value)
    },
    goBack() {
      this.common.goBack(this)
    },
    showNav() {}
  }
}
</script>

<style lang="less" scoped>
header {
  height: @tbHeight;
  z-index: 99;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  box-sizing: border-box;
  padding: 0 @RLpadding;
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-size: @fs;
  border-bottom: 1px solid @borderc;
  .van-search {
    flex: 1;
    margin: 0px 10px;
    padding-left: 7px;
    border-radius: 24px;
  }
  button {
    border-radius: 5px;
  }
}
</style>