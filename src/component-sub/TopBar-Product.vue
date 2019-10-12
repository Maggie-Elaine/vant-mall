<template>
  <!-- 商品页面顶部通栏 -->
  <header class="bar_product" ref="barproduct">
    <van-nav-bar
      @click-left="onClickLeft"
      @click-right="onClickRight"
      :fixed="true"
      :border="false"
    >
      <van-icon name="arrow-left" slot="left" size="20px" />
      <van-icon name="ellipsis" slot="right" size="20px" />
      <ul slot="title" v-show="myflagT">
        <li class="bar_product_active" @click="activeBar($event)">
          <span>
            <van-icon name="location" />商品
          </span>
        </li>
        <li @click="activeBar($event)">
          <span>
            <van-icon name="location" />评价
          </span>
        </li>
        <li @click="activeBar($event)">
          <span>
            <van-icon name="location" />详情
          </span>
        </li>
        <li @click="activeBar($event)">
          <span>
            <van-icon name="location" />推荐
          </span>
        </li>
      </ul>
    </van-nav-bar>
  </header>
</template>

<script>
export default {
  props: [],
  data() {
    return {
      myflagT: false,
      active: 0
    }
  },
  methods: {
    onClickLeft() {
      this.common.goBack(this)
    },
    onClickRight() {},
    switchBar() {
      var bar = this.$refs.barproduct
      if (window.scrollY > 50) {
        bar.classList.remove('start')
        bar.classList.add('scroll')
        this.myflagT=true;
      } else {
        bar.classList.remove('scroll')
        bar.classList.add('start')
        this.myflagT=false;
      }
    },
    activeBar(event) {
      var tar = event.currentTarget
      var children = tar.parentNode.childNodes
      this.common.dealChildren(children, node => {
        node.classList.remove('bar_product_active')
      })
      tar.classList.add('bar_product_active')
    }
  },
  mounted: function() {
    window.addEventListener('scroll', this.switchBar, true) // 监听（绑定）滚轮滚动事件
  },
  watch: {}
}
</script>

<style lang="less" >
.bar_product {
  .start();
  ul {
    font-size: @fs;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .van-icon {
      color: transparent;
    }
  }
}
.start {
  .iconColor(@white);
  .iconBgc(rgba(89,89,89,.7));
  .searchBarbgc(transparent);
}
.scroll {
  .iconColor();
  .iconBgc(@white);
  .searchBarbgc(@white);
  border-bottom: 1px solid @borderc;
}
.bar_product_active {
  color: @red;
  i.van-icon {
    color: @red;
  }
}

</style>