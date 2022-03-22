# 富隆小程序
该框架使用[uni-app](https://uniapp.dcloud.io/)，UI框架使用[uview](https://www.uviewui.com/)

## 安装依赖
```
npm install
```

### 运行测试版小程序
```
npm run dev:mp-weixin
```

### 打包小程序
```
npm run build:mp-weixin
```

### pages.json 存放及配置页面
参考：
```
https://uniapp.dcloud.io/collocation/pages
```

### server文件夹 接口及请求
1. api  存放api
2. fetch 请求封装

### common 公用方法
1. authorize 用户信息
2. pay 支付方法封装
3. local 本地信息存储

### components 公用组件
1. authTips 禁用提示


### static 静态资源
1. css 样式
2. icon 图标
3. image 图片

### manifest.json  微信小程序特有相关 
```
"mp-weixin": { /* 微信小程序特有相关 */
		"appid": "",
		"setting": {
			"urlCheck": false
		},
		"usingComponents": true,
		"permission": {
			"scope.userLocation": {
			  "desc": "你的位置信息将用于小程序位置接口的效果展示" // 高速公路行驶持续后台定位
			}
		 }
	},
```