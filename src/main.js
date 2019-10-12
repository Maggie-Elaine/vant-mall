import Vue from 'vue'

//=================================
//可以根据官方文档 导入所需组件
import Vant from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant);
import { Lazyload,ImagePreview } from 'vant';
Vue.use(Lazyload);Vue.use(ImagePreview);
//=================================


//=================================
import axios from 'axios';
// axios.defaults.baseURL='http://www.example.com:3000 '
Vue.prototype.axios=axios   
//=================================

//=================================
import store from './store.js'
//=================================

//=================================
import VueRouter from 'vue-router'
import router from './router.js'
Vue.use(VueRouter);
//=================================

import app from './App.vue'
import common from './js/common.js'
Vue.prototype.common=common   

var vm = new Vue({
    el: '#app',
    data: {},
    render: c => c(app),
    router,
    store,
})