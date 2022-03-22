<template>
  <view class="com-detail">
    <view class="com-detail-head">
      <swiper class="swiper" autoplay>
        <swiper-item class="" v-for="(item, i) in info.images" :key="i">
          <image mode="aspectFit" :src="item.imgUrl"></image>
        </swiper-item>
      </swiper>
      <view class="com-detail-btn" @click="goMaterial">
        <text>更多图片</text>
      </view>
    </view>
    <view class="com-detail-contain">
      <view class="com-detail-contain-head">
        <view class="com-detail-contain-head-l">
          <view class="com-detail-contain-name">
            <text>{{ info.productNameZhCn }}</text>
          </view>
          <view class="com-detail-contain-name-en">
            <text>{{ info.productNameEn }}</text>
          </view>
        </view>

        <view class="store-detail-share">
          <image src="../../static/icon/home/icon_share.png"></image>
          <button open-type="share"></button>
        </view>
        <view class="com-detail-contain-head-r" @click="checkCollectFun">
          <u-icon
            name="heart"
            v-if="!info.collect"
            color="#7b1736"
            size="50"
          ></u-icon>
          <u-icon name="heart-fill" v-else color="#7b1736" size="50"></u-icon>
        </view>
      </view>
      <u-line color="#7f7f7f" />
      <view class="com-detail-contain-des">
        <text>{{ info.productDescZhCn }}</text>
      </view>
      <view class="com-detail-contain-des" v-if="info.productDescEn">
        <text>{{ info.productDescEn }}</text>
      </view>
      <u-line color="#7f7f7f" />
      <view class="com-detail-contain-list">
        <!-- 年份 -->
        <view class="com-detail-contain-cell">
          <view class="com-detail-contain-cell-l">
            <view>
              <text>年份</text>
            </view>
            <view>
              <text>Vintage</text>
            </view>
          </view>
          <view class="com-detail-contain-cell-r">
            <button
              :class="code == item.code ? 'sku-btn m-r-15' : 'm-r-15'"
              size="mini"
              v-for="(item, i) in info.skuList"
              :key="i"
              @click="skuSelectFun(item, i)"
            >
              {{ item.years }}
            </button>
          </view>
        </view>
        <u-line color="#7f7f7f" />
        <!-- 类型 -->
        <view v-if="info.typeNameZhCn || info.typeNameE">
          <view class="com-detail-contain-cell">
            <view class="com-detail-contain-cell-l">
              <view>
                <text>类型</text>
              </view>
              <view>
                <type>Type</type>
              </view>
            </view>
            <view class="com-detail-contain-cell-r">
              <view v-if="info.typeNameZhCn">
                <text>{{ info.typeNameZhCn }}</text>
              </view>
              <view v-if="info.typeNameEn">
                <text>{{ info.typeNameEn }}</text>
              </view>
            </view>
          </view>
          <u-line color="#7f7f7f" />
        </view>
        <!-- 容量 -->
        <view v-if="info.capacityNameZhCn">
          <view class="com-detail-contain-cell">
            <view class="com-detail-contain-cell-l">
              <view>
                <text>容量</text>
              </view>
              <view>
                <text>Capacity</text>
              </view>
            </view>
            <view class="com-detail-contain-cell-r">
              <view>
                <text>{{ info.capacityNameZhCn }}ml</text>
              </view>
            </view>
          </view>
          <u-line color="#7f7f7f" />
        </view>
        <!-- 酒精度 -->
        <view v-if="info.alcohol">
          <view class="com-detail-contain-cell">
            <view class="com-detail-contain-cell-l">
              <view>
                <text>酒精度</text>
              </view>
              <view>
                <text>Alcohol</text>
              </view>
            </view>
            <view class="com-detail-contain-cell-r">
              <view>
                <text>{{ info.alcohol }}</text>
              </view>
            </view>
          </view>
          <u-line color="#7f7f7f" />
        </view>
        <!-- 品种/原料 -->
        <view v-if="info.grapeVarietyNameEn || info.grapeVarietyNameZhCn">
          <view class="com-detail-contain-cell">
            <view class="com-detail-contain-cell-l">
              <view>
                <text>品种/原料</text>
              </view>
              <view>
                <text>Variety/Raw Material</text>
              </view>
            </view>
            <view class="com-detail-contain-cell-r">
              <view v-if="info.grapeVarietyNameZhCn">
                <text>{{ info.grapeVarietyNameZhCn }}</text>
              </view>
              <view v-if="info.grapeVarietyNameEn">
                <text>{{ info.grapeVarietyNameEn }}</text>
              </view>
            </view>
          </view>
          <u-line color="#7f7f7f" />
        </view>
        <!-- 产区 -->
        <view v-if="info.originNameZhCn || info.originNameEn">
          <view class="com-detail-contain-cell">
            <view class="com-detail-contain-cell-l">
              <view>
                <text>产区</text>
              </view>
              <view>
                <text>Region</text>
              </view>
            </view>
            <view class="com-detail-contain-cell-r">
              <view v-if="info.originNameZhCn">
                <text>{{ info.originNameZhCn }}</text>
              </view>
              <view v-if="info.originNameEn">
                <text>{{ info.originNameEn }}</text>
              </view>
            </view>
          </view>
          <u-line color="#7f7f7f" />
        </view>
        <!-- 饮用温度 -->
        <view v-if="info.drinkTemperature">
          <view class="com-detail-contain-cell">
            <view class="com-detail-contain-cell-l">
              <view>
                <text>饮用温度</text>
              </view>
              <view>
                <text>Drinking Temperature</text>
              </view>
            </view>
            <view class="com-detail-contain-cell-r">
              <view>
                <text>{{ info.drinkTemperature }}</text>
              </view>
            </view>
          </view>
          <u-line color="#7f7f7f" />
        </view>
        <!-- 推荐理由 -->
        <view v-if="info.assortedDishesZhCn || info.assortedDishesEn">
          <view class="com-detail-contain-cell">
            <view class="com-detail-contain-cell-l">
              <view>
                <text>推荐理由</text>
              </view>
              <view>
                <text>Comments</text>
              </view>
            </view>
            <view class="com-detail-contain-cell-r">
              <view v-if="info.assortedDishesZhCn">
                <text>{{ info.assortedDishesZhCn }}</text>
              </view>
              <view v-if="info.assortedDishesEn">
                <text>{{ info.assortedDishesEn }}</text>
              </view>
            </view>
          </view>
          <u-line color="#7f7f7f" />
        </view>
        <!-- 获奖评分 -->
        <view v-if="info.awardScoreZhZn || info.awardScoreEn">
          <view class="com-detail-contain-cell">
            <view class="com-detail-contain-cell-l">
              <view>
                <text>获奖评分</text>
              </view>
              <view>
                <text>Accolade</text>
              </view>
            </view>
            <view class="com-detail-contain-cell-r">
              <view v-if="info.awardScoreZhZn">
                <text>{{ info.awardScoreZhZn }}</text>
              </view>
              <view v-if="info.awardScoreEn">
                <text>{{ info.awardScoreEn }}</text>
              </view>
            </view>
          </view>
          <u-line color="#7f7f7f" />
        </view>
        <!-- 品鉴笔记 -->
        <view v-if="info.tasteNoteZhCn || info.tasteNoteEn">
          <view class="com-detail-contain-cell">
            <view class="com-detail-contain-cell-l">
              <view>
                <text>品鉴笔记</text>
              </view>
              <view>
                <text>Tasting Notes</text>
              </view>
            </view>
            <view class="com-detail-contain-cell-r">
              <view v-if="info.tasteNoteZhCn">
                <text>{{ info.tasteNoteZhCn }}</text>
              </view>
              <view v-if="info.tasteNoteEn">
                <text>{{ info.tasteNoteEn }}</text>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
    <!-- 客服 -->
    <drag-button :isDock="true" :existTabBar="true"></drag-button>
    <u-back-top :scroll-top="scrollTop"></u-back-top>
  </view>
