<template>
  <view class="personal">
    <view class="personal-head" @click="loginFun">
      <u-avatar
        mode="square"
        class="personal-head-img"
        v-if="loginType == 'UNBOUND'"
      ></u-avatar>
      <view class="personal-head-img" v-else>
        <image :src="userInfo.avatarUrl"></image>
      </view>
      <view v-if="loginType == 'UNBOUND'">
        <text>登录/注册</text>
      </view>
      <view v-else>
        <text>{{ userInfo.nickname }}</text>
      </view>
    </view>
    <view class="personal-cell">
      <view class="personal-cell-row" @click="goPageFun(2)">
        <view class="personal-cell-l">
          <image src="../../static/icon/person/icon_type.png"></image>
        </view>
        <view>
          <text>酒款收藏</text>
        </view>
      </view>
      <view class="personal-cell-row" @click="goPageFun(1)">
        <view class="personal-cell-l">
          <image src="../../static/icon/home/icon_collect_active.png"></image>
        </view>
        <view>
          <text>门店收藏</text>
        </view>
      </view>
      <view class="personal-cell-row" @click="goPageFun(0)">
        <view class="personal-cell-l">
          <image src="../../static/icon/person/icon_hs.png"></image>
        </view>
        <view>
          <text>历史足迹</text>
        </view>
      </view>
    </view>
    <view class="personal-cell">
      <view class="personal-cell-row">
        <view class="personal-cell-l">
          <image src="../../static/icon/person/iocn_kefu.png"></image>
        </view>
        <view>
          <text>联系我们</text>
        </view>
        <button open-type="contact"></button>
      </view>
      <view class="personal-cell-row" @click="goPageFun(3)">
        <view class="personal-cell-l">
          <image src="../../static/icon/person/icon_about.png"></image>
        </view>
        <view>
          <text>关于我们</text>
        </view>
      </view>
    </view>
    <!-- 退出登录 -->
    <view
      class="personal-bottom"
      @click="unbindFun"
      v-if="loginType == 'BOUND'"
    >
      <button>退出登录</button>
    </view>
  </view>
</template>

<script>
import { userCenter, unbindUserInfo } from "@/server/api";
import fetch from "@/server/fetch";
import { setUserInfo, getUserInfo, removeUserInfo } from "@/common/local";
export default {
  data() {
    return {
      loginType: getUserInfo().wxminiBound,
      userInfo: "",
    };
  },
  onShow() {
    this.getInfoFun();
  },
  methods: {
    //获取个人信息
    getInfoFun() {
      fetch(userCenter, "get").then((res) => {
        console.log("获取个人信息", res);
        const { data } = res.data;
        this.loginType = data.wxminiBound;
        this.userInfo = data;
      });
    },
    //触发登录
    loginFun() {
      if (this.loginType == "BOUND") {
        return false;
      }
      uni.navigateTo({ url: "/pages/authorize/index" });
    },
    // 退出登录
    unbindFun() {
      fetch(unbindUserInfo, "put").then((res) => {
        console.log("退出登录");
        removeUserInfo();
        this.getInfoFun();
      });
    },
    //0:历史足迹 1:门店收藏 2:酒款收藏 3: 关于我们
    goPageFun(i) {
      if (this.loginType != "BOUND") {
        return uni.navigateTo({ url: "/pages/authorize/index" });
      }
      if (i == 0) {
        uni.navigateTo({ url: "/pages/footprint/index" });
      } else if (i == 1) {
        uni.navigateTo({ url: "/pages/collect/index" });
      } else if (i == 2) {
        uni.navigateTo({ url: "/pages/wineCollection/index" });
      } else if (i == 3) {
        uni.navigateTo({ url: "/pages/about/index" });
      }
    },
  },
};
</script>

<style lang="scss">
.personal-head {
  @include flex(flex-start, center);
  padding: 30rpx;
  font-size: 36rpx;
  color: #000;
  font-weight: 500;
  background: #fff;
}
.personal-head-img {
  width: 90rpx;
  height: 90rpx;
  border-radius: 15rpx;
  overflow: hidden;
  margin-right: 20rpx;
  image {
    width: 100%;
    height: 100%;
    display: block;
  }
}
.personal-cell {
  margin-top: 30rpx;
  background: #fff;
  .personal-cell-row:last-child {
    border-bottom: none;
  }
}
.personal-cell-row {
  @include flex(flex-start, center);
  padding: 20rpx;
  border-bottom: 1px solid rgb(218, 216, 216);
  position: relative;
  button {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: transparent;
    outline: none;
  }
  button::after {
    border: 0;
    outline: none;
  }
}
.personal-cell-l {
  width: 60rpx;
  height: 60rpx;
  margin-right: 20rpx;
  image {
    width: 100%;
    height: 100%;
    display: block;
  }
}
.personal-bottom {
  margin-top: 80rpx;
  padding: 0 100rpx;
  button {
    background: #7b1736;
    color: #fff;
    font-weight: 500;
  }
}
</style>