import {get,post_json} from '../http/axios'
import Vue from 'vue';
import moment from 'moment';

export default {
    namespaced:true,
    state:{
        orders:[]
        
    },
    mutations:{
        refreshOrders(state,orders){
            state.orders = orders;
        }
    },   
    getters:{
        getOrdersFilter(state){
            return(status)=>{
                return state.orders.filter(item=>item.status === status)
            }
        }

    },
    actions:{
        //查询订单
        async findWaiterOrders({commit,rootState}){
            let response = await get("order/query",{waiterId:rootState.user.userinfo.id});
            
           response.data.forEach((item,index)=>{
               response.data[index].time = moment(item.orderTime).format('YYYY-MM-DD HH:mm:ss')
                console.log(item.time);
           })
           commit("refreshOrders",response.data);
            console.log("response.data",response.data)
        },
        //接受订单
        async acceptOrder({commit,dispatch},orderId){
            let response = await get("/order/takeOrder",{orderId});
            dispatch("findWaiterOrders");
            return response;

        },
        //拒绝订单
        async rejectOrder({commit,dispatch},orderId){
            let response = await get("/order/rejectOrder",{orderId});
            dispatch("findWaiterOrders");
            return response;

        },
        //完成订单
        async completeOrder({commit,dispatch},orderId){
            let response = await get("/order/serviceCompleteOrder",{orderId});
            dispatch("findWaiterOrders");
            return response;
        }
    }
}