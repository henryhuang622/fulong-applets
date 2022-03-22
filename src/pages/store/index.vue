<template>
  <view class="contain">
    <view class="sort-head">
      <u-dropdown
        border-bottom
        active-color="#7B1736"
        @close="closeFun"
        ref="sortTab"
      >
        <u-dropdown-item
          @change="changeType"
          v-model="typeVal"
          :title="typeTitle"
          :options="typeList"
        >
        </u-dropdown-item>
        <u-dropdown-item v-model="ardd" :title="provinceName">
          <view class="slot-content">
            <view class="dropdown-add">
              <scroll-view scroll-y="true" style="height: 400rpx">
                <view class="dropdown-add-item" @click="allFun">
                  <text :class="activeIndex == 0 ? 'active' : ''">全部</text>
                </view>
                <view
                  class="dropdown-add-item"
                  v-for="(item, i) in provinceList"
                  :key="i"
                  @click="provinceFun(item)"
                >
                  <text
                    :class="provinceCode == item.provinceCode ? 'active' : ''"
                    >{{ item.name }}</text
                  >
                </view>
              </scroll-view>
              <scroll-view
                scroll-y="true"
                style="
                  height: 400rpx;
                  background: #ccc;
                  border-right: 1px solid #333;
                "
              >
                <view
                  class="dropdown-add-item-child"
                  v-for="(item, i) in cityList"
                  :key="i"
                  @click="cityFun(item)"
                >
                  <text :class="cityCode == item.cityCode ? 'active' : ''">{{
                    item.name
                  }}</text>
                </view>
              </scroll-view>
              <scroll-view
                scroll-y="true"
                style="height: 400rpx; background: #ccc"
              >
                <view
                  class="dropdown-add-item-child"
                  v-for="(item, i) in areaList"
                  :key="i"
                  @click="areaFun(item)"
                >
                  <text :class="areaCode == item.areaCode ? 'active' : ''">{{
                    item.name
                  }}</text>
                </view>
              </scroll-view>
            </view>
            <view class="dropdown-query">
              <button size="mini" @click="queryCloseFun">确认</button>
            </view>
          </view>
        </u-dropdown-item>
      </u-dropdown>
    </view>
    <view class="sort-contain">
      <!--  <view class="sort-contain-title">
        <image src="../../static/icon/home/icon_collect_active.png"></image>
        <view>我的收藏</view>
      </view>
      <scroll-view scroll-x="true" lower-threshold="20" class="sort-scroll">
        <mini-storelist :data="collectList"></mini-storelist>
      </scroll-view>
       <view class="sort-contain-title">
        <image src="../../static/icon/home/icon_fj.png"></image>
        <view>附近门店</view>
      </view> -->
      <store-list :data="list"></store-list>
    </view>
    <!-- 提示定位授权 -->
    <auth-tips
      content="手机定位未打开，请点击设置打开"
      @cancel="cancel"
      v-if="authShow"
    ></auth-tips>
    <u-loadmore status="nomore" v-if="nomoreShow" />
    <u-back-top :scroll-top="scrollTop"></u-back-top>
  </view>
</template>

