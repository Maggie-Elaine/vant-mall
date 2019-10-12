<template>
  <!-- 中间的选项栏 -->
  <div class="midBar_container">
    <div class="batTabs1">
      <van-dropdown-menu active-color="#ee0a24">
        <van-dropdown-item v-model="value1" :options="option1" />
        <van-dropdown-item v-model="value2" :options="option2" />
        <van-dropdown-item title="筛选" ref="item">
          <van-checkbox-group v-model="result">
            <van-cell-group>
              <van-cell
                v-for="(item, index) in list"
                clickable
                :key="index"
                :title="` ${item.title}`"
                @click="toggle(index)"
              >
                <van-checkbox
                  :name="item.type"
                  ref="checkboxes"
                  slot="right-icon"
                  checked-color="#e93b3d"
                />
              </van-cell>
            </van-cell-group>
          </van-checkbox-group>

          <div class="btn_group">
            <van-button block type="default" @click="onConfirm">取消</van-button>
            <van-button block type="danger" @click="onConfirm">确认</van-button>
          </div>
        </van-dropdown-item>
      </van-dropdown-menu>
    </div>
    <div class="batTabs2"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //v-model v1 12 选中的结果 对应option的value
      value1: 0,
      value2: 'a',
      option1: [
        { text: '综合', value: 0 },
        { text: '最新上架', value: 1 },
        { text: '价格最低', value: 2 },
        { text: '价格最高', value: 3 },
        { text: '评价最多', value: 4 }
      ],
      option2: [{ text: '销量', value: 'a' }],
      //自定义下拉菜单的复选框
      list: [
        { type: 1, title: '有货优先' },
        { type: 2, title: '货到付款' },
        { type: 3, title: '海囤全球' },
        { type: 4, title: '促销商品' },
        { type: 5, title: '配送全球' }
      ],
      //result是选中的复选框 对应checkBox的 name[]-->list[].type
        result: [],
    }
  },
  methods: {
    onConfirm() {
      this.$refs.item.toggle()
    },
    toggle(index) {
      this.$refs.checkboxes[index].toggle()
      var cbox=this.$refs.checkboxes[index].$el;

      cbox.parentNode.getElementsByTagName('span')[0].classList.toggle('checked');
    }
  },
  watch: {},
  components: {
    // result() {

    // }
  }
}
</script>

<style lang="less">
.midBar_container {
  .batTabs1 {
    .btn_group {
      display: flex;
      flex-direction: row;
      button:first-of-type {
        color: @red;
      }
    }
  }
}
.checked{
    color: #e93b3d ;
}
</style>