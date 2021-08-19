<template>
  <div class="user-ziliao">
     <!-- 导航栏 -->
    <van-nav-bar
      class="page-nav-bar"
      title="个人信息"
      left-arrow
      @click-left="$router.back()"
    />
    <!-- 导航栏 -->
    <!-- 个人信息 -->
    <van-cell title="头像" is-link>
      <van-image
        class="touxiang"
        fit="cover"
        round
        src="https://img01.yzcdn.cn/vant/cat.jpeg"
      />
    </van-cell>
    <van-cell title="昵称" value="LWH" is-link/>
    <van-cell title="性别" value="男" is-link/>
    <van-cell title="生日" value="2021-08-19" is-link/>
  </div>
</template>

<script>
export default {
  name: 'UserZiliao'
}
</script>

<style lang="less" scoped>
.user-ziliao {
  .touxiang {
    width: 60px;
    height: 60px;
  }
}
</style>>
