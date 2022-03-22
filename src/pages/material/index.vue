<template>
  <view class="material">
    <u-sticky>
      <view class="material-tabs">
        <view
          :class="tabIndex == 0 ? 'material-tabs-l active' : 'material-tabs-l'"
          @click="change(0)"
        >
          <text> 图片</text>
        </view>
        <view
          :class="tabIndex == 1 ? 'material-tabs-r active' : 'material-tabs-r'"
          @click="change(1)"
        >
          <text> 视频</text>
        </view>
      </view>
    </u-sticky>
    <!-- 图片 -->
    <view class="material-img-box" v-if="tabIndex == 0">
      <u-row style="width: 100%">
        <u-col span="4" v-for="(item, i) in listImg" :key="i">
          <view class="material-item-img">
            <image
              mode="aspectFit"
              :src="item.imgUrl"
              @click="goBigPageFun(0, item.imgUrl)"
            ></image>
            <view class="material-item-check" v-if="selectShow">
              <u-checkbox v-model="item.checked"></u-checkbox>
            </view>
          </view>
        </u-col>
      </u-row>
    </view>
    <!-- 视频 -->
    <view class="material-video-box" v-if="tabIndex == 1">
      <u-row style="width: 100%">
        <u-col span="4" v-for="(item, i) in listVideo" :key="i">
          <view class="material-item-img">
            <video :src="item.url"></video>
            <view class="material-item-check" v-if="selectShow">
              <u-checkbox v-model="item.checked"></u-checkbox>
            </view>
          </view>
        </u-col>
      </u-row>
    </view>
    <!-- 操作 -->
    <view class="material-setting" @click="settingFun" v-if="!selectShow">
      <u-icon name="grid-fill" size="60" color="#7b1736"></u-icon>
    </view>
    <!-- 底部操作 -->
    <view class="material-fotter-meun" v-if="selectShow">
      <view @click="allSelectFun">
        <text v-if="allShow">全选</text>
        <text v-else>取消全选</text>
      </view>
      <view @click="downCallFun">
        <u-icon name="download" size="60" color="#fff"></u-icon>
      </view>
      <view @click="closeFun">
        <text>完成</text>
      </view>
    </view>
    <!-- 提示定位授权 -->
    <auth-tips
      content="保存手机相册权限未打开，请点击设置打开"
      @cancel="cancel"
      v-if="authShow"
    ></auth-tips>
    <u-loadmore status="nomore" v-if="nomoreShow" />
  </view>
</template>

<script>
import { productImg, productVideo } from "@/server/api";
import fetch from "@/server/fetch";
import authTips from "@/components/authTips/index";

