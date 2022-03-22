<template>
  <view class="store-list">
    <view
      class="store-row"
      v-for="(item, i) in data"
      :key="i"
      @click="goStoreDetail(item)"
    >
      <image :src="item.image.url"></image>
      <view class="store-item">
        <view class="store-item-title">
          <text>{{ item.name }}</text>
        </view>
        <view class="store-item-text">
          <text> {{ item.address }}</text>
        </view>
      </view>
      <view class="store-tabs">
        <text>{{ item.categoryName }}</text>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  props: ["data"],
  methods: {
    goStoreDetail(data) {
      let code;
      console.log("emailVal", data);
      if (data.code) {
        code = data.code;
      } else if (data.storeCode) {
        code = data.storeCode;
      }
      uni.navigateTo({
        url: `/pages/storeDetail/index?code=${code}`,
      });
    },
  },
};
</script>

<style lang="scss">
.store-list {
  .store-row:nth-child(1) {
    margin-top: 0;
  }
}
.store-row {
  height: 355rpx;
  position: relative;
  border-radius: 30rpx;
  overflow: hidden;
  margin-top: 20rpx;
  image {
    width: 100%;
    height: 100%;
  }
}
.store-item {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba($color: #000000, $alpha: 0.5);
  font-size: 28rpx;

  padding: 20rpx;
}
.store-item-title {
  font-size: 30rpx;
  font-weight: 500;
  color: #fff;
  margin-bottom: 10rpx;
}
.store-item-text {
  font-size: 28rpx;
  color: #d7d7d7;
  font-weight: 400;
  @extend %omit-1-css;
}
.store-tabs {
  font-size: 26rpx;
  color: #fff;
  background: #7b1736;
  position: absolute;
  top: 0;
  right: 40rpx;
  width: 40rpx;
  padding: 15rpx 0;
  text-align: center;
  border-bottom-left-radius: 20rpx;
  border-bottom-right-radius: 20rpx;
}
</style>