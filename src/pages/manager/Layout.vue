<template>
    <div class="layout">
        <router-view></router-view>
        <div class="nav">
            <van-tabbar v-model="active" @change = "tabChangeHandler">
                <van-tabbar-item name="/manager/home" icon="home-o">首页</van-tabbar-item>
                <van-tabbar-item name="/manager/order" icon="orders-o">订单</van-tabbar-item>
                <van-tabbar-item name="/manager/user" icon="user-circle-o">我的</van-tabbar-item>
            </van-tabbar>
        </div>
        
    </div>
    
</template>
<script>
import {mapState,mapActions} from 'vuex'
export default {
    data(){
        return {
            active:0
        }
    },
    created(){
        if(this.token){
            //查询userinfo
            this.getUserInfo(this.token);
        }else{
            this.$toast("token失效"),
            this.$router.push({path:'/manager/home'})
        }
    },
    computed:{
        ...mapState("user",["token"])
    },
    methods:{
        ...mapActions("user",["getUserInfo"]),
        tabChangeHandler(path){
            this.$router.push({path});
        }
    }
}
</script>
<style scoped>

</style>