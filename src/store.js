import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: { //data
        keyword: '',
        islogin: false, //默认false 未登录
        productList: [],//看底下product例子
    },
    mutations: { //methods
        setKeyword(state, keyword) {
            state.keyword = keyword.trim();
        },
        setlogin(state, flag) {
            state.islogin = flag;
        },
        addProduct(state, product) {
            var f=false
            //有则追加,无则添加 
            state.productList.some(item => {
                if (item.selectedSkuComb.id == product.selectedSkuComb.id) {
                    item.selectedNum += product.selectedNum;
                    return f=true
                }
            })
            if(!f)
            state.productList.push(product)
        },
        removeProduct(state, product) {
            //逐个删除 -- 最后留有一个
            state.productList.some(item => {
                if (item.selectedSkuComb.id == product.selectedSkuComb.id) {
                    if (item.selectedNum > 1)
                        item.selectedNum--
                     return true
                }
            })
        },
        deleteProduct(state, product) {
            //整个删除 
            state.productList.some((item, index) => {
                if (item.selectedSkuComb.id == product.selectedSkuComb.id) {
                    state.productList.splice(index, 1)
                    return true
                }
            })
        },
    },
    getters: {
        
    }
})

var p1 = {
    goodsId: "10011",
    selectedNum: 1,
    selectedSkuComb: {
        id: 10011,
        price: 499900,
        s1: "0001",
        s2: "0011",
        s3: "0",
        stock_num: 111
    },
    messages: {},
    cartMessages: {},
    good: {
        imgs: ["../images/product/p1.webp", "../images/product/p2.webp", "../images/product/p3.webp"],
        title: "华为 HUAWEI P30 Pro 超感光徕卡四摄10倍混合变焦麒麟980芯片屏内指纹 8GB+128GB极光色全网通版双4G手机",
        price: 4999
    }
}

export default store