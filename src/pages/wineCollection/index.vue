<template>
  <view class="wine-collection">
    <u-sticky>
      <view class="wine-collection-head">
        <text>酒款收藏</text>
        <view class="wine-collection-share" @click="openShareFun">
          <image
            v-if="!shareShow"
            src="../../static/icon/home/icon_share.png"
          ></image>
          <text v-else>完成</text>
        </view>
      </view>
    </u-sticky>
    <view class="wine-collection-contain" v-if="list.length > 0">
      <search-list
        :data="list"
        :checked="shareShow"
        @change="changeFun"
      ></search-list>
    </view>
    <view class="wine-collection-btn" v-if="shareShow">
      <button open-type="share">分享</button>
    </view>
    <u-loadmore status="nomore" v-if="nomoreShow" />
  </view>
</template>

<script>
import searchList from "@/components/searchList/index";
import { productSkuCollect } from "@/server/api";
import fetch from "@/server/fetch";

export default {
  components: { searchList },
  data() {
    return {
      shareShow: false,
      list: [],
      nomoreShow: false,
      page: 1,
      size: 8,
      idString: "",
    };
  },
  // 设置分享
  onShareAppMessage(res) {
    this.list.map((it) => {
      if (it.checked) {
        this.idString += `${it.productSkuCode},`;
      }
    });
    console.log("设置分享", this.list, this.idString);
    return {
      title: "来自您好友的倾情推荐",
      path: `/pages/recommendedWine/index?idString=${encodeURIComponent(
        this.idString
      )}`,
      imageUrl:
        "https://oss.aussino.net/static/sku-good-share-cover.png",
        
    };
  },
  // 下拉刷新
  onPullDownRefresh() {
    console.log("下拉刷新");
    this.page = 1;
    this.list = [];
    this.nomoreShow = false;
    this.init();
  },
  // 上拉加载数据
  onReachBottom() {
    if (!this.nomoreShow && this.list.length > 0) {
      this.page++;
      this.init();
    }
  },
  onShow() {
    this.page = 1;
    this.list = [];
    this.init();
  },
  methods: {
    //
    init() {
      const params = {
        page: this.page,
        size: this.size,
      };
      fetch(productSkuCollect, "get", params).then((res) => {
        uni.stopPullDownRefresh();
        const { list } = res.data;
        if (list.length <= 0 && this.page > 1) {
          return (this.nomoreShow = true);
        } else {
          this.nomoreShow = false;
          list.map((it) => {
            it.checked = false;
            this.list.push(it);
          });
        }
      });
      console.log(this.list);
    },
    //
    changeFun(e) {
      this.list[e].checked = !this.list[e].checked;
    },
    // 打开分享
    openShareFun() {
      this.shareShow = !this.shareShow;
    },
  },
};
</script>

<style lang="scss">
.wine-collection {
  min-height: 100%;
  background: #fff;
}
.wine-collection-head {
  padding: 20rpx;
  border-bottom: 1px solid rgb(218, 216, 216);
  text-align: center;
  color: #7b1736;
  font-weight: 500;
  font-size: 30rpx;
  position: relative;
  margin-bottom: 20rpx;
  background: #fff;
}
.wine-collection-share {
  width: 60rpx;
  height: 60rpx;
  position: absolute;
  right: 30rpx;
  top: 12rpx;
  line-height: 60rpx;
  color: #000;
  image {
    width: 100%;
    height: 100%;
    display: block;
  }
}
.wine-collection-contain {
  padding: 0 20rpx;
  padding-bottom: 100rpx;
}
.wine-collection-btn {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 100;
  @extend %safe-area-inset-padding-bottom;
  button {
    height: 90rpx;
    line-height: 90rpx;
    background: #7b1736;
    color: #fff;
    font-weight: 500;
    font-size: 36rpx;
  }
}
</style>