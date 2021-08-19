<template>
  <div class="layout-container">
    <!-- 子路由出口 -->
    <router-view />
    <!-- 导航栏 -->
    <!-- route用来开启路由模式 -->
    <van-tabbar class="layout-tabbar" route>
      <van-tabbar-item to='/'>
        <i slot="icon" class="toutiao toutiao-shouye"></i>
        <span class="text">首页</span>
      </van-tabbar-item>
      <van-tabbar-item to='/sq'>
        <i slot="icon" class="toutiao toutiao-wenda"></i>
        <span class="text">社区</span>
      </van-tabbar-item>
      <van-tabbar-item to='/video'>
        <i slot="icon" class="toutiao toutiao-shipin"></i>
        <span class="text">视频</span>
      </van-tabbar-item>
      <van-tabbar-item to='/my'>
        <i slot="icon" class="toutiao toutiao-wode"></i>
        <span class="text">{{ $store.state.user ? '我' : '未登录' }}</span>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'LayoutIndex',
  data () {
    return {
    }
  }
}
</script>

<style scoped lang="less">
.layout-container {
  .layout-tabbar {
    i.toutiao {
      font-size: 45px;
    }
    span.text {
      font-size: 5px;
    }
  }
}
</style>
