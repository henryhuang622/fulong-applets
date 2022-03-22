<template>
  <view class="contain">
    <swiper
      :style="'height:' + height + 'px'"
      indicator-color="#fff"
      indicator-active-color="#7B1736"
      indicator-dots
    >
      <swiper-item v-for="(item, i) in bannerList" :key="i">
        <view
          class="swiper-item"
          v-if="item.mediaType == 'Img'"
          @click="goDetailFun(item)"
        >
          <image mode="scaleToFill" :src="item.mediaUrl"></image>
        </view>
        <view class="swiper-item-video" v-else>
          <video object-fit="fill" :src="item.mediaUrl"></video>
        </view>
      </swiper-item>
    </swiper>
    <!-- <view class="home-tabbar">
      <view class="home-tabbar-icon">
        <image src="../../static/icon/home/icon_hot.png"></image>
      </view>
      <view>
        <text>热门推荐</text>
      </view>
    </view>
    <red-list :data="hotList"></red-list>
    <u-loadmore status="nomore" v-if="nomoreShow" /> -->
  </view>
</template>

<script>
import redList from "../../components/redList/index.vue";
import { banner, popularList } from "@/server/api";
import fetch from "@/server/fetch";
export default {
  components: {
    redList,
  },
  data() {
    return {
      bannerList: "",
      hotList: [],
      page: 1,
      nomoreShow: false,
      size: 10,
      height: 0,
    };
  },
  onShareAppMessage(res) {
    uni.showShareMenu({
      menus: ["shareAppMessage", "shareTimeline"],
    });
  },
  onShareTimeline() {
    return {
    };
  },
  // 下拉刷新
  onPullDownRefresh() {
    console.log("下拉刷新");
    this.page = 1;
    this.hotList = [];
    this.nomoreShow = false;
    this.getHotListFun();
  },
  // 上拉加载数据
  onReachBottom() {
    console.log("上拉加载数据", this.nomoreShow, this.hotList.length > 0);
    if (!this.nomoreShow && this.hotList.length > 0) {
      this.page++;
      this.getHotListFun();
    }
  },
  onLoad(){
    this.height = uni.getSystemInfoSync().windowHeight;
  },
  onShow() {
    this.page = 1;
    this.hotList = [];
    this.getBannerFun();
    this.getHotListFun();
  },
  methods: {
    // 获取banner
    getBannerFun() {
      fetch(banner, "get").then((res) => {
        const { data } = res.data;
        this.bannerList = data;
      });
    },
    //热门推荐
    getHotListFun() {
      const params = {
        page: this.page,
        size: this.size,
      };

      fetch(popularList, "get", params).then((res) => {
        uni.stopPullDownRefresh();
        console.log("获取热门推荐", res.data);
        const { list } = res.data;
        if (list.length <= 0 && this.page > 1) {
          return (this.nomoreShow = true);
        } else {
          this.nomoreShow = false;
          list.map((it) => {
            this.hotList.push(it);
          });
        }
      });
    },
    //
    goDetailFun(data) {
      if (data.jumpType == "Internal") {
        uni.navigateTo({ url: `${data.url}` });
      } else if (data.jumpType == "External") {
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
            "/pages/link/index?link=" +
            encodeURIComponent(data.url) +
            "&title=" +
            encodeURIComponent(data.name),
        });
      }
    },
  },
};
</script>

<style lang="scss">
.contain {
  background: #fff;
  min-height: 100%;
}

.swiper-item {
  height: 100%;
  image {
    width: 100%;
    height: 100%;
  }
}
.swiper-item-video {
  height: 100%;
  video {
    width: 100%;
    height: 100%;
  }
}

.uni-bg-red {
  background: red;
}
.home-tabbar {
  @include flex(center, center);
  font-size: 36rpx;
  font-weight: bold;
  padding: 20rpx 0;
}
.home-tabbar-icon {
  width: 60rpx;
  height: 60rpx;
  image {
    width: 100%;
    height: 100%;
    display: block;
  }
}
</style>