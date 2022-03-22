<template>
  <view class="search-contain">
    <u-sticky>
      <view class="search-contain-head-box">
        <view class="search-contain-head">
          <view class="search-contain-head-contain">
            <input
              type="text"
              v-model="searchVal"
              placeholder="请输入搜索关键字"
              @confirm="searchQuery"
              confirm-type="search"
            />
            <image
              src="../../static/icon/home/icon_searc.png"
              @click="searchQuery"
            ></image>
          </view>
        </view>
        <!-- 筛选 -->
        <view class="search-contain-sx">
          <u-dropdown title-size="24" ref="searchTab" @close="close">
            <!-- 品牌 -->
            <u-dropdown-item
              v-model="brandVal"
              :title="brandName"
              @change="changeType($event, 0)"
            >
              <view class="slot-content" style="background: #fff">
                <scroll-view scroll-y="true" style="height: 400rpx">
                  <u-row>
                    <u-col span="6" v-for="(item, i) in brand" :key="i">
                      <button
                        :class="
                          item.key
                            ? 'search-contain-btn-active'
                            : 'search-contain-btn'
                        "
                        size="mini"
                        @click="selectFun(0, i, item)"
                      >
                        {{ item.label }}
                      </button>
                    </u-col>
                  </u-row>
                </scroll-view>
                <view class="dropdown-query">
                  <button size="mini" @click="queryCloseDFun(0)">确认</button>
                  <button
                    size="mini"
                    @click="queryreFun(0)"
                    style="margin-left: 20rpx"
                  >
                    重置
                  </button>
                </view>
              </view>
            </u-dropdown-item>
            <!-- 产区 -->
            <u-dropdown-item
              v-model="OriginVal"
              :title="OriginName"
              @change="changeType($event, 2)"
            >
              <view class="slot-content" style="background: #fff">
                <scroll-view scroll-y="true" style="height: 400rpx">
                  <u-row>
                    <u-col span="6" v-for="(item, i) in Origin" :key="i">
                      <button
                        :class="
                          item.key
                            ? 'search-contain-btn-active'
                            : 'search-contain-btn'
                        "
                        size="mini"
                        @click="selectFun(2, i, item)"
                      >
                        {{ item.label }}
                      </button>
                    </u-col>
                  </u-row>
                </scroll-view>
                <view class="dropdown-query">
                  <button size="mini" @click="queryCloseDFun(1)">确认</button>
                  <button
                    size="mini"
                    @click="queryreFun(1)"
                    style="margin-left: 20rpx"
                  >
                    重置
                  </button>
                </view>
              </view>
            </u-dropdown-item>
            <!-- 类型 -->
            <u-dropdown-item
              v-model="TypeVal"
              :title="TypeName"
              @change="changeType($event, 4)"
            >
              <view class="slot-content" style="background: #fff">
                <scroll-view scroll-y="true" style="height: 400rpx">
                  <u-row>
                    <u-col span="6" v-for="(item, i) in Type" :key="i">
                      <button
                        :class="
                          item.key
                            ? 'search-contain-btn-active'
                            : 'search-contain-btn'
                        "
                        size="mini"
                        @click="selectFun(4, i, item)"
                      >
                        {{ item.label }}
                      </button>
                    </u-col>
                  </u-row>
                </scroll-view>
                <view class="dropdown-query">
                  <button size="mini" @click="queryCloseDFun(2)">确认</button>
                  <button
                    size="mini"
                    @click="queryreFun(2)"
                    style="margin-left: 20rpx"
                  >
                    重置
                  </button>
                </view>
              </view>
            </u-dropdown-item>
            <!-- 容量 -->
            <u-dropdown-item
              v-model="CapacityVal"
              :title="CapacityName"
              @change="changeType($event, 5)"
            >
              <view class="slot-content" style="background: #fff">
                <scroll-view scroll-y="true" style="height: 400rpx">
                  <u-row>
                    <u-col span="6" v-for="(item, i) in Capacity" :key="i">
                      <button
                        :class="
                          item.key
                            ? 'search-contain-btn-active'
                            : 'search-contain-btn'
                        "
                        size="mini"
                        @click="selectFun(5, i, item)"
                      >
                        {{ item.label }}
                      </button></u-col
                    >
                  </u-row>
                </scroll-view>
                <view class="dropdown-query">
                  <button size="mini" @click="queryCloseDFun(3)">确认</button>
                  <button
                    size="mini"
                    @click="queryreFun(3)"
                    style="margin-left: 20rpx"
                  >
                    重置
                  </button>
                </view>
              </view>
            </u-dropdown-item>
          </u-dropdown>
        </view>
        <!-- 历史记录/热门搜索 -->
        <view class="search-contain-content" v-if="!typeShow">
          <view class="search-contain-title">
            <view>
              <text>历史搜索</text>
            </view>
            <view v-if="labelList.length" @click="deleteFun">
              <u-icon name="close-circle" color="#666" size="30"></u-icon>
            </view>
          </view>
          <view class="search-contain-content-tag">
            <button
              size="mini"
              v-for="(item, i) in labelList"
              :key="i"
              @click="hosFun(item.label)"
            >
              {{ item.label }}
            </button>
            <!-- <view
              class="search-contain-tag"
              v-for="(item, i) in labelList"
              :key="i"
              @click="hosFun(item.label)"
            >
              <text>{{ item.label }}</text>
            </view> -->
          </view>
        </view>
        <!-- 标题 -->
        <!-- <view class="search-contain-title-hote">
          <text>热门推荐</text>
        </view> -->
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
import {
  productSearch,
  productBrand,
  productCapacity,
  productOrigin,
  productType,
} from "@/server/api";
import fetch from "@/server/fetch";
import{ loadingFun, hideLoadingFun } from "@/common/index"

