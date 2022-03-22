import { wxminilogin, wxminibind } from '@/server/api'
import fetch from '@/server/fetch'
import { setUserInfo, setLgoinInfo, getLgoinInfo } from '@/common/local'

// 授权
export const loginFun = (callBack) => {
   console.log('授权', callBack)
   return uni.login({
      provider: 'weixin',
      success(res) {
         if (res.code) {
            console.log(res.code)
            fetch(wxminilogin, 'post', { code: res.code }, true).then(res => {
               console.log('登录', res.data)
               const { data } = res.data
               setLgoinInfo(data);
               callBack(data)
            })
         } else {
            console.log('登录失败！' + res.errMsg)
         }
      }, fail(err) {
         console.log(err)
      }
   })
}
//绑定用户信息
function bindUserInfoFun(data) {
   const params = {
      avatarUrl: data.avatarUrl,
      cityDesc: data.city,
      countryDesc: data.country,
      gender: data.gender,
      language: data.language,
      nickname: data.nickName,
      provinceDesc: data.province
   }
   fetch(wxminibind, 'put', params).then(res => {
      console.log('绑定用户信息', res.data)
      let uInfo = getLgoinInfo()
      uInfo.wxminiBound = res.data.wxminiBound
      setLgoinInfo(uInfo)
   })
}

// 获取用户信息
export function getUserInfoFun() {
   uni.getUserProfile({
      lang: 'zh_CN',
      desc: "获取用户授权信息",
      success(res) {
         const { userInfo } = res
         setUserInfo(userInfo)
         bindUserInfoFun(userInfo)
      },
      fail(err) { },
   });
}