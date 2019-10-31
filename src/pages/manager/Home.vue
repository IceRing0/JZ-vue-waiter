<template>
  <div class="home">
     <van-row>
      <img style="width:100%;height:300px;" src="../../assets/images/2.jpg" alt="">
    </van-row>
     <div class="details">
        <van-row v-if="getOrdersFilter('待接单').length !==0">
        <van-panel class="title" :title="o.customer.realname" :status="o.status" v-for="o in getOrdersFilter('待接单')" :key="o.id">
          <van-row >                     
            <van-col :span="4" style="text-align:center; margin-bottom:10px;">
                <van-icon name="gold-coin-o" /></van-col>
              <van-col :span="20">总额： {{o.total}}</van-col>
          </van-row>
          <van-row>  
            <van-col :span="4" style="text-align:center; margin-bottom:10px;">
              <van-icon name="clock-o" /></van-col>
              <van-col :span="20">下单时间： {{o.time}}</van-col>
          </van-row>
          <van-row>                     
            <van-col :span="4" style="text-align:center; margin-bottom:10px;">
                <van-icon name="todo-list-o" /></van-col>
              <van-col :span="20">服务内容： {{}}</van-col>
          </van-row>
          <van-row>
              <van-col :span="4" style="text-align:center; margin-bottom:5px;">
                  <van-icon name="location-o" /></van-col>
              <van-col :span="20">地址： {{o.address.province+" "+o.address.city+" "+o.address.area}}</van-col>
          </van-row>
           <div slot="footer" style="text-align:right">
              <div v-if="o.status === '待接单'">
                <van-button size="small" type="warning" plain @click="rejectHandler(o.id)">拒绝</van-button>&nbsp;
                <van-button size="small" type="primary" plain @click="acceptHandler(o.id)">接受</van-button> 
              </div>
          </div>
        </van-panel>
      </van-row>
      <van-row v-else-if="getOrdersFilter('待接单').length == 0">
          <div class="nullData">暂无接单数据</div>
      </van-row>
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
      ...mapState("order",["orders"]),
      ...mapGetters("order",["getOrdersFilter"])
    },
    methods:{
      ...mapActions("order",["acceptOrder","rejectOrder","completeOrder"]),
      // 普通方法
      //拒绝订单
      rejectHandler(orderId){
        this.rejectOrder(orderId)
        .then((response)=>{
            this.$toast(response.statusText);
        })
      },
      //接受订单
       acceptHandler(orderId){
        this.acceptOrder(orderId)
        .then((response)=>{
            this.$toast(response.statusText);
        })
      },


      
    }
}
</script>

<style scoped>
.details{
  font-size: 13px;
}
.nullData{
  font-size: 20px;
  text-align: center;
  color: teal;
}
</style>