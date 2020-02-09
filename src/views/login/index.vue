<template>
  <div class="login-container">
    <!-- 导航栏 -->
    <van-nav-bar title="登录" />
    <!-- 导航栏 -->

    <!-- 登录列表 -->
    <van-cell-group>
      <van-field v-model="user.mobile" clearable label="手机号" placeholder="请输入手机号"></van-field>
      <van-field v-model="user.code" label="验证码" placeholder="请输入验证码" required>
        <!-- 倒计时组件 -->
        <van-count-down format=" ss s"
        slot="button"
        v-if="isCountDownShow"
         :time="1000 * 60"
         @finnish="isCountDownShow=false"
         />
       <!-- 倒计时组件 -->
        <van-button v-else @click="onSendSmsCode" slot="button" size="small" type="primary">发送验证码</van-button>
      </van-field>
    </van-cell-group>
    <div class="btn-wrap">
      <van-button @click="onLogin" type="info">登录</van-button>
    </div>
    <!-- 登录列表 -->
  </div>
</template>

<script>
import { login, getSmsCode } from '../../api/user'
export default {
  name: 'loginpage',
  components: {},
  props: {},
  data () {
    return {
      user: {
        mobile: '', // 手机号
        code: '' // 验证码
      },
      isCountDownShow: false // 发送验证码倒计时 默认隐藏
    }
  },
  methods: {
    async onLogin () {
      // 1.获取表单数据
      const user = this.user
      // 2.表单验证
      // 表单验证通过,开始转圈
      this.$toast.loading({
        duration: 0, // 持续时间，0表示持续展示不停止
        forbidClick: true, // 是否禁止背景点击
        message: '登录中...' // 提示消息
      })
      // 3.请求提交
      try {
        const res = await login(user)
        // 提示登陆成功
        this.$toast.success('登陆成功')
        console.log('登录成功', res)
      } catch (err) {
        console.log('登录失败', err)
        this.$toast.fail('登录失败')
      }
    },
    async onSendSmsCode () {
      // 1.获取手机号
      const { mobile } = this.user
      // 2校验手机号
      // 3.发送验证码
      try {
        // 显示倒计时
        this.isCountDownShow = true
        await getSmsCode(mobile)
      } catch (err) {
        // 发送失败关闭倒计时
        this.isCountDownShow = false

        // 判断状态码
        if (err.response.status === 429) {
          this.$toast('请勿频繁发送')
          return
        }
        this.$toast('发送失败')
      }
    }
  }
}
</script>

<style scoped lang="less">
.btn-wrap {
  padding: 27px 16px;
  .van-button {
    width: 100%;
    background: #6db4fb;
    border-radius: 3px;
  }
}
</style>