</template>

<script>
import {
  productSku,
  productSkuCollect,
  delectSkuCollect,
  productSkuShare,
} from "@/server/api";
import dragButton from "@/components/drag-button/drag-button.vue";
import fetch from "@/server/fetch";
import { checkLoginFun } from "@/common/check";

export default {
  components: {
    dragButton,
  },
  data() {
    return {
      code: "",
      info: {},
      scrollTop: 0,
      type: ''
    };
  },
  onPageScroll(e) {
    this.scrollTop = e.scrollTop;
  },
  onLoad(option) {
    // http://app.aussino.net/#/winedetails/产品ID
    // console.log("onLoadeatCode:", option);
    console.log('decodeURIComponent123',option.q,decodeURIComponent(option.q));
    if (option.q) {
      console.log('decodeURIComponent',decodeURIComponent(option.q).split("winedetails/")[1]);
      this.code = decodeURIComponent(option.q).split("winedetails/")[1];
    } else {
      this.code = option.code;
    }
    if (option.type == "share") {
      this.getProductSkuShare();
    } else {
      this.getProductSkuList();
    }
  },
  onShareAppMessage(res) {
    uni.showShareMenu({
      menus: ["shareAppMessage", "shareTimeline"],
    });
  },
  onShareTimeline() {
    console.log("onShareTimeline", this.code);
    return {
      query: `code=${this.code}&type=share`,
    };
  },
  methods: {
    //获取产品详情
    getProductSkuList() {
      fetch(`${productSku}/${this.code}`, "get")
        .then((res) => {
          console.log("获取产品详情", res);
          const { data } = res.data;
          this.info = data;
          uni.setNavigationBarTitle({
            title: data.productNameZhCn,
          });
        })
        .catch((err) => {
          uni.navigateTo({
            url: `/pages/link/index?link=${encodeURIComponent(
              "https://www.aussino.net/"
            )}&title=${encodeURIComponent("富隆酒业")}`,
          });
        });
    },
    // 分享后的产品详情
    getProductSkuShare() {
      fetch(`${productSkuShare}/${this.code}`, "get")
        .then((res) => {
          console.log("获取产品详情", res);
          const { data } = res.data;
          this.info = data;
          uni.setNavigationBarTitle({
            title: data.productNameZhCn,
          });
        })
        .catch((err) => {
          uni.navigateTo({
            url: `/pages/link/index?link=${encodeURIComponent(
              "https://www.aussino.net/"
            )}&title=${encodeURIComponent("富隆酒业")}`,
          });
        });
    },
    //
    skuSelectFun(data, i) {
      this.code = data.code;
      this.getProductSkuList();
    },
    //收藏
    collectFun() {
      if (this.info.collect) {
        this.delectCollectApi();
      } else {
        this.collectApi();
      }
    },
    checkCollectFun() {
      checkLoginFun(this.collectFun());
    },
    // 收藏
    collectApi() {
      const params = {
        productSkuCode: this.code,
      };
      fetch(productSkuCollect, "post", params).then((res) => {
        uni.showToast({
          title: "成功收藏！",
          icon: "none",
        });
        this.info.collect = true;
      });
    },
    //取消收藏
    delectCollectApi() {
      fetch(`${delectSkuCollect}?productSkuCode=${this.code}`, "delete").then(
        (res) => {
          uni.showToast({
            title: "取消收藏！",
            icon: "none",
          });
          this.info.collect = false;
        }
      );
    },
    //
    goMaterial() {
      uni.navigateTo({ url: `/pages/material/index?code=${this.code}` });
    },
  },
};
</script>

