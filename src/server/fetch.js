import { getLgoinInfo } from '@/common/local'
import { loginFun } from "@/common/authorize";
import { hideLoadingFun } from '@/common/index'

//登录成功后操作
function auLoginFun() {
	let page = getCurrentPages();
	console.log('登录成功后操作1',page)
	loginFun(() => {
		console.log('登录成功后操作2', `${(page[page.length - 1]).$page.fullPath}`)
		if ((page[page.length - 1]).route == 'pages/home/index' || (page[page.length - 1]).route == 'pages/store/index' || (page[page.length - 1]).route == 'pages/personal/index') {
			uni.reLaunch({
				url: `${(page[page.length - 1]).$page.fullPath}`
			});
		}else{
			console.log('登录成功后操作3', (page[page.length - 1]).options.q,`${(page[page.length - 1]).route}?q=${(page[page.length - 1]).options.q}`)
			if((page[page.length - 1]).options.q){
				uni.redirectTo({
					url: `/${(page[page.length - 1]).route}?q=${(page[page.length - 1]).options.q}`
				});
			}else{
				uni.redirectTo({
					url: `${(page[page.length - 1]).$page.fullPath}`
				});
			}
		}
	})
}

// 请求
export default function fetch(url, method, data,) {
	return new Promise((resolve, reject) => {
		uni.request({
			url: url,
			method: method,
			data: data,
			timeout: 6000,
			header: {
				Authorization: getLgoinInfo() ? getLgoinInfo().auth : ''
			},
			success: (res) => {
				hideLoadingFun()
				console.log('请求', res)
				if (res.statusCode == 200) {
					resolve(res)
				} else if (res.statusCode == 401) {
					auLoginFun()
				} else {
					reject(res)
					return uni.showToast({
						title: res.data.msg,
						icon: 'none'
					})
				}

			},
			fail: (err) => {
				hideLoadingFun()
				console.log(err)
				return uni.showToast({
					icon: "none",
					title: '网络超时！请检查网络',
					duration: 3000
				})
			}
		})
	})
}

// formdata 请求
export function fetchFromData(url, method, data){
	return uni.request({
	  url: url,
	  data: data,
	  method: method,
	  header:{
		 "Content-Type": "application/x-www-form-urlencoded"
	  }
	})
 }