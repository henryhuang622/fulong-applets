<template>
  <view class="material-show">
    <!-- 图片 -->
    <view class="material-show-img" v-if="type == 0">
      <image mode="aspectFit" :src="url"></image>
    </view>
    <!-- 视频 -->
    <view class="material-show-img" v-if="type == 1">
      <txv-video height="100%" :vid="url" playerid="txv1"></txv-video>
    </view>
  </view>
</template>

<script>
export default {
  onLoad(option) {
    console.log(option);
    this.type = option.type;
    this.url = decodeURIComponent(option.url);
    console.log(decodeURIComponent(option.url));
  },
  data() {
    return {
      type: 0,
      url: "",
    };
  },
};
</script>

<style lang="scss">
.material-show {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba($color: #000000, $alpha: 0.3);
  @include flex(center, center);
}
.material-show-img {
  width: 100%;
  height: 760rpx;
  image {
    width: 100%;
    height: 100%;
    display: block;
  }
}
</style>