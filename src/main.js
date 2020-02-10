import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'amfe-flexible'
// 注册vant 组件
import './utils/register-vant'

// 加载自定义样式
// 该样式文件要放在第三方样式之后
import './styles/index.less'

// 加载注册表单验证插件 初始化配置项
import './utils/validation'
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
