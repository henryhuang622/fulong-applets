<template>
  <view class="recommended-wine">
    <u-sticky>
      <view class="recommended-wine-head">
        <text>推荐酒款</text>
      </view>
    </u-sticky>
    <view class="collect-contain">
      <search-list :data="list"></search-list>
    </view>
    <u-loadmore status="nomore" v-if="nomoreShow" />
  </view>
</template>

<script>
import searchList from "@/components/searchList/index";
import { shareListApi } from "@/server/api";
import fetch from "@/server/fetch";

export default {
  components: { searchList },
  data() {
    return {
      list: [],
      page: 1,
      size: 8,
      nomoreShow: false,
      codes:[]
    };
  },
  onLoad(option){
    console.log(option)
    decodeURIComponent(option.idString).split(',').map(it =>{
      if(it){
         this.codes.push(it)
      }
    })
    console.log(' decodeURIComponent(option.idString).split(',')',this.codes)
    this.init()
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
  methods: {
    init(){
      fetch(`${shareListApi}?codes=${this.codes.toString()}`, 'get').then(res =>{
         uni.stopPullDownRefresh();
        const { data } = res.data
        this.list =data
      })
    }
  },
};
</script>

<style lang="scss">
.recommended-wine {
  min-height: 100%;
  background: #fff;
}
.recommended-wine-head {
  padding: 20rpx;
  background: #fff;
  border-bottom: 1px solid rgb(218, 216, 216);
  text-align: center;
  color: #7b1736;
  font-weight: 500;
  font-size: 30rpx;
}
.collect-contain{
  padding: 20rpx;
}
</style>