<template>
  <!-- 分类页面 -->
  <div class="category_container">
    <!-- 顶部搜索 -->
    <TopBarSearch></TopBarSearch>
    <!-- 侧边栏 items:一级菜单 -->
    <van-tree-select
      height="100%"
      :items="items"
      :main-active-index.sync="activeIndex"
      @click-nav="getContentList"
    >
      <!-- 二级菜单 -->
      <template slot="content">
        <ul class="box_list">
          <h4>热门分类</h4>
          <router-link
            tag="li"
            :to="{name:'products',query:{categoryId:item.id}}"
            class="box"
            v-for="(item, index) in contentList"
            :key="index"
          >
            <van-image :src="item.img" width="80%">
              <template v-slot:loading>
                <van-loading type="spinner" size="20" />
              </template>
            </van-image>
            <p>{{item.title}}</p>
          </router-link>
        </ul>
      </template>
    </van-tree-select>
  </div>
</template>

<script>
import TopBarSearch from '../component-sub/TopBar-Search.vue'
import { Toast } from 'vant'
export default {
  data() {
    return {
      categoryList: [],
      contentList: [],
      activeIndex: 0,
      items: []
    }
  },
  methods: {
    goBack() {
      this.common.goBack(this)
    },
    showNav() {},
    // 获取一级菜单
    getCategoryList() {
      this.axios.get('../fake/categoryList.json').then(res => {
        this.categoryList = res.data
        this.categoryList.forEach((item, index) => {
          this.items.push({ text: item.title, id: item.id, index: index })
        })
        this.getContentList(this.activeIndex)
      })
    },
    // 获取二级菜单
    getContentList(index) {
      this.axios
        .get(`../fake/contentList${this.items[index].id}.json`)
        .then(res => {
          this.contentList = res.data
        })
        .catch(err => {
          Toast('暂未开放')
          setTimeout(() => (this.activeIndex = 0), 200)
        })
    }
  },
  components: {
    TopBarSearch
  },
  created() {
    this.getCategoryList()
  }
}
</script>

<style lang="less" >
.category_container {
  padding-top: @tbHeight5;
  width: 100%;
  position: absolute;
  height: calc(~'100% - @{tbHeight5}');
  header {
    .searchBoxColor();
  }
  .box_list {
    h4 {
      padding: 5px 0;
      font-size: @fs;
    }
    .box {
      text-align: center;
      float: left;
      width: 33.33%;
      .van-image {
        width: 100%;
        height: 100%;
      }
      p {
        margin-bottom: 15px;
      }
    }
  }
}
</style>