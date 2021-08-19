<template>
  <div class="video-container">
    <!-- 搜索框 -->
    <van-nav-bar class="page-nav-bar" fixed>
      <van-button
        class="search-btn"
        slot="title"
        type="info"
        size="small"
        round
        icon="search"
        to="/search"
      >搜索</van-button>
    </van-nav-bar>
      <van-tabs v-model="active" animated swipeable>
      <van-tab title="小知识">没有找到相对应视频的接口</van-tab>
      <van-tab title="找兴趣">找兴趣</van-tab>
      <van-tab title="阿阿阿">阿阿阿</van-tab>
      <van-tab title="每日一答">每日一答</van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  name: "VideoIndex",
  data () {
    return {
      active: 0
    }
  }
}
</script>

<style lang="less" scoped>
.video-container {
  padding-top: 90px;
  .search-btn {
    width: 400px;
    height: 64px;
    background-color: #5babfb;
    border: none;
    font-size: 20px;
    .van-icon {
      font-size: 30px;
    }
  }
}
  //   .van-button__content {
  //     margin-top: 3px;
  //   }
  // }
</style>>
