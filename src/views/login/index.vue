<template>
  <div class="login-container">
    <van-nav-bar class="page-nav-bar" title="登录">
      <van-icon slot="left" name="arrow-left" @click="$router.back()" />
    </van-nav-bar>
    <!-- 登录表单 -->
    <van-form ref="loginForm" @submit="onSubmit">
      <van-field
        v-model="user.mobile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="userFormRules.mobile"
        type="number"
        maxlength="11"
      >
        <i slot="left-icon" class="toutiao toutiao-shouji"></i>
      </van-field>
      <van-field
        v-model="user.code"
        name="code"
        placeholder="请输入验证码"
        :rules="userFormRules.code"
        type="number"
        maxlength="6"
      >
        <i slot="left-icon" class="toutiao toutiao-yanzhengma"></i>
        <template #button>
          <van-count-down
          v-if="isCountDownShow"
          :time="1000 * 10"
          format="ss s"
          @finish="isCountDownShow = false"
          />
          <van-button
            v-else
            class="send-sms-btn"
            round
            size="small"
            type="default"
            @click="onSendSms"
            native-type="button"
            >发送验证码</van-button
          >
        </template>
      </van-field>
      <div class="login-btn-wrap">
        <van-button class="login-btn" block type="info" native-type="submit">
          登录
        </van-button>
      </div>
    </van-form>
    <!-- /登录表单 -->
  </div>
</template>

<script>
import { login, sendSms } from "@/api/user";
export default {
  name: "LoginIndex",
  methods: {
    async onSubmit () {
      // 获取数据
      const user = this.user;

      this.$toast.loading({
        message: '登录中...',
        forbidClick: true,
        duration: 0
      })

      // 使用接口
      try {
        const { data } = await login(user)
        this.$store.commit('setUser', data.data)
        this.$toast.success('登录成功')

        // 跳转回原来页面,单纯返回
        this.$router.back()
      } catch (err) {
        if (err.response.status === 400) {
          this.$toast.fail("手机号or验证码错误")
        } else {
          this.$toast.fail("登录失败,请重试", err)
        }
      }
    },
// 验证手机号，发送验证码
    async onSendSms () {
      console.log(`onSendSms`)
      try {
       await this.$refs.loginForm.validate('mobile')
      } catch (err) {
        // return用来停止后面代码的运行
       return console.log('验证失败', err)
      }
      this.isCountDownShow = true
      try {
        await sendSms(this.user.mobile)
        this.$toast('发送成功')
      } catch (err) {
        // 失败后关闭倒计时
        this.isCountDownShow = false
        if (err.response.status === 429) {
           this.$toast('发送过于频繁，请重试')
        } else {
          this.$toast('发送失败')
        }
      }
    }
  },

  data() {
    return {
      user: {
        mobile: "13911111111",
        code: "246810"
      },
      userFormRules: {
        mobile: [{
          required: true,
          message: '手机号码不能为空'
          }, {
            pattern: /^1[3|5|7|8]\d{9}$/,
            message: '手机号格式错误'
          }],
          code: [{
            required: true,
            message: '请填写验证码'
          }, {
            pattern: /^\d{6}$/,
            messsage: '验证码格式错误'
          }]
      },
      isCountDownShow: false
    }
  }
}
</script>

<style scoped lang="less">
.login-container {
  .send-sms-btn {
    background-color: #ededed;
    height: 50px;
    line-height: 50px;
    color: #666;
  }
  .login-btn-wrap {
    padding: 55px 30px;
    .login-btn {
      background-color: #6db4fb;
      border: none;
    }
  }
}
</style>>
