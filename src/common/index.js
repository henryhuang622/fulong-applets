// 加载
export function loadingFun(text) {
   uni.showLoading({
     title: text
   });
 }

// 隐藏加载
export function hideLoadingFun() {
   uni.hideLoading()
 }

 //获取定位
export function getLocationFun() {
  return new Promise((resolve, reject) => {
    uni.getLocation({
      type: 'gcj02',
      success: function (res) {
        resolve(res)
      },
      fail: function (error) {
        console.log('执行', error)
        reject(error)
      }
    });
  })

}
 
 