<template>
  <view>
    <view
      class="red-list"
      @click="goDetail(item)"
      v-for="(item, i) in data"
      :key="i"
    >
      <view class="red-list-head">
        <view class="red-list-head-img">
          <image mode="aspectFit" :src="item.image.imgUrl"></image>
        </view>
        <view class="red-list-head-des">
          <view class="m-10 omit-1-css" v-if="item.originNameZhCn">
            <text>产区：{{ item.originNameZhCn }}</text>
          </view>
          <view class="omit-1-css" v-if="item.grapeVarietyNameZhCn">
            <text>葡萄品种：{{ item.grapeVarietyNameZhCn }}</text>
          </view>
        </view>
      </view>
      <view class="red-list-name">
        <view class="red-list-name-title omit-1-css" v-if="item.productNameZhCn">
          <text>{{ item.productNameZhCn }}</text>
        </view>
        <view class="red-list-name-en-title omit-1-css" v-if="item.productNameEn">
          <text>{{ item.productNameEn }}</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  props: ["data"],
  methods: {
    goDetail(data) {
      console.log(data);
      let code;
      if (data.productSkuCode) {
        code = data.productSkuCode;
      } else if (data.code) {
        code = data.code;
      }
      uni.navigateTo({
        url: `/pages/comDetail/index?code=${code}`,
      });
    },
  },
};
</script>

<style lang="scss">
.m-10 {
  margin-bottom: 10rpx;
}
.red-list {
  margin-bottom: 20rpx;
}
.red-list-head {
  width: 100%;
  height: 450rpx;
  position: relative;
}
.red-list-head-img {
  width: 100%;
  height: 100%;
  image {
    width: 100%;
    height: 100%;
    display: block;
  }
}
.omit-1-css{
  @extend %omit-1-css;
}
.red-list-head-des {
  
  position: absolute;
  bottom: 0;
  right: 0;
  left: 0;
  background: rgba($color: #000000, $alpha: 0.5);
  font-size: 28rpx;
  color: #fff;
  font-weight: 500;
  padding: 16rpx 26rpx;
}
.red-list-name {
  padding: 16rpx 26rpx;
  color: #000;
  font-size: 36rpx;
}
// .red-list-name-title {
//   font-size: 30rpx;
//   font-weight: 500;
// }
// .red-list-name-en-title {
//   font-size: 26rpx;
//   font-weight: 400;
// }
</style>