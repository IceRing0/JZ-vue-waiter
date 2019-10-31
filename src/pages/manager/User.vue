<template>
    <div class="my">
        <van-nav-bar fixed :title="'我的'"/>
        <div class="user-content">
           <div class="photo">
               <div class="photo-wrapper">
                   <img src="../../assets/images/1.jpg" alt="">
               </div>
             <div class="username" style="text-align:center;line-height:3em">{{userinfo.name}}</div>
           </div>
           <div class="line">    
                <div class="salary">我的收入</div>
                <div class="order">我的订单</div>
                <div class="logout" @click="logoutHandler">退出</div>
            </div>
        </div>
    </div>
</template>
<script>
import {mapState,mapActions,mapMutations,mapGetters} from 'vuex'
export default {
    data(){
        return {

        }
    },
    computed:{
        ...mapState("user",["userinfo"]),
    },
    methods: {
        ...mapActions("user",["logout"]),
        logoutHandler(){
            this.logout()
            .then(()=>{
                this.$router.push("/");
            })
        }
        
    }
}
</script>
<style scoped>
    .my .user-content {
        padding-top: 46px;
    }
    .photo {
        padding-top: 2em;
    }
   .photo .photo-wrapper{
        margin: 0 auto;
        width: 10em;
        height: 10em;
        border-radius: 50%;
        box-sizing: border-box;
        border:1px solid #eedded;
        overflow:hidden;
        padding: 1em; 
    }
    .photo img {
        width: 100%;
    }
    .line{
        font-size: 14px;
    }
    .line div{
        height: 20px;
        margin-bottom: 10px;
        border-bottom:1px solid #ccc;
        padding: 0 0 15px 30px;
    }
</style>