<template>
  <view class="about">
    <view class="about-logo">
      <image :src="info.logo.url"></image>
    </view>
    <view class="about-name">
      <text>{{ info.appName }}</text>
    </view>
    <view class="about-bottom">
      <view class="about-row">
        <view class="about-row-title">
          <text>公司名称:</text>
        </view>
        <view class="about-row-r">
          <text>{{ info.companyName }}</text>
        </view>
      </view>
      <view class="about-row">
        <view class="about-row-title">
          <text>联络电话:</text>
        </view>
        <view class="about-row-r">
          <text>{{ info.contact }}</text>
        </view>
      </view>
      <view class="about-row">
        <view class="about-row-title">
          <text>公司地址:</text>
        </view>
        <view class="about-row-r">
          <text>{{ info.companyAddress }}</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { aboutUs } from "@/server/api";
import fetch from "@/server/fetch";

export default {
  data() {
    return {
      info: {},
    };
  },
  onShow() {
    this.init();
  },
  methods: {
    init() {
      fetch(aboutUs, "get").then((res) => {
        const { data } = res.data;
        this.info = data;
      });
    },
  },
};
</script>

<style lang="scss">
.about {
  min-height: 100%;
  background: #fff;
  padding-top: 300rpx;
}
.about-logo {
  width: 200rpx;
  height: 200rpx;
  margin: 0 auto;
  image {
    width: 100%;
    height: 100%;
    display: block;
  }
}
.about-name {
  margin: 40rpx 0 0 0;
  text-align: center;
  font-weight: bold;
  font-size: 40rpx;
}
.about-bottom {
  font-size: 34rpx;
  font-weight: 500;
  color: #888;
  padding: 70rpx 30rpx;
}
.about-row {
  @include flex(flex-start, flex-start);
  margin-bottom: 30rpx;
}
.about-row-title {
  width: 150rpx;
  color: #000;
  display: inline-block;
  margin-right: 20rpx;
}
.about-row-r{
   width: 520rpx;
   line-height: 1.7;
}
</style>