<style lang="scss">
.com-detail {
  min-height: 100%;
  background: #fff;
  position: relative;
}
.com-kf-btn {
  position: absolute;
  top: 50%;
  right: 0;
}
.m-r-15 {
  margin-right: 24rpx;
}
.sku-btn {
  // background: #7b1736;
  // color: #fff;
  color: #7b1736;
  border: 1px solid #7b1736;
  font-weight: 500;
}
.com-detail-head {
  position: relative;
}
.com-detail-btn {
  position: absolute;
  right: 0;
  top: 80rpx;
  background: rgba($color: #7b1736, $alpha: 0.3);
  color: #7b1736;
  padding: 10rpx 30rpx;
  border-top-left-radius: 30rpx;
  border-bottom-left-radius: 30rpx;
}
.swiper {
  width: 100%;
  height: 450rpx;
  swiper-item {
    width: 100%;
    height: 100%;
    image {
      width: 100%;
      height: 100%;
      display: block;
    }
  }
}
.com-detail-contain {
  padding: 30rpx;
  background: #fff;
}
.com-detail-contain-list {
  @extend %safe-area-inset-padding-bottom;
}
.com-detail-contain-head {
  @include flex(space-between, center);
  margin-bottom: 20rpx;
}
.com-detail-contain-name {
  font-size: 32rpx;
  color: #555;
  font-weight: 700;
}
.com-detail-contain-name-en {
  font-size: 28rpx;
  color: #7f7f7f;
  font-weight: 400;
}
.com-detail-contain-des {
  font-size: 28rpx;
  color: #7f7f7f;
  font-weight: 400;
  margin: 20rpx 0;
}
.com-detail-contain-cell {
  @include flex(flex-start, flex-start);
  padding: 20rpx 0;
  font-size: 28rpx;
}
.com-detail-contain-cell-l {
  width: 180rpx;
  color: #333;
  font-size: 28rpx;
  font-weight: 500;
}
.com-detail-contain-cell-r {
  width: 514rpx;
  color: #7f7f7f;
  font-weight: 400;
  padding: 0 10rpx;
  button::after {
    border: 0;
  }
}
.com-detail-contain-head-l {
  width: 530rpx;
}
.store-detail-share {
  width: 55rpx;
  height: 53rpx;
  position: relative;
  image {
    width: 100%;
    height: 100%;
    display: block;
  }
  button {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: transparent;
    border: 0;
    border-radius: 0;
  }
  button::after {
    border: 0;
    border-radius: 0;
  }
}
</style>