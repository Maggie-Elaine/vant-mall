import { Toast } from 'vant'

var common = {
    toCategory(that) {
        that.$router.push('/category');
    },
    toLogin(that) {
        that.$router.push('/login');
    },
    toProduct(that, item) {
        that.$router.push(`/product/${item.id}`);
    },
    goBack(that) {
        that.$router.go(-1);
    },
    //处理一级子元素
    dealChildren(parent, callback) {
        for (let i = 0; i < parent.length; i++) {
            if(parent[i].nodeName.indexOf("#text")>=0) {
                continue
            };
            callback(parent[i]);
        }
    },
    //模拟登陆检查
    loginAxios(that,url,data,callback){
        //模拟后台检查
        // var islogin=localStorage.getItem('login');
        var islogin=that.$store.state.islogin
        if(islogin==false){
            Toast('即将跳转登录页面')
            that.$router.push({name:'login',query:{redirect:that.$route.path}});
        }else if(islogin==true){
            callback();
        }else{
            Toast('未知错误');
        }
    }
    
}
export default common