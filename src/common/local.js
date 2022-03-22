// 用户信息
const USER_INFO = 'userInfo'
// 登录信息
const LOGIN_INFO = 'lgoinInfo'


// 存储用户信息
export function setUserInfo(data) {
   uni.setStorageSync(USER_INFO, data)
}
// 获取用户信息
export function getUserInfo() {
  return uni.getStorageSync(USER_INFO)
}
// 移除用户信息
export function removeUserInfo() {
   uni.removeStorageSync(USER_INFO)
}

// 存储登录后信息
export function setLgoinInfo(data) {
   uni.setStorageSync(LOGIN_INFO, data)
}
// 获取登录后信息
export function getLgoinInfo() {
  return uni.getStorageSync('lgoinInfo')
}
// 移除登录后信息
export function removeLgoinInfo() {
   uni.removeStorageSync(LOGIN_INFO)
}