export default {
  components: { searchList },
  data() {
    return {
      list: [],
      agent: [],
      agentVal: [],
      brand: [],
      brandVal: [],
      Capacity: [],
      CapacityVal: [],
      Grape: [],
      GrapeVal: [],
      Origin: [],
      OriginVal: [],
      Taste: [],
      TasteVal: [],
      Type: [],
      TypeVal: [],
      isShow: false,
      typeShow: false,
      searchVal: "",
      brandName: "品牌",
      agentName: "代理",
      OriginName: "产区",
      GrapeName: "品种",
      TypeName: "类型",
      CapacityName: "容量",
      TasteName: "口味",
      labelList: [],
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
  watch: {
    searchVal(value) {
      console.log("searchVal", value);
      if (value) {
        this.typeShow = true;
      } else {
        this.typeShow = false;
        this.isShow = false;
        this.nomoreShow = false;
      }
    },
  },
  onShow() {
    this.getProductBrand();
    this.getProductCapacity();
    this.getProductOrigin();
    this.getProductType();
    if (uni.getStorageSync("searchData")) {
      this.labelList = uni.getStorageSync("searchData");
    } else {
      this.labelList = [];
    }
  },
  methods: {
    //搜索
    searchFun() {
      loadingFun("搜索中...");
      let islabelShow = false;
      const params = {
        page: this.page,
        size: this.size,
      };
      if (this.searchVal) {
        params.val = this.searchVal;
      }
      if (this.brandVal.length > 0) {
        params.brandId = this.brandVal.toString();
      }
      if (this.CapacityVal.length > 0) {
        params.capacityId = this.CapacityVal.toString();
      }
      if (this.OriginVal.length > 0) {
        params.originId = this.OriginVal.toString();
      }
      if (this.TypeVal.length > 0) {
        params.typeId = this.TypeVal.toString();
      }
      fetch(productSearch, "get", params).then((res) => {
        hideLoadingFun()
       uni.stopPullDownRefresh();
        this.isShow = true;
        const { list } = res.data;
        console.log(this.page, list.length)
        if (list.length <= 0 && this.page > 1) {
          this.nomoreShow = true
        } else {
          this.nomoreShow = false;
          list.map((it) => {
            this.list.push(it);
          });
        }
        if (this.labelList.length > 0) {
          this.labelList.map((it) => {
            console.log(
              it.label == this.searchVal.replace(/ /g, ""),
              !this.searchVal
            );
            if (
              it.label == this.searchVal.replace(/ /g, "") ||
              !this.searchVal
            ) {
              islabelShow = true;
            }
          });
          console.log("islabelShow", islabelShow);
          if (!islabelShow) {
            this.labelList.push({ label: this.searchVal });
          }
        } else {
          if (this.searchVal) {
            this.labelList.push({ label: this.searchVal });
          }
        }
        uni.setStorageSync("searchData", this.labelList);
      });
    },
    // 搜索
    searchQuery() {
      this.page = 1;
      this.list = [];
      this.searchFun();
    },
    //确认筛选 0: 品牌 1:产区 2:类型 3：容量
    queryCloseDFun(val) {
      this.page = 1;
      this.list = [];
      switch (val) {
        case 0:
          this.brand.map((it) => {
            if (it.key) {
              this.brandVal.push(it.value);
            }
          });
          break;
        case 1:
          this.Origin.map((it) => {
            if (it.key) {
              this.OriginVal.push(it.value);
            }
          });
          break;
        case 2:
          this.Type.map((it) => {
            if (it.key) {
              this.TypeVal.push(it.value);
            }
          });
          break;
        case 3:
          this.Capacity.map((it) => {
            if (it.key) {
              this.CapacityVal.push(it.value);
            }
          });
          break;
      }
      this.searchFun();
      this.$refs.searchTab.close();
    },
    //重置筛选 0: 品牌 1:产区 2:类型 3：容量
    queryreFun(val) {
      switch (val) {
        case 0:
          this.brandVal = [];
          this.getProductBrand();
          break;
        case 1:
          this.OriginVal = [];
          this.getProductOrigin();
          break;
        case 2:
          this.TypeVal = [];
          this.getProductType();
          break;
        case 3:
          this.CapacityVal = [];
          this.getProductCapacity();
          break;
      }
    },
    // 获取品牌
    getProductBrand() {
      loadingFun('加载中...')
      this.brand = [];
      fetch(productBrand, "get").then((res) => {
       hideLoadingFun()
        const { data } = res.data;
        data.map((it) => {
          this.brand.push({ label: it.nameZhCn, value: it.id, key: false });
        });
      });
    },
    //获取容量
    getProductCapacity() {
       loadingFun('加载中...')
      this.Capacity = [];
      fetch(productCapacity, "get").then((res) => {
         hideLoadingFun()
        const { data } = res.data;
        data.map((it) => {
          this.Capacity.push({ label: it.nameZhCn, value: it.id, key: false });
        });
      });
    },
    //获取产区
    getProductOrigin() {
       loadingFun('加载中...')
      this.Origin = [];
      fetch(productOrigin, "get").then((res) => {
         hideLoadingFun()
        const { data } = res.data;
        data.map((it) => {
          this.Origin.push({ label: it.nameZhCn, value: it.id, key: false });
        });
      });
    },
    //获取类型
    getProductType() {
       loadingFun('加载中...')
      this.Type = [];
      fetch(productType, "get").then((res) => {
       hideLoadingFun()
        const { data } = res.data;
        data.map((it) => {
          this.Type.push({ label: it.nameZhCn, value: it.id, key: false });
        });
      });
    },
    //0:品牌 1:代理 2:产区 3: 品种 4:类型 5:容量 6:口味
    changeType(data, i) {
      console.log(data, i);
      switch (i) {
        case 0:
          this.brand.map((it) => {
            if (it.value == data) {
              this.brandName = it.label;
            }
          });
          this.searchFun();
          break;
        case 1:
          this.agent.map((it) => {
            if (it.value == data) {
              this.agentName = it.label;
            }
          });
          this.searchFun();
          break;
        case 2:
          this.Origin.map((it) => {
            if (it.value == data) {
              this.OriginName = it.label;
            }
          });
          this.searchFun();
          break;
        case 3:
          this.Grape.map((it) => {
            if (it.value == data) {
              this.GrapeName = it.label;
            }
          });
          this.searchFun();
          break;
        case 4:
          this.Type.map((it) => {
            if (it.value == data) {
              this.TypeName = it.label;
            }
          });
          this.searchFun();
          break;
        case 5:
          this.Capacity.map((it) => {
            if (it.value == data) {
              this.CapacityName = it.label;
            }
          });
          this.searchFun();
          break;
        default:
          this.Taste.map((it) => {
            if (it.value == data) {
              this.TasteName = it.label;
            }
          });
          this.searchFun();
          break;
      }
    },
    // 触发历史记录
    hosFun(label) {
      // this.pageNum = 1;
      this.list = [];
      this.searchVal = label;
      this.searchFun();
    },
    //多选条件 0:品牌 1:代理 2:产区 3: 品种 4:类型 5:容量 6:口味
    selectFun(val, i, data) {
      console.log("多选条件", val, i, data);
      this.sxType = val;
      switch (val) {
        case 0:
          this.brandVal = [];
          this.brand[i].key = !this.brand[i].key;
          break;
        case 2:
          this.OriginVal = [];
          this.Origin[i].key = !this.Origin[i].key;
          break;
        case 4:
          this.TypeVal = [];
          this.Type[i].key = !this.Type[i].key;
          break;
        case 5:
          this.CapacityVal = [];
          this.Capacity[i].key = !this.Capacity[i].key;
          break;
      }
    },
    //筛选关闭
    close(e) {
      this.$refs.searchTab.highlight(e);
    },
    //清除记录
    deleteFun() {
      uni.showModal({
        title: "温馨提示",
        content: "是否清除历史记录？",
        success: (res) => {
          if (res.confirm) {
            this.labelList = [];
            uni.removeStorageSync("searchData");
          } else if (res.cancel) {
            console.log("用户点击取消");
          }
        },
      });
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
  padding: 0 20rpx 20rpx 20rpx;
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
  padding: 0 20rpx 20rpx 20rpx;
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
.search-contain-sx {
  background: #fff;
}
.search-contain-list {
  padding: 20rpx 26rpx;
  // background: #fff;
}
.search-contain-btn-active {
  font-weight: 500;
  color: #7b1736;
  border: 1px solid #7b1736;
  width: 95%;
  @extend %omit-1-css;
}
.search-contain-btn {
  margin-right: 16rpx;
  width: 99%;
  border: 1px solid #fff;
  @extend %omit-1-css;
}
.dropdown-query {
  padding: 20rpx;
  background: #fff;
  button {
    background: #7b1736;
    color: #fff;
    font-weight: 500;
  }
}
.search-contain-delete {
  border-radius: 20rpx;
  font-size: 28rpx;
  color: #7b1736;
  text-align: right;
  padding: 0 20rpx;
}
</style>