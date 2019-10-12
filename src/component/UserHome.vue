<template>
  <div class="userhome_container">
    <TopBar :title="title"></TopBar>
    <!-- 用户头像栏 -->
    <div class="user_info">
      <van-image round width="60px" src="../images/user.png" />
      <div class="user_name">
        <p>id_9999</p>
        <p>用户名: id_9999</p>
        <p>
          <span>信誉度7846</span>
        </p>
      </div>
    </div>
    <div class="gap_round">
      <!-- 会员plus -->
      <div class="plus">
        <span>PLUS会员</span>
      </div>
    </div>
    <!-- 订单栏 -->
    <div class="order_bar">
      <van-grid>
        <van-grid-item icon="credit-pay" text="代付款" />
        <van-grid-item icon="logistics" text="收货" />
        <van-grid-item icon="after-sale" text="退换/售后" />
        <van-grid-item icon="orders-o" text="全部订单" />
      </van-grid>
    </div>
    <!-- 资产栏 -->
    <div class="assets">
      <van-grid>
        <van-grid-item text="施工中">
          <a>施工中</a>
          <!-- <a>施工中</a> -->
        </van-grid-item>
        <van-grid-item text="施工中" />
        <van-grid-item text="施工中" />
        <van-grid-item text="施工中" />
      </van-grid>
    </div>
  </div>
</template>

<script>
import TopBar from '../component-sub/TopBar.vue'

export default {
  data() {
    return {
      title: '用户中心'
    }
  },
  components: {
    TopBar
  }
}
</script>

<style lang="less">
.userhome_container {
  font-size: @fs;
  background-color: @grey4;
  .user_info {
    padding: 0 15px;
    padding-top: 15px;
    background-color: @yellow;
    display: flex;
    align-items: center;
    background: linear-gradient(90deg, @orange, @yellow);
    position: relative;
    .user_name {
      padding-left: 15px;
      line-height: @lh;
    }
  }
  .gap_round {
    position: relative;
    .plus {
      position: absolute;
      background-color: @black2;
      color: #ffe678;
      width: 90%;
      height: 30px;
      text-align: center;
      line-height: 30px;
      border-radius: 10px;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      margin: 10px 0;
    }
  }

  .order_bar {
    padding: 20px 0;
  }

  .gapRound();
  .gap();
  //   .gaph {
  //     &.gap {
  //         top: 0;
  //       width: 100%;
  //       height: 180px;
  //       position: absolute;
  //       z-index: -1;
  //     }
  //   }
}
</style>