<script>
import storeList from "@/components/storeList/index";
import { getLocationFun } from "@/common/index";
import authTips from "@/components/authTips/index";
import {
  store,
  storeCategory,
  provinceList,
  cityList,
  areaList,
} from "@/server/api";
import fetch from "@/server/fetch";
export default {
  components: { storeList, authTips },
  data() {
    return {
      collectList: [
        {
          url: "../../static/image/example/example-7.png",
          name: "珠江新城门店",
          ardd: "广东省广州市天河区珠江新城地铁站B出口沿街直行200米",
          tag: "酒窖",
        },
        {
          url: "../../static/image/example/example-7.png",
          name: "珠江新城门店",
          ardd: "广东省广州市天河区珠江新城地铁站B出口沿街直行200米",
          tag: "酒窖",
        },
        {
          url: "../../static/image/example/example-7.png",
          name: "珠江新城门店",
          ardd: "广东省广州市天河区珠江新城地铁站B出口沿街直行200米",
          tag: "酒窖",
        },
      ],
      typeVal: "",
      typeTitle: "全部分类",
      typeList: [],
      ardd: "",
      list: [],
      nomoreShow: false,
      page: 1,
      size: 10,
      provinceCode: "",
      provinceList: [],
      cityCode: "",
      cityList: [],
      areaList: [],
      areaCode: "",
      activeIndex: 0,
      provinceName: "地区",
      long: "",
      lat: "",
      scrollTop: 0,
      authShow: false,
    };
  },
  onShareAppMessage(res) {
    uni.showShareMenu({
      menus: ["shareAppMessage", "shareTimeline"],
    });
  },
  onPageScroll(e) {
    this.scrollTop = e.scrollTop;
  },
  // 下拉刷新
  onPullDownRefresh() {
    console.log("下拉刷新");
    this.page = 1;
    this.list = [];
    this.nomoreShow = false;
    this.init();
  },
  // 上拉加载数据
  onReachBottom() {
    console.log("上拉加载数据", this.nomoreShow, this.page);
    if (!this.nomoreShow && this.list.length > 0) {
      this.page++;
      this.init();
    }
  },
  onShow() {
    this.list = [];
    this.page = 1;
    this.getSettingFun();
    this.getStoreCategory();
    this.getProvinceList();
  },
  methods: {
    init() {
      const params = {
        page: this.page,
        size: this.size,
        lat: this.lat,
        lon: this.long,
      };
      if (this.areaCode) {
        params.areaCode = this.areaCode;
      }
      if (this.typeVal) {
        params.categoryId = this.typeVal;
      }
      if (this.cityCode) {
        params.cityCode = this.cityCode;
      }
      if (this.provinceCode) {
        params.provinceCode = this.provinceCode;
      }
      fetch(store, "get", params).then((res) => {
        uni.stopPullDownRefresh();
        console.log(res);
        const { list } = res.data;
        if (list.length <= 0 && this.page > 1) {
          return (this.nomoreShow = true);
        } else {
          this.nomoreShow = false;
          list.map((it) => {
            this.list.push(it);
          });
        }
      });
    },
    //筛选条件
    closeFun() {
      this.list = [];
      this.page = 1;
      this.init();
    },
    //
    queryCloseFun() {
      this.$refs.sortTab.close();
    },
    //获取门店分类
    getStoreCategory() {
      this.typeList = [{ label: "全部分类", value: "" }];
      fetch(storeCategory, "get").then((res) => {
        console.log("获取门店分类", res);
        const { data } = res.data;
        data.map((it) => {
          this.typeList.push({ label: it.name, value: it.id });
        });
      });
    },
    //
    changeType(e) {
      console.log(e);
      this.typeList.map((it) => {
        if (it.value == e) {
          this.typeTitle = it.label;
        }
      });
    },
    //获取定位
    getSettingFun() {
      const _this = this;
      uni.getSetting({
        success(res) {
          uni.authorize({
            scope: "scope.userLocation",
            success() {
              getLocationFun()
                .then((res) => {
                  _this.authShow = false;
                  _this.long = res.longitude;
                  _this.lat = res.latitude;
                  uni.setStorageSync("locationObj", {
                    longitude: _this.long,
                    latitude: _this.lat,
                  });
                  _this.init();
                })
                .catch((err) => {
                  _this.long = uni.getStorageSync("locationObj").longitude
                    ? uni.getStorageSync("locationObj").longitude
                    : null;
                  _this.lat = uni.getStorageSync("locationObj").latitude
                    ? uni.getStorageSync("locationObj").latitude
                    : null;
                  _this.init();
                });
            },
            fail(){
              _this.authShow =true
            }
          });
        },
      });
    },
    //查全部
    allFun() {
      this.activeIndex = 0;
      this.provinceName = "全部";
      this.provinceCode = "";
      this.cityCode = "";
      this.cityList = [];
      this.areaList = [];
      this.areaCode = "";
    },
    //省
    provinceFun(data) {
      this.activeIndex = 1;
      this.provinceCode = data.provinceCode;
      this.provinceName = data.name;
      this.cityList = [];
      this.areaList = [];
      this.cityCode = "";
      this.areaCode = "";
      this.getCityList();
    },
    //市
    cityFun(data) {
      this.cityCode = data.cityCode;
      this.areaList = [];
      this.areaCode = "";
      this.getAreaList();
    },
    //区
    areaFun(data) {
      this.areaCode = data.areaCode;
    },
    //获取省
    getProvinceList() {
      fetch(provinceList, "get").then((res) => {
        console.log("获取省份", res);
        const { data } = res.data;
        this.provinceList = data;
      });
    },
    //获取市
    getCityList() {
      const params = {
        provinceCode: this.provinceCode,
      };
      fetch(cityList, "get", params).then((res) => {
        console.log("获取城市", res);
        const { data } = res.data;
        this.cityList = data;
      });
    },
    //获取地区
    getAreaList() {
      const params = {
        cityCode: this.cityCode,
      };
      fetch(areaList, "get", params).then((res) => {
        console.log("获取区域", res);
        const { data } = res.data;
        this.areaList = data;
      });
    },
  },
};
</script>

<style lang="scss">
.contain {
  min-height: 100%;
  background: #fff;
  .u-dropdown__menu__item__text {
    width: 150rpx;
    display: inline-block;
    @extend %omit-1-css;
  }
}
.sort-head {
  .u-dropdown {
    background: #fff;
  }
  .u-dropdown__menu__item {
    border-right: 1px solid #e7e7e7;
  }
  position: sticky;
  top: 0;
  z-index: 100;
}
.sort-scroll {
  white-space: nowrap;
}
.scroll-view-item {
  display: inline-block;
}
.sort-contain {
  padding: 20rpx 28rpx;
}
.sort-contain-title {
  font-size: 32rpx;
  color: #333;
  font-weight: 400;
  @include flex(flex-start, center);
  padding: 20rpx 0;
  image {
    width: 50rpx;
    height: 48rpx;
    display: block;
    margin-right: 20rpx;
  }
}
.dropdown-btn {
  width: 250rpx;
  height: 60rpx;
  button {
    width: 100%;
    height: 100% !important;
    font-size: 28rpx;
    // color: ;
  }
}
.dropdown-add {
  @include flex(flex-start, center);
  background: #fff;
}
.dropdown-add-item {
  padding: 20rpx;
  border-bottom: 1px solid #ccc;
}
.dropdown-add-item-child {
  padding: 20rpx;
  background: #ccc;
}
.r-b {
  border-right: 1px solid #ccc;
}
.active {
  color: #7b1736;
}
.dropdown-query {
  padding: 20rpx;
  background: #fff;
  button {
    background: #7b1736;
    color: #fff;
    font-weight: 500;
  }
}
</style>