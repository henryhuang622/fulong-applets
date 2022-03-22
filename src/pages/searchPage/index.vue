<template>
  <view class="search-contain">
    <u-sticky>
      <view class="search-contain-head-box">
        <view class="search-contain-head" @click="searchQuery">
          <view class="search-contain-head-contain">
            <input type="text" placeholder="请输入搜索关键字" disabled />
            <image
              src="../../static/icon/home/icon_searc.png"
              @click="searchQuery"
            ></image>
          </view>
        </view>
        <!-- 标题 -->
        <view class="search-contain-title-hote">
          <text>热门推荐</text>
        </view>
      </view>
    </u-sticky>
    <!-- 展示列表 -->
    <view class="search-contain-list">
      <search-list :data="list"></search-list>
    </view>
    <u-loadmore status="nomore" v-if="nomoreShow" />
    <u-back-top :scroll-top="scrollTop"></u-back-top>
  </view>
</template>

<script>
import searchList from "@/components/searchList/index";
import { popularList } from "@/server/api";
import fetch from "@/server/fetch";
import { loadingFun, hideLoadingFun } from "@/common/index";

export default {
  components: { searchList },
  data() {
    return {
      list: [],
      page: 1,
      size: 8,
      nomoreShow: false,
      scrollTop: 0,
      sxType: "",
    };
  },
  onPageScroll(e) {
    this.scrollTop = e.scrollTop;
  },
  // 下拉刷新
  onPullDownRefresh() {
    console.log("下拉刷新");
    this.page = 1;
    this.list = [];
    this.nomoreShow = false;
    this.searchFun();
  },
  // 上拉加载数据
  onReachBottom() {
    console.log("上拉加载数据", this.nomoreShow, this.list.length > 0);
    if (!this.nomoreShow && this.list.length > 0) {
      this.page++;
      this.searchFun();
    }
  },

  onShow() {
    this.page = 1;
    this.list = [];

    this.searchFun();
  },
  methods: {
    //搜索
    searchFun() {
      loadingFun("加载中...");
      const params = {
        page: this.page,
        size: this.size,
      };

      fetch(popularList, "get", params).then((res) => {
        hideLoadingFun();
        uni.stopPullDownRefresh();
        this.isShow = true;
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
    // 搜索
    searchQuery() {
       console.log('搜索')
       uni.navigateTo({url: '/pages/search/index'})
    },
  },
};
</script>

<style lang="scss">
.search-contain{
  min-height: 100%;
  background: #fff;
}
.search-contain-head {
  padding: 20rpx 10rpx 0 10rpx;
  background: #fff;
}
.search-contain-title-hote {
  font-size: 26rpx;
  color: #d7d7d7;
  font-size: 400;
  padding:20rpx;
}
.search-contain-head-contain {
  border-radius: 15rpx;
  border: 1px solid #333;
  height: 68rpx;
  position: relative;
  background: #fff;
  input {
    height: 100%;
    padding-left: 80rpx;
  }
  image {
    width: 41rpx;
    height: 41rpx;
    display: block;
    position: absolute;
    top: 10rpx;
    left: 10rpx;
  }
}
.search-contain-head-box {
  background: #fff;
}
.search-contain-content {
  background: #fff;
  padding: 0 20rpx;
}
.search-contain-title {
  font-size: 24rpx;
  color: #d7d7d7;
  font-weight: 400;
  margin-bottom: 20rpx;
  @include flex(space-between, center);
}
.search-contain-content-tag {
  @include flex(flex-start, center);
  flex-wrap: wrap;
  margin-bottom: 20rpx;
  padding-left: 30rpx;
  button {
    max-width: 250rpx;
    @extend %omit-1-css;
    margin: 0;
    margin-right: 10rpx;
  }
  button:last-child {
    margin-right: 0;
  }
}
.search-contain-tag {
  padding: 6rpx 20rpx;
  color: #7f7f7f;
  font-weight: 400;
  font-size: 20rpx;
  border: 1px solid #d7d7d7;
  border-radius: 25rpx;
  margin-right: 16rpx;
}
.search-contain-list{
  padding: 0 26rpx;
}
</style>