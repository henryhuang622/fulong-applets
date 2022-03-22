<template>
  <view class="auth-tips">
    <view class="auth-tips-contain">
      <view class="auth-tips-contain-title">
        <text>温馨提示</text>
      </view>
      <view class="auth-tips-contain-text">
        <text>{{content}}</text>
      </view>
      <view class="auth-tips-contain-btn">
        <view class="auth-tips-contain-btn-l" @click="cancel">
          <button>取消</button>
        </view>
        <view class="auth-tips-contain-btn-r">
          <button open-type="openSetting">设置</button>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    content:{
      default: '',
      typeof: String
    }
  },
  methods: {
    cancel() {
      this.$emit("cancel");
    },
  },
};
</script>

<style lang="scss" scoped>
.auth-tips {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
  padding: 412rpx 80rpx 0 80rpx;
  z-index: 999;
}
.auth-tips-contain {
  background-color: #ffffff;
  text-align: center;
  padding-top: 30rpx;
  border-radius: 30rpx;
  overflow: hidden;
}
.auth-tips-contain-text {
  padding: 50rpx 30rpx;
}
.auth-tips-contain-btn {
  @include flex(space-between, center);
  border-top: 1px solid #d2d2d2;
}
.auth-tips-contain-btn-r {
  border-left: 1px solid #d2d2d2;
  button {
    color: #01b8fc;
  }
}
.auth-tips-contain-btn-r,
.auth-tips-contain-btn-l {
  flex: 1;
}
</style>