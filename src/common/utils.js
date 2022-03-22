
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

// 跳转 1.内部小程序  2.第三方小程序  3.H5 source
export function typeLinkFun(i, data) {
   console.log("跳转", i, data);
   if (data.source == 1) {
      uni.navigateTo({ url: `${data.url}` });
   } else if (data.source == 2) {
      wx.navigateToMiniProgram({
         appId: data.appid,
         path: data.url,
         envVersion: "release",
         success(res) {
            // 打开成功
         },
      });
   } else {
      uni.navigateTo({
         url:
            "/pages/link/index?link=" + encodeURIComponent(data.url) + "&title=" + encodeURIComponent(data.title)
      });
   }
}
