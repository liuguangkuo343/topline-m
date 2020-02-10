<template>
  <div class="login-container">
    <!-- 导航栏 -->
    <van-nav-bar title="登录" />
    <!-- 导航栏 -->

    <!-- 登录表单 -->
    <!-- vee-validate 验证插件的具体使用
    1.使用ValidationObserver 把需要校验的整个表单抱起来
    2.使用validationprovider 把需要校验的具体表单元素抱起来 比如input
    3.通过validationprovider 配置具体的校验规则
    name :配置验证字段的名称
    rules : 验证规则
     rules= 'requried'  多个验证规则使用|分割
    v-slot = "{errors}" 获取错误消息 组件内部的作用域插槽
    -->
    <!-- 登录表单 -->

    <!-- 登录列表 -->
    <ValidationObserver ref="form">
      <ValidationProvider name="手机号" rules="required|mobile">
        <van-field v-model="user.mobile" clearable label="手机号" placeholder="请输入手机号"></van-field>
        <!-- errors[0] 获取验证失败的错误消息 如果没有失败就不会显示-->
        <!-- <span>{{errors[0]}}</span> -->
      </ValidationProvider>
      <ValidationProvider name="验证码" rules="required|code">
        <van-field v-model="user.code" label="验证码" placeholder="请输入验证码" required>
          <!-- 倒计时组件 -->
          <van-count-down
            format=" ss s"
            slot="button"
            v-if="isCountDownShow"
            :time="1000 * 60"
            @finnish="isCountDownShow=false"
          />
          <!-- 倒计时组件 -->
          <van-button v-else @click="onSendSmsCode" slot="button" size="small" type="primary">发送验证码</van-button>
        </van-field>
      </ValidationProvider>
    </ValidationObserver>

    <div class="btn-wrap">
      <van-button @click="onLogin" type="info">登录</van-button>
    </div>
    <!-- 登录列表 -->
  </div>
</template>

<script>
import { login, getSmsCode } from '../../api/user'
import { validate } from 'vee-validate'
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
      const success = await this.$refs.form.validate()
      // 如果验证失败,提示错误消息,停止表单提交
      if (!success) {
        setTimeout(() => {
          const errors = this.$refs.form.errors
          //   const item = Object.values(errors).find(item => {
          //     // item['错误消息']
          //     // 如如果item[0] 参与布尔运算是true 则返回该元素,停止遍历

          //     return item[0]
          //   })
          // 找到第一个有错误的字段并弹出消息
          for (let key in errors) {
            const item = errors[key]
            if (item[0]) {
              this.$toast(item[0])
              return
            }
          }
        }, 100)
        return
      }
      // 表单验证通过,开始转圈
      this.$toast.loading({
        duration: 0, // 持续时间，0表示持续展示不停止
        forbidClick: true, // 是否禁止背景点击
        message: '登录中...' // 提示消息
      })
      // 3.请求提交
      try {
        const res = await login(user)

        // 将登陆状态存储到Vuex容器中
        this.$store.commit('setUser', res.data.data)
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
      const validateResult = await validate(mobile, 'required|mobile', {
        name: '手机号'
      })
      if (!validateResult.valid) {
        this.$toast(validateResult.errors[0])
        return
      }
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
