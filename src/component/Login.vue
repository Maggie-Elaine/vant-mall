<template>
  <div class="login_container">
    <TopBar :title="title" :flag="flag"></TopBar>

    <div class="main_content">
      <div class="input_container">
        <van-cell-group>
          <van-field v-model="username" placeholder="用户名/邮箱.手机号(默认root)" />
        </van-cell-group>
        <van-cell-group>
          <van-field
            v-model="password"
            placeholder="请输入密码"
            type="password"
            ref="pwd"
            @click-right-icon="showpwd"
          >
            <van-icon slot="right-icon" name="closed-eye" v-if="flagEye" />
            <van-icon slot="right-icon" name="eye-o" v-if="!flagEye" />
            <van-button slot="button" size="mini" type="default">忘记密码</van-button>
          </van-field>
        </van-cell-group>
      </div>

      <van-button type="primary" size="large" round color="#ffbdb4" @click="login">登录</van-button>
      <van-button type="danger" size="large" round plain>注册</van-button>

      <p class="quick_login">
        <span>短信验证码登录</span>
        <span>手机快速注册</span>
      </p>

      <van-divider>其他方式登录</van-divider>
      <div class="others_login">
        <div>
          <van-icon name="alipay" size="40px" />
          <span>支付宝</span>
        </div>
        <div>
          <van-icon name="chat" size="40px" />
          <span>微信</span>
        </div>
      </div>
      <p class="policy">
        登录即代表您已同意
        <a>商城协议</a>
      </p>
    </div>
  </div>
</template>

<script>
import TopBar from '../component-sub/TopBar.vue'
import { Toast } from 'vant'

export default {
  data() {
    return {
      title: '登录注册',
      flag: true, //true为不显示
      flagEye: true,
      username: '',
      password: ''
    }
  },
  methods: {
    showpwd() {
      this.flagEye = !this.flagEye
      var pwdInput = this.$refs.pwd.$el.getElementsByTagName('input')
      pwdInput[0].type = this.flagEye ? 'password' : 'text'
    },
    login() {
      // this.$store.commit('setlogin', true)
      // this.$router.push('/userhome')
      // return

      //模拟登陆
      if (this.username == 'root' && this.password == 'root') {
        // localStorage.setItem('login',true);
        this.$store.commit('setlogin', true)
        if (this.$route.query.redirect) {
          //到登陆前页面
          this.$router.push(this.$route.query.redirect)
        } else {
          //到用户中心
          this.$router.push('/home')
        }
      } else {
        Toast('用户名或密码错误')
        this.password = ''
      }
    }
  },
  mounted() {
    // this.login()
  },
  components: {
    TopBar
  }
}
</script>

<style lang="less">
.login_container {
  .main_content {
    padding: 0 25px;
    .input_container {
      padding: 10px 0;
      & > div {
        margin-bottom: 10px;
        border-bottom: 1px solid @borderc2;
        span {
          font-size: @fs - 1;
          padding-left: 10px;
        }
      }
    }
    button {
      margin-bottom: 10px;
    }
    .quick_login {
      margin-top: 15px;
      display: flex;
      justify-content: space-between;
      font-size: @fs - 1;
      color: @grey;
    }
    .others_login {
      display: flex;
      justify-content: center;
      & > div {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin: 0 15px;
        span {
          font-size: @fs - 2;
          color: @grey;
        }
      }
    }
    .policy {
      text-align: center;
      margin-top: 20px;
      font-size: @fs - 2;
      color: @grey;
      a {
        color: @linkColor;
      }
    }
  }
  .van-hairline--top-bottom::after,
  .van-hairline-unset--top-bottom::after {
    border: none;
  }
  .van-button--default {
    border: none;
    border-radius: 0;
    border-left: 1px solid @grey2;
  }
  .van-divider {
    margin-top: 50px;
    font-size: @fs - 2;
  }
}
</style>