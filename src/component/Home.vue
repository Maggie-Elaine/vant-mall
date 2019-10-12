<template>
  <div class="home_container">
    <!-- 顶部 -->
    <TopBarSearch>
      <van-icon name="wap-nav" slot="left" @click="toCategory" size="20px" />
      <div @click="toLogin" slot="right" class="right-text">登录</div>
    </TopBarSearch>
    <!-- 轮播图 -->
    <van-swipe :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="(item, index) in swipeList" :key="index" @click="toProduct(item)">
        <van-image :src="item.img" radius="10px" width="100%">
          <template v-slot:error>加载失败</template>
        </van-image>
      </van-swipe-item>
    </van-swipe>
    <!-- 宫格 -->
    <van-grid :border="false" :column-num="4">
      <van-grid-item @click="info" icon="shop" text="文字" />
      <van-grid-item @click="info" icon="bag" text="文字" />
      <van-grid-item @click="info" icon="point-gift" text="文字" />
      <van-grid-item @click="info" icon="photo-o" text="文字" />
      <van-grid-item @click="info" icon="service" text="文字" />
      <van-grid-item @click="info" icon="send-gift" text="文字" />
      <van-grid-item @click="info" icon="vip-card" text="文字" />
      <van-grid-item @click="info" icon="hot" text="文字" />
    </van-grid>
    <!-- 秒杀 -->
    <div class="ms_container">
      <div class="ms_panel">
        <div class="left">
          <van-icon name="hot" size="35px" color="#e93b3d" />
          <span class="ms_text">0点场</span>
          <van-count-down :time="time">
            <template v-slot="timeData">
              <span class="time_item">{{ timeData.hours }}</span>
              <span>:</span>
              <span class="time_item">{{ timeData.minutes }}</span>
              <span>:</span>
              <span class="time_item">{{ timeData.seconds }}</span>
            </template>
          </van-count-down>
        </div>
        <div class="right">
          <router-link to="/">更多秒杀</router-link>
        </div>
      </div>
      <div class="ms_content">
        <ul class="ms_ul">
          <router-link
            :to="'/product/'+item.id"
            tag="li"
            v-for="(item, index) in msList"
            :key="index"
          >
            <van-image :src="item.img">
              <template v-slot:loading>
                <van-loading type="spinner" size="20" />
              </template>
              <template v-slot:error>加载失败</template>
            </van-image>
            <p>${{item.newPrice}}</p>
            <p>${{item.oldPrice}}</p>
          </router-link>
        </ul>
      </div>
    </div>
    <!-- 中间图片 -->
    <div class="mid_container">
      <van-image src="../images/mid_left.png">
        <template v-slot:loading>
          <van-loading type="spinner" size="20" />
        </template>
        <template v-slot:error>加载失败</template>
      </van-image>
      <van-image src="../images/mid_right.png">
        <template v-slot:loading>
          <van-loading type="spinner" size="20" />
        </template>
        <template v-slot:error>加载失败</template>
      </van-image>
    </div>
    <!-- 为你推荐 -->
    <div class="recommend">
      <div class="rc_Bar">
        <van-image width="100%" src="../images/rc_bar.png" />
      </div>
      <div class="rc_content">
        <GoodList :path="rcPath" :ischeck="ischeck"></GoodList>
      </div>
    </div>
  </div>
</template>

<script>
import TopBarSearch from '../component-sub/TopBar-Search.vue'
import GoodList from '../component-sub/GoodList.vue'
import { Toast } from 'vant'

export default {
  data() {
    return {
      rcPath: 'url:推荐的连接',
      swipeList: [],
      ischeck:true,
      msList: [],
      time: 30 * 60 * 60 * 1000
    }
  },
  methods: {
    toCategory() {
      this.common.toCategory(this)
    },
    toLogin() {
      this.common.toLogin(this)
    },
    toProduct(item) {
      this.common.toProduct(this, item)
    },
    info() {
      Toast('暂未开放')
    },
    getSwipe() {
      this.axios.get('../fake/swipeList.json').then(res => {
        this.swipeList = res.data
      })
    },
    getMS() {
      this.axios.get('../fake/msList.json').then(res => {
        this.msList = res.data
      })
    }
  },
  components: {
    TopBarSearch,
    GoodList
  },
  computed: {},
  created() {
    this.getSwipe()
    this.getMS()
  },
  mounted() {}
}
</script>

<style lang="less">
.home_container {
  padding: @tbHeight+5 @RLpadding 20px;
  background-color: @bgc;
  header {
    font-size: @fs;
    border: none;
    background-color: #ffc973;
  }
  .van-grid {
    margin: 5px 0;
    .van-grid-item__content {
      background-color: @bgc;
    }
  }
  .ms_container {
    background-color: @white;
    .ms_panel {
      height: 42px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .left {
        display: flex;
        align-items: center;
        .ms_text {
          padding: 0 5px;
        }
        .time_item {
          display: inline-block;
          width: 22px;
          margin-right: 5px;
          font-size: @fs - 2;
          text-align: center;
          background-color: #f6f6f6;
        }
      }
      .right {
        color: @red;
      }
    }
    .ms_content {
      width: 100%;
      ul {
        overflow-x: scroll;
        width: 100%;
        display: flex;
        padding-bottom: 10px;
        li {
          text-align: center;
          width: 20%;
          padding: 0 5px;
          .van-image {
            width: 75px;
            height: 75px;
          }
          p {
            width: 75px;
          }
          p:first-of-type {
            font-size: @fs + 4;
            color: @red;
          }
          p:last-of-type {
            font-size: @fs - 2;
            text-decoration: line-through;
          }
        }
      }
    }
  }
  .mid_container {
    display: flex;
    margin-top: 10px;
    .van-image {
      img {
        display: block;
      }
      &:first-child img {
        border-top-left-radius: 10px;
        border-bottom-left-radius: 10px;
      }
      &:last-child img {
        border-top-right-radius: 10px;
        border-bottom-right-radius: 10px;
      }
    }
  }
  .recommend {
    width: 100%;
    margin-top: 10px;
    .rc_Bar {
      // height: 45px;
    }
  }
}
</style>