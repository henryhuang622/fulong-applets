<template>
  <view class="link">
    <web-view :src="link"></web-view>
  </view>
</template>

<script>
export default {
  onLoad(option){
    this.link = decodeURIComponent(option.link)
    uni.setNavigationBarTitle({
      title: decodeURIComponent(option.title)
    });
  },
  data(){
    return{
      link: ''
    }
  }
}
</script>

<style lang="scss">

</style>