<template>
  <!-- 商品列表组件 样式: 1行2列 默认不加载 immediate-check="false" -->
  <div>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      class="van-clearfix"
      :immediate-check="ischeck?true:false"
    >
      <!-- 商品信息卡片 -->
      <div class="good_box" @click="toProduct(item)" v-for="(item, index) in goodList" :key="index">
        <!-- 图片 -->
        <van-image width="100%" :src="item.img" lazy-load />
        <div class="good_info">
          <!-- 标题 -->
          <p>{{item.title}}</p>
          <!-- 价格 -->
          <div class="box_mid">
            <p>${{item.price}}</p>
            <van-button plain hairline type="default" size="mini" class="similar">看相似</van-button>
          </div>
          <!-- 店铺 -->
          <div class="box_bottom">
            <span>{{item.shop}}</span>
            <van-icon name="arrow" color="#909090" />
          </div>
        </div>
      </div>
    </van-list>
  </div>
</template>

<script>
export default {
  //请求路径
  props: ['path','ischeck'],
  data() {
    return {
      page: 1,
      goodList: [],
      loading: false,
      finished: false
    }
  },

  methods: {
    toProduct(item) {
      this.common.toProduct(this, item)
    },
    onLoad() {
      // console.log(this.path)

      // 异步更新数据 这里的请求url 应该由外部传入
      this.axios.get(`../fake/goodList${this.page}.json`).then(res => {
        for (let i = 0; i < res.data.length; i++)
          this.goodList.push(res.data[i])
        // 加载状态结束
        this.loading = false
        //模拟下一页
        this.page++
        // 数据全部加载完成
        if (this.page >= 4) this.finished = true
      })
    }
  },
  created() {}
}
</script>

<style lang="less" >
.van-list {
  width: 100%;
  position: relative;
  //   overflow: hidden;
  > div {
    float: left;
  }
  .good_box {
    width: 49%;
    font-size: @fs - 1;
    padding-bottom: 5px;
    margin-bottom: 5px;
    box-shadow: 0px 0px 5px #ccc;
    background-color: @white;
    &:nth-child(odd) {
      padding-right: 5px;
    }
    .good_info {
      padding: 0 5px;
      p:first-of-type {
        //显示2行
        height: 3.6em;
        line-height: 1.8;
        overflow: hidden;
        position: relative;
        &:after {
          content: '';
          text-align: right;
          position: absolute;
          bottom: 0;
          right: 0;
          width: 10%;
          height: 1.8em;
        }
      }
      span:last-of-type {
        font-size: @fs - 3;
        color: @grey;
      }
      .box_mid {
        display: flex;
        justify-content: space-between;
        p {
          color: @red;
          font-size: @fs;
          height: 22px;
          background-color: @white;
        }
        .similar {
          font-size: @fs - 2;
          span {
            //   color: black;
          }
        }
      }
      .box_bottom {
        display: flex;
      }
    }
  }
  .van-list__loading,
  .van-list__finished-text {
    margin-top: 20px;
    position: relative;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>