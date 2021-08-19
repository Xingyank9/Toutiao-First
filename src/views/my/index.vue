<template>
  <div class="my-container">
    <!-- 登录界面 -->
    <div v-if="user" class="header user-info">
      <div class="base-info">
        <div class="left">
          <van-image
            class="touxiang"
            src="https://img01.yzcdn.cn/vant/cat.jpeg"
            round
            fit="cover"
          />
          <span class="name">LWH</span>
        </div>
        <div class="right">
          <van-button size="mini" round to="/user/ziliao">个人资料</van-button>
        </div>
      </div>
      <div class="data-sum">
        <div class="data-item">
          <span class="count">10</span>
          <span class="text">提问</span>
        </div>
        <div class="data-item">
          <span class="count">10</span>
          <span class="text">关注</span>
        </div>
        <div class="data-item">
          <span class="count">10</span>
          <span class="text">粉丝</span>
        </div>
        <div class="data-item">
          <span class="count">10</span>
          <span class="text">荣誉</span>
        </div>
      </div>
    </div>
    <!-- 未登录界面 -->
    <div v-else class="header not-login">
      <div class="login-btn" @click="$router.push('/login')">
        <img class="mobile-img" src="~@/assets/mobile.png" alt="">
        <span class="text">登 录</span>
      </div>
    </div>
    <!-- 宫格 -->
    <van-grid v-if="user" :column-num="4" class="grid-nav" clickable>
      <van-grid-item class="grid-item">
        <i slot="icon" class="toutiao toutiao-shoucang"></i>
        <span slot="text" class="text">收藏</span>
      </van-grid-item>
      <van-grid-item class="grid-item">
        <i slot="icon" class="toutiao toutiao-lishi"></i>
        <span slot="text" class="text">历史浏览</span>
      </van-grid-item>
      <van-grid-item class="grid-item">
        <i slot="icon" class="toutiao toutiao-lishi"></i>
        <span slot="text" class="text">消息通知</span>
      </van-grid-item>
      <van-grid-item class="grid-item">
        <i slot="icon" class="toutiao toutiao-lishi"></i>
        <span slot="text" class="text">草稿箱</span>
      </van-grid-item>
    </van-grid>

    <van-cell v-if="user"  class="logout-cell" @click="onLogout" clickable>
     <span class="text">退出登录</span>
    </van-cell>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'MyIndex',
  computed: {
    ...mapState(['user'])
  },
  methods: {
    // 退出
    onLogout () {
      this.$dialog.confirm({
          title: '确认退出？'
          })
      .then(() => {
        // on confirm 成功执行 清掉登录状态（容器中的user和本地存储的user）
        this.$store.commit('setUser', null)
      })
      .catch(() => {
        // on cancel 取消执行
      })
    }
  }
}
</script>

<style scoped lang="less">
  .my-container {
    .header {
      height: 360px;
      background: url("~@/assets/banner.png"); // @指向src
      background-size: cover;
    }
    .not-login {
      display: flex;
      justify-content: center;
      align-items: center;
      .login-btn {
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          .mobile-img {
            width: 132px;
            height: 132px;
            margin-bottom: 20px;
          }
          .text {
            font-size: 28px;
            color: #fff;
          }
      }
    }
    .user-info {
      .base-info {
        height: 230px;
        padding: 75px 32px 23px;
        box-sizing: border-box;// height跟padding会撑大盒子，用这个来解决
        display: flex;
        justify-content: space-between;
        align-items: center;
        .left {
          display: flex;
          align-items: center;
          .touxiang {
            border: 3px solid #fff;
            width: 132px;
            height: 132px;
            margin-right: 20px;
          }
          .name {
            font-size: 30px;
            color: #fff;
          }
        }
      }
      .data-sum {
        display: flex;
        .data-item {
          height: 130px;
          flex: 1; // 平分父盒子
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          color: #fff;
          .count {
            font-size: 36px;
          }
          .text {
            font-size: 23px;
          }
        }
      }
    }
    .grid-nav {
      .grid-item {
        height: 140px;
        i.toutiao {
          font-size: 45px;
        }
        .toutiao-shoucang {
          color: red;
        }
        .toutiao-lishi {
          color: orange;
        }
        span.text {
          font-size: 28px;
        }
      }
    }
    .logout-cell {
      margin-top: 10px;
      .text {
        color: red;
        text-align: center;
        margin-left: 290px;
      }
    }
  }
</style>