export default {
  components: { authTips },
  data() {
    return {
      code: "",
      tabIndex: 0,
      selectShow: false,
      listImg: [],
      listVideo: [],
      page: 1,
      size: 8,
      nomoreShow: false,
      allShow: true,
      authShow: false,
    };
  },
  // 下拉刷新
  onPullDownRefresh() {
    console.log("下拉刷新");
    this.page = 1;
    this.nomoreShow = false;
    if (this.tabIndex == 0) {
      this.listImg = [];
      this.getImgListFun();
    } else {
      this.listVideo = [];
      this.getVideoListFun();
    }
  },
  // 上拉加载数据
  onReachBottom() {
    if (this.tabIndex == 0) {
      if (!this.nomoreShow && this.listImg.length > 0) {
        this.page++;
        this.getImgListFun();
      }
    } else {
      if (!this.nomoreShow && this.listVideo.length > 0) {
        this.page++;
        this.getVideoListFun();
      }
    }
  },
  onLoad(option) {
    this.code = option.code;
  },
  onShow() {
    this.page = 1;
    this.listImg = [];
    this.listVideo = [];
    this.authShow = false;
    this.getImgListFun();
  },
  methods: {
    // 获取子产品图片
    getImgListFun() {
      const params = {
        page: this.page,
        size: this.size,
        productSkuCode: this.code,
      };
      fetch(productImg, "get", params).then((res) => {
        console.log(res);
        const { list } = res.data;
        if (list.length <= 0 && this.page > 1) {
          return (this.nomoreShow = true);
        } else {
          this.nomoreShow = false;
          list.map((it) => {
            it.checked = false;
            this.listImg.push(it);
          });
        }
      });
    },
    //获取视频列表
    getVideoListFun() {
      const params = {
        page: this.page,
        size: this.size,
        productSkuCode: this.code,
      };
      fetch(productVideo, "get", params).then((res) => {
        console.log(res);
        const { list } = res.data;
        if (list.length <= 0 && this.page > 1) {
          return (this.nomoreShow = true);
        } else {
          this.nomoreShow = false;
          list.map((it) => {
            it.checked = false;
            this.listVideo.push(it);
          });
        }
      });
    },
    // 0 图片 1: 视频
    change(e) {
      this.tabIndex = e;
      this.page = 1;
      if (e == 0) {
        this.listImg = [];
        this.getImgListFun();
      } else {
        this.listVideo = [];
        this.getVideoListFun();
      }
    },
    //全选
    allSelectFun() {
      if (this.tabIndex == 0) {
        this.listImg.map((it) => {
          it.checked = true;
        });
      } else {
        this.listVideo.map((it) => {
          it.checked = true;
        });
      }
    },
    //下载触发
    downCallFun() {
      console.log("下载触发", this.tabIndex);
      const _this = this;
      // 获取保存到相册权限
      uni.getSetting({
        success(res) {
          uni.authorize({
            scope: "scope.writePhotosAlbum",
            success() {
              if (_this.tabIndex == 0) {
                _this.downFun();
              } else {
                console.log("下载视频");
                _this.downVodieFun();
              }
            },
            fail() {
              _this.authShow = true;
            },
          });
        },
      });
    },
    //下载图片
    downFun() {
      const _this = this;
      let imgList = [];
      this.listImg.map((it) => {
        if (it.checked) {
          imgList.push(it.imgUrl);
        }
      });
      // 获取保存到相册权限
      uni.showLoading({
        title: "加载中",
        mask: true,
      });
      // 调用保存图片promise队列
      _this
        .queue(imgList)
        .then((res) => {
          uni.hideLoading();
          uni.showToast({
            title: "下载完成",
          });
        })
        .catch((err) => {
          uni.hideLoading();
          uni.showToast({
            title: "下载失败",
          });
          console.log(err);
        });
    },
    // 图片队列
    queue(urls) {
      let promise = Promise.resolve();
      urls.forEach((url, index) => {
        console.log("图片队列", url);
        promise = promise.then(() => {
          return this.download(url);
        });
      });
      return promise;
    },
    // 下载图片
    download(strUrl) {
      return new Promise((resolve, reject) => {
        console.log("下载图片", strUrl);
        if (strUrl) {
          uni.getImageInfo({
            src: strUrl,
            success: function (res) {
              console.log("下载图片", res);
              var temp = res.path;
              uni.saveImageToPhotosAlbum({
                filePath: temp,
                success: function (res) {
                  resolve(res);
                },
                fail: function (err) {
                  reject(res);
                },
              });
            },
            fail: function (err) {
              reject(err);
            },
          });
        }
      });
    },
    //下载视频
    downVodieFun() {
      const _this = this;
      let videoList = [];
      this.listVideo.map((it) => {
        if (it.checked) {
          videoList.push(it.url);
        }
      });
      uni.showLoading({
        title: "加载中",
        mask: true,
      });
      // 调用保存图片promise队列
      _this
        .queueVodie(videoList)
        .then((res) => {
          uni.hideLoading();
          uni.showToast({
            title: "下载完成",
          });
        })
        .catch((err) => {
          uni.hideLoading();
          _this.authShow = true;
          console.log(err);
        });
    },
    // 视频队列
    queueVodie(urls) {
      let promise = Promise.resolve();
      urls.forEach((url, index) => {
        promise = promise.then(() => {
          return this.downloadVodie(url);
        });
      });
      return promise;
    },
    // 下载视频
    downloadVodie(url) {
      return new Promise((resolve, reject) => {
        uni.downloadFile({
          url: url,
          success: function (res) {
            var temp = res.tempFilePath;
            uni.saveVideoToPhotosAlbum({
              filePath: temp,
              success: function (res) {
                resolve(res);
              },
              fail: function (err) {
                reject(res);
              },
            });
          },
          fail: function (err) {
            reject(err);
          },
        });
      });
    },
    //
    settingFun() {
      this.selectShow = true;
    },
    //
    closeFun() {
      this.selectShow = false;
    },
    //0 图片 1: 视频
    goBigPageFun(i, url) {
      uni.navigateTo({
        url: `/pages/materialShow/index?type=${i}&url=${encodeURIComponent(
          url
        )}`,
      });
    },
    //
    cancel() {
      this.authShow = false;
    },
  },
};
</script>

<style lang="scss">
.material {
  min-height: 100%;
  background: #fff;
}
.material-tabs {
  @include flex(space-between, center);
}
.material-tabs-r,
.material-tabs-l {
  font-size: 32rpx;
  color: #7f7f7f;
  flex: 1;
  text-align: center;
  font-weight: 300;
  padding: 30rpx;
}
.material-tabs-l {
  border-right: 1px solid #f5f5f5;
}
.active {
  color: #7b1736;
  font-size: 36rpx;
  font-weight: 400;
  border-bottom: 4rpx solid #7b1736;
}
.material-img-box {
  padding-top: 10rpx;
  @include flex(flex-start, center);
  flex-wrap: wrap;
}
.material-item-img {
  position: relative;
  margin-bottom: 20rpx;
  image {
    width: 100%;
    height: 248rpx;
    display: block;
  }
  video {
    width: 100%;
    height: 248rpx;
  }
}
.material-item-img:nth-child(3n) {
  margin-right: 0;
}
.material-setting {
  position: fixed;
  right: 0;
  top: 640rpx;
  z-index: 100;
}
.material-fotter-meun {
  background: rgba($color: #000000, $alpha: 0.5);
  padding: 20rpx 30rpx;
  color: #fff;
  font-size: 30rpx;
  font-weight: 500;
  @include flex(space-between, center);
  @extend %safe-area-inset-margin-bottom;
  position: fixed;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: 200;
}
.material-item-check {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background: rgba($color: #000000, $alpha: 0.5);
  .u-checkbox {
    position: absolute;
    bottom: 10rpx;
    right: 0;
    z-index: 100;
  }
}
</style>