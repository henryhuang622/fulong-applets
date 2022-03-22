<template>
  <view class="authorize">
    <view :class="authorizeShow ? 'authorize-head' : 'authorize-head-phone'">
      <image
        src="../../static/image/logo/img_logo.jpg"
      ></image>
      <view class="authorize-head-title" v-if="authorizeShow">
        <view class="main-title">富隆酒业</view>
        <!-- <view class="sub-title">乐享运动 健康生活</view> -->
      </view>
      <view class="authorize-head-title-copy" v-if="!authorizeShow">
        <view class="main-title">请绑定手机号</view>
        <view class="sub-title">以便我们为您提供更好的服务</view>
      </view>
    </view>

    <button
      v-if="authorizeShow"
      type="primary"
      class="authorize-btn"
      @click="getuserinfo"
    >
      用户授权使用
    </button>
    <button v-if="phoneBtn" class="authorize-btn-gray" @click="checkPhoneFun">
      一键绑定
    </button>
    <button
      v-if="chenckPhoneShow"
      type="primary"
      class="authorize-btn"
      open-type="getPhoneNumber"
      @getphonenumber="getphonenumber"
    >
      一键绑定
    </button>
    <view v-if="!authorizeShow" class="authorize-rule">
      <view style="padding: 10rpx" v-if="radioIsShow" @click="radioChange(1)">
        <img
          class="authorize-rule-radio"
          src="https://www.quntitong.cn/static/qtt_applets/icon/authorize/icon_agreement@2x.png"
          alt=""
        />
      </view>
      <view style="padding: 10rpx" v-else @click="radioChange(0)">
        <img
          class="authorize-rule-radio"
          src="https://www.quntitong.cn/static/qtt_applets/icon/authorize/icon_agreement_pre@2x.png"
          alt=""
        />
      </view>
      <view>
        <text>勾选即同意授权富隆酒业规则</text>
      </view>
    </view>
  </view>
</template>

<script>
import { wxminilogin, bindUserInfo, bindUserPhone } from "@/server/api";
import fetch from "@/server/fetch";
import { setUserInfo, setLgoinInfo } from "@/common/local";
import { loadingFun, hideLoadingFun } from "@/common/utils";
export default {
  onLoad() {
    const _this = this;
    uni.login({
      provider: "weixin",
      success: function (res) {
        _this.code = res.code;
        _this.loginFun()
      },
    });
  },
  data() {
    return {
      encryptedData: "",
      code: "",
      iv: "",
      phoneBtn: false,
      radioIsShow: true,
      chenckPhoneShow: false,
      authorizeShow: true,
    };
  },
  methods: {
    //获取个人信息
    getuserinfo(e) {
      console.log("获取个人信息");
      const _this = this;
      uni.getUserProfile({
        lang: "zh_CN",
        desc: "获取用户授权信息",
        success(res) {
          const { userInfo, encryptedData, iv, rawData, signature } = res;

          fetch(bindUserInfo, "put", {
            userInfo,
            encryptedData,
            iv,
            rawData,
            signature,
          }).then((res) => {
            console.log("获取用户授权信息", res);
            const { data } = res.data;
            setUserInfo(data);
          });
          _this.authorizeShow = false;
          _this.phoneBtn = true;
        },
        fail(err) {},
      });
    },
    // 当选 0: 未选择 1: 已选择
    radioChange(e) {
      if (e == 0) {
        this.radioIsShow = true;
        this.phoneBtn = true;
        this.chenckPhoneShow = false;
      } else {
        this.radioIsShow = false;
        this.phoneBtn = false;
        this.chenckPhoneShow = true;
      }
    },
    //检查协议
    checkPhoneFun() {
      if (this.radioIsShow) {
        return uni.showToast({
          icon: "none",
          title: "你需要同意《群体通用户协议》及《隐私政策》",
          duration: 2000,
        });
      }
    },
    // 获取手机号
    getphonenumber(e) {
      if (e.target.errMsg == "getPhoneNumber:ok") {
        const { encryptedData, iv } = e.target;
        fetch(bindUserPhone, "put", { encryptedData, iv }).then((res) => {
          const { data } = res.data;
          setUserInfo(data);
          uni.navigateBack();
        });
        this.phoneBtn = false;
      }
    },
    //登录
    loginFun() {
      loadingFun("登录中...");
      const params = {
        code: this.code,
      };
      fetch(wxminilogin, "post", params).then((res) => {
        hideLoadingFun();
        console.log(res, "登录res");
        const { data } = res.data;
        setLgoinInfo(data);
      });
    },
  },
};
</script>

<style lang="scss">
.authorize {
  padding: 132rpx 60rpx;
}
.authorize-head {
  font-size: 34rpx;
  text-align: center;
  margin-bottom: 220rpx;
  image {
    width: 148rpx;
    height: 148rpx;
    border-radius: 15rpx;
  }
}
.authorize-head-phone {
  @extend .authorize-head;
  margin-bottom: 154rpx;
}
.authorize-head-title {
  margin-top: 24rpx;
}
.authorize-head-title-copy {
  @extend .authorize-head-title;
  margin-top: 90rpx;
}
.authorize-btn-gray {
  background: #eee;
  &::after {
    border: none !important;
  }
}
.authorize-rule {
  font-size: 28rpx;
  margin-top: 20rpx;
  @include flex(flex-start, center);
}
.rule-text {
  color: #01b8fc;
}
.authorize-rule-radio {
  width: 28rpx;
  height: 28rpx;
  margin-right: 20rpx;
  vertical-align: middle;
}
.main-title {
  color: #333;
  font-size: 38rpx;
  font-weight: 500;
  margin-bottom: 16rpx;
}
.sub-title {
  color: #666;
  font-size: 32rpx;
}
</style>