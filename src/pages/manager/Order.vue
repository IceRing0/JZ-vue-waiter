<template>
    <div class="order">
        <van-nav-bar :title="'我的'" sticky/>
        <van-tabs id="orderDetails" v-model="active" swipeable sticky >
            <van-tab title="所有订单">
                <van-row v-if="orders.length !== 0">
                    <van-panel class="title" :title="o.customer.realname" :status="o.status" v-for="o in orders" :key="o.id">
                        <van-row>                     
                        <van-col :span="4" style="text-align:center; margin-bottom:5px;">
                            <van-icon name="gold-coin-o" /></van-col>
                            <van-col :span="20">总额： {{o.total}}</van-col>
                        </van-row>
                        <van-row>  
                        <van-col :span="4" style="text-align:center; margin-bottom:5px;">
                            <van-icon name="clock-o" /></van-col>
                            <van-col :span="20">下单时间： {{o.time}}</van-col>
                        </van-row>
                        <van-row>                     
                        <van-col :span="4" style="text-align:center; margin-bottom:5px;">
                            <van-icon name="todo-list-o" /></van-col>
                            <van-col :span="20">服务内容： {{}}</van-col>
                        </van-row>
                        <van-row>
                            <van-col :span="4" style="text-align:center; margin-bottom:5px;">
                                <van-icon name="location-o" /></van-col>
                            <van-col :span="20">地址： {{o.address.province+" "+o.address.city+" "+o.address.area}}</van-col>
                        </van-row>
                    
                    </van-panel>
                </van-row>
                <van-row v-else-if="orders.length == 0">
                    <div class="nullData">暂无订单</div>
                </van-row>
                
            </van-tab>
            <van-tab title="未接订单">
               <van-row v-if="getOrdersFilter('待接单').length !== 0">
                    <van-panel class="title" :title="o.customer.realname" :status="o.status" v-for="o in getOrdersFilter('待接单')" :key="o.id">
                        <van-row>                     
                            <van-col :span="4" style="text-align:center; margin-bottom:5px;">
                                <van-icon name="gold-coin-o" /></van-col>
                                <van-col :span="20">总额： {{o.total}}</van-col>
                        </van-row>
                        <van-row>  
                            <van-col :span="4" style="text-align:center; margin-bottom:5px;">
                                <van-icon name="clock-o" /></van-col>
                                <van-col :span="20">下单时间： {{o.time}}</van-col>
                        </van-row>
                        <van-row>                     
                            <van-col :span="4" style="text-align:center; margin-bottom:5px;">
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
                    <div class="nullData">暂无待接单数据</div>
                </van-row>
            </van-tab>
            <van-tab title="已接订单">
               <van-row v-if="getOrdersFilter('待服务').length !== 0">
                    <van-panel class="title" :title="o.customer.realname" :status="o.status" v-for="o in getOrdersFilter('待服务')" :key="o.id">
                        <van-row>                     
                            <van-col :span="4" style="text-align:center; margin-bottom:5px;">
                                <van-icon name="gold-coin-o" /></van-col>
                                <van-col :span="20">总额： {{o.total}}</van-col>
                        </van-row>
                        <van-row>  
                            <van-col :span="4" style="text-align:center; margin-bottom:5px;">
                                <van-icon name="clock-o" /></van-col>
                                <van-col :span="20">下单时间： {{o.time}}</van-col>
                        </van-row>
                        <van-row>                     
                            <van-col :span="4" style="text-align:center; margin-bottom:5px;">
                                <van-icon name="todo-list-o" /></van-col>
                                <van-col :span="20">服务内容： {{}}</van-col>
                        </van-row>
                        <van-row>
                                <van-col :span="4" style="text-align:center; margin-bottom:5px;">
                                    <van-icon name="location-o" /></van-col>
                                <van-col :span="20">地址： {{o.address.province+" "+o.address.city+" "+o.address.area}}</van-col>
                        </van-row>
                        <div slot="footer" style="text-align:right">
                            <div v-if="o.status === '待服务'">
                                <van-button size="small" type="warning" plain @click="completeHandler(o.id)">完成</van-button>&nbsp;
                               
                            </div>
                        </div>
                    </van-panel>
                </van-row>
                <van-row v-else-if="getOrdersFilter('待服务').length == 0">
                    <div class="nullData">暂无待服务订单</div>
                </van-row>
            </van-tab>
            <van-tab title="待确认">
               <van-row v-if="getOrdersFilter('待确认').length !== 0">
                    <van-panel class="title" :title="o.customer.realname" :status="o.status" v-for="o in getOrdersFilter('待确认')" :key="o.id">
                        <van-row>                     
                            <van-col :span="4" style="text-align:center; margin-bottom:5px;">
                                <van-icon name="gold-coin-o" /></van-col>
                                <van-col :span="20">总额： {{o.total}}</van-col>
                        </van-row>
                        <van-row>  
                            <van-col :span="4" style="text-align:center; margin-bottom:5px;">
                                <van-icon name="clock-o" /></van-col>
                                <van-col :span="20">下单时间： {{o.time}}</van-col>
                        </van-row>
                        <van-row>                     
                            <van-col :span="4" style="text-align:center; margin-bottom:5px;">
                                <van-icon name="todo-list-o" /></van-col>
                                <van-col :span="20">服务内容： {{}}</van-col>
                        </van-row>
                        <van-row>
                                <van-col :span="4" style="text-align:center; margin-bottom:5px;">
                                    <van-icon name="location-o" /></van-col>
                                <van-col :span="20">地址： {{o.address.province+" "+o.address.city+" "+o.address.area}}</van-col>
                        </van-row>
                        
                    </van-panel>
                </van-row>
                <van-row v-else-if="getOrdersFilter('待确认').length == 0">
                    <div class="nullData">暂无订单</div>
                </van-row>
            </van-tab>
            <van-tab title="已完成">
               <van-row v-if="getOrdersFilter('已完成').length !== 0">
                    <van-panel class="title" :title="o.customer.realname" :status="o.status" v-for="o in getOrdersFilter('已完成')" :key="o.id">
                        <van-row>                     
                            <van-col :span="4" style="text-align:center; margin-bottom:5px;">
                                <van-icon name="gold-coin-o" />
                            </van-col>
                            <van-col :span="20">总额： {{o.total}}</van-col>
                        </van-row>
                        <van-row>  
                            <van-col :span="4" style="text-align:center; margin-bottom:5px;">
                                <van-icon name="clock-o" />
                            </van-col>
                            <van-col :span="20">下单时间： {{o.time}}</van-col>
                        </van-row>
                        <van-row>                     
                            <van-col :span="4" style="text-align:center; margin-bottom:5px;">
                                <van-icon name="todo-list-o" /></van-col>
                                <van-col :span="20">服务内容： {{}}</van-col>
                        </van-row>
                        <van-row>
                                <van-col :span="4" style="text-align:center; margin-bottom:5px;">
                                    <van-icon name="location-o" /></van-col>
                                <van-col :span="20">地址： {{o.address.province+" "+o.address.city+" "+o.address.area}}</van-col>
                        </van-row>
                        
                    </van-panel>
                </van-row>
                <van-row v-else-if="getOrdersFilter('已完成').length == 0">
                    <div class="nullData">暂无订单</div>
                </van-row>
            </van-tab>
        </van-tabs>
    </div>
</template>
<script>
import {mapState,mapActions,mapMutations,mapGetters} from 'vuex'
export default {
    data(){
        return {
            active:0,
        };
    },
     created(){
        this.findWaiterOrders()
    },
    computed:{
        ...mapState("order",["orders"]),
         ...mapState("user",["userinfo"]),
        ...mapGetters("order",["getOrdersFilter"])
    },
   
    methods:{
        ...mapActions("order",["findWaiterOrders","acceptOrder","rejectOrder","completeOrder"]),
        
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
      //完成订单
      completeHandler(orderId){
        this.completeOrder(orderId)
        .then((response)=>{
            this.$toast(response.statusText);
        })
      },

    }
}
</script>
<style scoped>
    #orderDetails{
        font-size: 12px;
    }
.nullData{
  font-size: 20px;
  text-align: center;
  color: teal;
}
</style>