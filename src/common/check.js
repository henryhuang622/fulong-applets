import { userCenter } from "@/server/api";
import fetch from "@/server/fetch";

export function checkLoginFun(callBack) {
   fetch(userCenter, 'get').then(res => {
      const { data } = res.data
      console.log('wxminiBound', data.wxminiBound)
      if (data.wxminiBound == 'BOUND'&& data.phoneBound == 'BOUND') {
         callBack()
      } else {
         uni.navigateTo({ url: "/pages/authorize/index" });
      }
   })
}