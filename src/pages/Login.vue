
<template>
    <div class="login">
        <div class="waiter-login">
            <div class="logo">
                <img src="../assets/images/logo.png" alt="">
            </div>
            <div class="title">员工端</div>
        </div>
        <div class="content">
            <van-cell-group>
                <van-field
                    v-model="form.username"
                    required
                    clearable
                    label="用户名"
                    placeholder="请输入用户名"
                />
                <van-field
                    v-model="form.password"
                    type="password"
                    label="密码"
                    placeholder="请输入密码"
                    required
                />
            </van-cell-group>
        </div>
        <van-button id="waiter-submit" type="primary"  size="normal" @click="loginHandler">登陆</van-button>
        <van-button id="waiter-register" type="info" size="normal">注册</van-button>
  </div>
</template>

<script>
import {mapState,mapActions} from 'vuex'
import { Toast } from 'vant';
Toast.setDefaultOptions({ duration: 1500 });

export default {
    data(){
        return{
            form:{
                type:"waiter"
            }
        }
    },
    methods:{
        ...mapActions("user",["waiterLogin"]),
        loginHandler(){
            this.waiterLogin(this.form)
            .then((response)=>{
                Toast.success("登陆成功")
                 this.$router.push("/manager/home");
            },(error)=>{
                Toast.fail("登陆失败")
            })
        }
    }

}
</script>
<style scoped>
    .waiter-login{
        height: 200px;
        background-color: skyblue;
        padding: 50px 0;
    }
     .waiter-login .logo,
      .waiter-login .title{
          text-align: center;
      }
       .waiter-login .logo{
           margin-bottom: 50px;
       }
      .waiter-login .logo{
          height: 50px;
          color: white;
          line-height: 50px;
      }
      .waiter-login .title{
          height: 100px;
          line-height: 100px;
          font-size: 30px;
          color:white;
      }
    #waiter-submit,#waiter-register{
        margin: 10px 18px;
        width: 90%;
    }
</style>