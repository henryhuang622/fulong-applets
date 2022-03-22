

// 正式
const baser_pro = 'https://apic.aussino.net'
//测试
const baser_dev = 'https://devapic.aussinowine.net' //  

let baser_url = process.env.NODE_ENV === 'development' ? baser_pro : baser_pro

// 小程序登录
export const wxminilogin = `${baser_url}/cu-user/login-wxmini`

// 用户信息
export const bindUserInfo = `${baser_url}/cu-user/bind-user-info`

//绑定手机号码
export const bindUserPhone = `${baser_url}/cu-user/bind-phone`

//解绑个人信息
export const unbindUserInfo = `${baser_url}/cu-user/unbind-user-info`

//个人中心查询
export const userCenter  = `${baser_url}/cu-user/center`

//关于我们查询
export const aboutUs = `${baser_url}/sys-config/about-us`

//门店足迹分页
export const storeHistory = `${baser_url}/store-history`

//产品足迹
export const productSkuHistory = `${baser_url}/product-sku-history`

//新增/产品收藏分页
export const productSkuCollect = `${baser_url}/product-sku-collect`

//删除产品收藏
export const delectSkuCollect = `${baser_url}/product-sku-collect`

//新增/门店收藏
export const storeCollect = `${baser_url}/store-collect`

//删除门店收藏
export const deleteStoreCollect =  `${baser_url}/store-collect`

//分享列表
export const shareListApi = `${baser_url}/product-sku/share-list`


//热门推荐
export const popularList = `${baser_url}/product-sku/popular-list`

//产品搜索
export const productSearch = `${baser_url}/product-sku/search`

//产品详情
export const productSku = `${baser_url}/product-sku`

//产品详情(开放分享)
export const productSkuShare = `${baser_url}/product-sku/share`

//门店详情(开放分享)
export const storeShare = `${baser_url}/store/share`

//Banner列表
export const banner = `${baser_url}/banner`

//产品代理列表
export const productAgent = `${baser_url}/product-agent`

//产品分类列表
export const productBrand = `${baser_url}/product-brand`

//产品容量列表
export const productCapacity = `${baser_url}/product-capacity`

//葡萄品种列表
export const productGrape = `${baser_url}/product-grape-variety`

//产品产国列表
export const productOrigin = `${baser_url}/product-origin`

//产品口味列表
export const productTaste = `${baser_url}/product-taste`

//产品类型列表
export const productType = `${baser_url}/product-type`

//门店分类
export const storeCategory = `${baser_url}/store-category`

//门店列表
export const store = `${baser_url}/store`

//素材图片
export const productImg = `${baser_url}/product-img`

//视频分页
export const productVideo = `${baser_url}/product-video`


//省份列表
export const provinceList = `${baser_url}/province/list`

//城市列表
export const cityList = `${baser_url}/city/list`

//地区列表
export const areaList = `${baser_url}/area/list`


