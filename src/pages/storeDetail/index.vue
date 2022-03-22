<template>
  <view class="store-detail">
    <swiper
      indicator-color="#fff"
      indicator-active-color="rgba(184, 116, 26, 1)"
      indicator-dots
      autoplay
      class="store-detail-swiper"
    >
      <swiper-item>
        <view
          class="store-detail-item"
          v-for="(item, i) in info.images"
          :key="i"
        >
          <image :src="item.url"></image>
          <view class="store-detail-item-row">
            <view class="store-detail-item-l">
              <image src="" alt="商标"></image>
            </view>
          </view>
        </view>
      </swiper-item>
    </swiper>
    <view class="store-detail-contain">
      <view class="store-detail-cell">
        <view class="store-detail-l omit-1-css store-name">
          <text>{{ info.name }}</text>
        </view>
        <view class="store-detail-share">
          <image src="../../static/icon/home/icon_share.png"></image>
          <button open-type="share"></button>
        </view>
        <view class="store-detail-r" @click="collectFun">
          <u-icon
            name="heart"
            v-if="!info.collect"
            color="#7b1736"
            size="50"
          ></u-icon>
          <u-icon name="heart-fill" v-else color="#7b1736" size="50"></u-icon>
        </view>
      </view>
      <u-line color="#7f7f7f" />
      <view class="store-detail-cell" @click="goNavigationFun">
        <view class="store-detail-l">
          <text>{{ info.address }}</text>
        </view>
        <view class="store-detail-r">
          <image
            src="../../static/icon/home/icon_navigation.png"
            class="store-detail-r-img"
          ></image>
        </view>
      </view>
      <u-line color="#7f7f7f" />
      <view class="store-detail-des">
        <view class="store-detail-des-row" v-if="info.serviceArea">
          <text>服务范围：{{ info.serviceArea }}</text>
        </view>
        <view class="store-detail-des-row" v-if="info.contact">
          <text>联络电话：{{ info.contact }}</text>
        </view>
      </view>
    </view>
    <view class="store-detail-fotter">
      <button @click="callPhoneFun(info.contact)" type="primary">
        一键拨通
      </button>
    </view>
    <!-- 客服 -->
    <drag-button :isDock="true" :existTabBar="true"></drag-button>
    <u-back-top :scroll-top="scrollTop" top="10"></u-back-top>
  </view>
</template>

<script>
import {
  store,
  storeCollect,
  deleteStoreCollect,
  storeShare,
} from "@/server/api";
import fetch from "@/server/fetch";
import { checkLoginFun } from "@/common/check";
import dragButton from "@/components/drag-button/drag-button.vue";

export default {
  components: {
    dragButton,
  },
  onLoad(option) {
    this.code = option.code;
    if (option.type == "share") {
      this.storeShare();
    } else {
      this.init();
    }
  },
  data() {
    return {
      isCollect: false,
      code: "",
      info: {},
      scrollTop: 0,
    };
  },
  onShareAppMessage(res) {
    uni.showShareMenu({
      menus: ["shareAppMessage", "shareTimeline"],
    });
  },
  onShareTimeline() {
    console.log("onShareTimeline", this.code);
    return {
      query: `code=${this.code}&type=share`,
    };
  },
  onPageScroll(e) {
    this.scrollTop = e.scrollTop;
  },
  methods: {
    // 获取门店详情
    init() {
      fetch(`${store}/${this.code}`, "get").then((res) => {
        console.log("获取门店详情", res);
        const { data } = res.data;
        this.info = data;
        uni.setNavigationBarTitle({
          title: data.name,
        });
      });
    },
    //获取门店分享后的详情
    storeShare() {
      fetch(`${storeShare}/${this.code}`, "get").then((res) => {
        console.log("获取门店详情", res);
        const { data } = res.data;
        this.info = data;
        uni.setNavigationBarTitle({
          title: data.name,
        });
      });
    },
    //触发收藏
    collectFun() {
      if (this.info.collect) {
        this.delectCollectApi();
      } else {
        this.collectApi();
      }
    },
    //检查是否登录
    checkCollectFun() {
      checkLoginFun(this.collectFun());
    },
    // 收藏
    collectApi() {
      const params = {
        storeCode: this.code,
      };
      fetch(storeCollect, "post", params).then((res) => {
        uni.showToast({
          title: "成功收藏！",
          icon: "none",
        });
        this.info.collect = true;
      });
    },
    //取消收藏
    delectCollectApi() {
      fetch(`${deleteStoreCollect}?storeCode=${this.code}`, "delete").then(
        (res) => {
          uni.showToast({
            title: "取消收藏！",
            icon: "none",
          });
          this.info.collect = false;
        }
      );
    },
    //导航
    goNavigationFun() {
      console.log("导航");
      uni.openLocation({
        latitude: this.info.lat,
        longitude: this.info.lon,
        name: this.info.name,
        success: function () {},
      });
    },
    //
    callPhoneFun(phone) {
      uni.makePhoneCall({
        phoneNumber: phone, //仅为示例
      });
    },
  },
};
</script>

<style lang="scss">
.store-detail {
  min-height: 100%;
  background: #fff;
}
.store-detail-swiper {
  height: 420rpx;
}
.store-detail-item {
  position: relative;
  height: 100%;
  image {
    width: 100%;
    height: 100%;
  }
}
.omit-1-css {
  @extend %omit-1-css;
}
.store-name {
  font-size: 32rpx;
}
.store-detail-item-row {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  @include flex(space-between, center);
  padding: 20rpx;
}
.store-detail-item-l {
  width: 50rpx;
  height: 50rpx;
  image {
    width: 100%;
    height: 100%;
    display: block;
  }
}
.store-detail-share {
  width: 55rpx;
  height: 53rpx;
  position: relative;
  image {
    width: 100%;
    height: 100%;
    display: block;
  }
  button {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: transparent;
    border: 0;
    border-radius: 0;
  }
  button::after {
    border: 0;
    border-radius: 0;
  }
}
.store-detail-contain {
  padding: 20rpx;
}
.store-detail-cell {
  @include flex(flex-start, center);
  font-size: 26rpx;
  color: #333;
  font-weight: 500;
  padding: 20rpx 0;
}
.store-detail-l {
  width: 530rpx;
}
.store-detail-r {
  padding-left: 50rpx;
}
.store-detail-r-img {
  width: 50rpx;
  height: 48rpx;
  display: block;
}
.store-detail-des {
  padding-top: 20rpx;
}
.store-detail-des-row {
  margin-bottom: 20rpx;
}
.store-detail-fotter {
  position: fixed;
  bottom: 0;
  right: 0;
  left: 0;
  @extend %safe-area-inset-padding-bottom;
}
</style>