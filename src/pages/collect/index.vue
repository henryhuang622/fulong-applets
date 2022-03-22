<template>
  <view class="collect">
    <u-sticky>
      <view class="collect-head">
        <text>门店收藏</text>
      </view>
    </u-sticky>
    <view class="collect-contain">
      <store-list :data="list"></store-list>
    </view>

    <u-loadmore status="nomore" v-if="nomoreShow" />
  </view>
</template>

<script>
import storeList from "@/components/storeList/index";
import { storeCollect } from "@/server/api";
import fetch from "@/server/fetch";

export default {
  components: {
    storeList,
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
  data() {
    return {
      list: [],
      nomoreShow: false,
      page: 1,
      size: 8,
    };
  },
  onShow() {
    this.page = 1;
    this.list = [];
    this.init();
  },
  methods: {
    init() {
      const params = {
        page: this.page,
        size: this.size,
      };
      fetch(storeCollect, "get", params).then((res) => {
        uni.stopPullDownRefresh();
        const { list } = res.data;
        if (list.length <= 0 && this.page > 1) {
          return (this.nomoreShow = true);
        } else {
          this.nomoreShow = false;
          list.map((it) => {
            this.list.push(it);
          });
        }
      });
    },
  },
};
</script>

<style lang="scss">
.collect {
  min-height: 100%;
  background: #fff;
}
.collect-head {
  padding: 20rpx;
  border-bottom: 1px solid rgb(218, 216, 216);
  text-align: center;
  color: #7b1736;
  font-weight: 500;
  font-size: 30rpx;
  margin-bottom: 20rpx;
  background: #fff;
}
.collect-contain {
  padding: 0 20rpx;
}
</style>