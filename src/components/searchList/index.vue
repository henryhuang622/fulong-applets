<template>
  <view class="search-list">
    <view class="search-list-row" v-for="(item, i) in data" :key="i">
      <view class="search-list-row-l" @click="goDetail(item)">
        <image mode="aspectFit" :src="item.image.imgUrl"></image>
      </view>
      <view class="search-list-row-r" @click="goDetail(item)">
        <view class="search-list-row-r-title" v-if="item.productNameZhCn">
          <text>{{ item.productNameZhCn }}</text>
        </view>
        <view class="search-list-row-r-en-title" v-if="item.productNameEn">
          <text>{{ item.productNameEn }}</text>
        </view>
        <view class="search-list-row-r-text" v-if="item.originNameZhCn">
          <text>产区：</text>
          <text>{{ item.originNameZhCn }}</text>
        </view>
         <view class="search-list-row-r-text" v-if="item.originNameZhCn">
          <text>年份：</text>
          <text>{{ item.years }}</text>
        </view>
        <view class="search-list-row-r-text" v-if="item.grapeVarietyNameZhCn">
          <text>葡萄品种：</text>
          <text>{{ item.grapeVarietyNameZhCn }}</text>
        </view>
      </view>
      <view v-if="checked" class="search-list-row-checked">
        <u-checkbox
          v-model="item.checked"
          active-color="#7b1736"
          @change="changeFun($event, i)"
        ></u-checkbox>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  props: ["data", "checked"],
  data() {
    return {
    };
  },
  methods: {
    goDetail(data) {
      if (this.$props.checked) {
        return false;
      }
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
    //
    changeFun(d, e) {
      console.log(d, e);
      this.$emit('change',e)
    },
  },
};
</script>

<style lang="scss">
.search-list-row {
  @include flex(flex-start, flex-start);
  padding: 14rpx 0;
  background: #fff;
  border-bottom: 1px solid #f5f5f5;
}
.search-list-row:last-child {
  border-bottom: 0;
}
.search-list-row-l {
  width: 96rpx;
  height: 196rpx;
  margin-right: 30rpx;
  image {
    width: 100%;
    height: 100%;
    display: block;
  }
}
.search-list-row-r {
  width: 560rpx;
  // padding-top: 10rpx;
}
.search-list-row-r-title {
  font-size: 30rpx;
  color: #333;
  font-weight: 500;
  @extend %omit-1-css;
}
.search-list-row-r-en-title {
  font-size: 26rpx;
  margin-bottom: 5rpx;
  @extend %omit-1-css;
}
.search-list-row-r-text {
  font-size: 24rpx;
  color: #888;
  font-weight: 400;
  margin-bottom: 10rpx;
  @extend %omit-1-css;
}
.search-list-row-r-text:last-child {
  margin-bottom: 0;
}
</style>