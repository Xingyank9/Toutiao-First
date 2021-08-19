<template>
  <div class="home-container">
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
    <!-- 频道列表 -->
    <van-tabs v-model="active" animated swipeable>
      <van-tab
        :title="channel.name"
        v-for="channel in channels"
        :key="channel.id"
      >
      <!-- 文章列表 -->
      <article-list :channel="channel" />
      <!-- 文章列表 -->
      </van-tab>
      <div slot="nav-right" class="placeholder"></div>
      <div slot="nav-right" class="hamburger-btn" @click="isChannelEditShow = true">
        <i class="toutiao toutiao-gengduo"></i>
      </div>
    </van-tabs>
     <!-- 频道列表 -->
     <!-- 频道编辑 -->
     <van-popup
        v-model="isChannelEditShow"
        closeable
        position="bottom"
        :style="{ height: '80%' }"
      >
        <channel-edit :my-channels="channels" :active="active" @update-active="onUpdateActive"/>
      </van-popup>
     <!-- 频道编辑 -->
  </div>
</template>

<script>
import { getUserChannels } from '@/api/user'
import ArticleList from './components/article-list.vue'
import ChannelEdit from './components/channel-edit.vue'

export default {
  components: {
    ArticleList,
    ChannelEdit
  },
  name: 'HomeIndex',
  data () {
    return {
      active: 0,
      channels: [],
      isChannelEditShow: false // 控制频道弹出层的展示
    }
  },
  created () {
    this.loadChannels()
  },
  methods: {
    async loadChannels () {
      try {
        const { data } = await getUserChannels()
        this.channels = data.data.channels
      } catch (error) {
        this.$toast('获取失败')
      }
    },
    onUpdateActive (index, isChannelEditShow = true) {
      // 让页面跟编辑页面的红色选择同步
      this.active = index
      // 顺手关了编辑频道的页面
      this.isChannelEditShow = isChannelEditShow
    }
  }
}
</script>

<style scoped lang="less">
.home-container {
  padding-top: 174px;
  padding-bottom: 100px;
/deep/.van-tabs__wrap {
      z-index: 1;
      top: 92px;
      position: fixed;
      height: 82px;
      left: 0;
      right: 0;
    }
  .search-btn {
    width: 400px;
    height: 64px;
    background-color: #5babfb;
    border: none;
    font-size: 20px;
    .van-icon {
      font-size: 30px;
    }
    .van-button__content {
      margin-top: 3px;
    }
  }
  .hamburger-btn {
    position: fixed;
    right: 0;
    width: 66px;
    height: 82px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fff;
    opacity: 0.9;
    i.toutiao {
      font-size: 35px;
    }
  }
  .placeholder {
    width: 66px;
    height: 82px;
    flex-shrink: 0;
  }
}
</style>
