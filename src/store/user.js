import {get,post,post_json} from '../http/axios'
import Vue from 'vue';
import {setToken,getToken,removeToken} from '../utils/auth'
import { Toast } from 'vant';

Vue.use(Toast);

export default {
    namespaced:true,
   state:{
       token:getToken(),
       userinfo:{

       }
   },
   mutations:{
        refreshUserInfo(state,userinfo){
            state.userinfo = userinfo
        },
        beginLoading(state){
            state.loading = true;
        },
        endLoading(state){
            state.loading = false;
        },
        refreshToken(state,token){
            state.token = token;
        }
   },   
   getters:{

   },
   actions:{
       async waiterLogin({commit},data){
        //   1.登录
        let response = await post_json("/user/login",data);
        let token = response.data.token;
        console.log(token)
        //2.将token 缓存起来 localStorage
        setToken(token)
        // 3.将token维护到状态机中
        commit("refreshToken",token)
        console.log(response)
        
        },
        //通过token获取userinfo
        async getUserInfo({commit},token){
            let response = await get("/user/info?token="+token);
            console.log("response=>",response);
            commit("refreshUserInfo",response.data);
       },
       //退出
       async logout(context){
           //1.请求后台退出
            await post('/user/logout');
            //2.清理本地缓存
            removeToken();
            //3.清理store
            context.commit('refreshToken','')
            context.commit('refreshUserInfo',{})
       }
   }
}