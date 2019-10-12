<template>
  <!-- 普通顶部通栏 -->
  <div class="normal_bar">
    <header>
      <van-nav-bar :title="title" @click-left="onClickLeft" @click-right="onClickRight">
        <van-icon name="arrow-left" slot="left"  size="20px" />
        <van-icon name="ellipsis" slot="right" v-show="!flag" size="20px" />
      </van-nav-bar>
    </header>
  </div>
</template>

<script>
export default {
  props: ['title', 'flag'],
  methods: {
    onClickLeft() {
      this.common.goBack(this)
    },
    onClickRight() {
      
    }
  }
}
</script>

<style lang="less" >
.normal_bar {
  border-bottom: 1px solid @borderc;
  .iconColor();
  .van-nav-bar .van-icon{
    color: @black;
  }
}
</style>