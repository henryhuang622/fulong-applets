<template>
  <view class="footprint">
    <u-sticky>
      <view class="footprint-head">
        <view
          :class="
            activeIndex == 1 ? 'footprint-head-r active' : 'footprint-head-r'
          "
          @click="change(1)"
        >
          <text>酒款足迹</text>
        </view>
        <view
          :class="
            activeIndex == 0 ? 'footprint-head-l active' : 'footprint-head-l'
          "
          @click="change(0)"
        >
          <text>门店足迹</text>
        </view>
      </view>
    </u-sticky>
    <!-- 酒款足迹 -->
    <view
      class="footprint-contain"
      v-if="activeIndex == 1 && productList.length > 0"
    >
      <search-list :data="productList"></search-list>
    </view>
    <!-- 门店足迹 -->
    <view class="footprint-contain" v-if="activeIndex == 0">
      <store-list :data="storeList"></store-list>
    </view>

    <u-loadmore status="nomore" v-if="nomoreShow" />
  </view>
</template>

<script>
import { storeHistory, productSkuHistory } from "@/server/api";
import fetch from "@/server/fetch";

import storeList from "@/components/storeList/index";
import searchList from "@/components/searchList/index";
export default {
  components: {
    storeList,
    searchList,
  },
  // 下拉刷新
  onPullDownRefresh() {
    this.page = 1;
    this.nomoreShow = false;
    if (this.activeIndex == 0) {
      this.storeList = [];
      this.soterHistoryFun();
    } else {
      this.productList = [];
      this.wineHistoryFun();
    }
  },
  // 上拉加载数据
  onReachBottom() {
    if (this.activeIndex == 0) {
      if (!this.nomoreShow && this.storeList.length > 0) {
        this.page++;
        this.soterHistoryFun();
      }
    } else {
      if (!this.nomoreShow && this.productList.length > 0) {
        this.page++;
        this.wineHistoryFun();
      }
    }
  },
  data() {
    return {
      activeIndex: 1,
      storeList: [],
      productList: [],
      page: 1,
      size: 8,
      nomoreShow: false,
    };
  },
  onShow() {
    this.page = 1
    this.productList= []
    this.wineHistoryFun()
  },
  methods: {
    //酒款足迹
    wineHistoryFun() {
      const params = {
        page: this.page,
        size: this.size,
      };
      fetch(productSkuHistory, "get", params).then((res) => {
        uni.stopPullDownRefresh();
        const { list } = res.data;
        if (list.length <= 0 && this.page > 1) {
          return (this.nomoreShow = true);
        } else {
          this.nomoreShow = false;
          list.map((it) => {
            this.productList.push(it);
          });
        }
      });
    },
    // 门店足迹
    soterHistoryFun() {
      const params = {
        page: this.page,
        size: this.size,
      };
      fetch(storeHistory, "get", params).then((res) => {
        uni.stopPullDownRefresh();
        const { list } = res.data;
        if (list.length <= 0 && this.page > 1) {
          return (this.nomoreShow = true);
        } else {
          this.nomoreShow = false;
          list.map((it) => {
            this.storeList.push(it);
          });
        }
      });
    },
    //0：门店足迹 1:酒款足迹
    change(val) {
      this.activeIndex = val;
      this.page = 1;
      if (val == 0) {
        this.storeList = [];
        this.soterHistoryFun();
      } else {
        this.productList = [];
        this.wineHistoryFun();
      }
    },
  },
};
</script>

<style lang="scss">
.footprint {
  min-height: 100%;
  background: #fff;
}
.footprint-head {
  @include flex(space-between, center);
  background: #fff;
  font-size: 30rpx;
  font-weight: 500;
  text-align: center;
  color: #ccc;
}
.footprint-head-l {
  border-right: 1px solid rgb(218, 216, 216);
}
.footprint-head-l,
.footprint-head-r {
  flex: 1;
  padding: 30rpx 0;
}
.active {
  color: #7b1736;
  border-bottom: 1px solid #7b1736;
}
.footprint-contain {
  padding: 20rpx;
}
</style>