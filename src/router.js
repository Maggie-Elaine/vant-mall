import VueRouter from 'vue-router'

import Home from './component/Home.vue'
import Login from './component/Login.vue'
import Cart from './component/Cart.vue'
import Search from './component/Search.vue'
import Product from './component/Product.vue'
import Products from './component/Products.vue'
import Category from './component/Category.vue'
import UserHome from './component/UserHome.vue'

var router=new VueRouter({
    routes:[
        {path:'/',redirect:'/home'},
        {path:'/home',component:Home},
        {path:'/cart',component:Cart},
        {path:'/search',component:Search},
        {path:'/userhome',component:UserHome},
        {path:'/category',component:Category},
        {path:'/product/:id',component:Product},
        {path:'/login',component:Login,name:'login'},
        {path:'/products',component:Products,name:'products'},
    ]
})

export default router