import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 加载全局样式
import '@/styles/index.css'

// 导入字体图标
import '@/assets/fonts/iconfont.css'

// 导入vant组件
import Vant from 'vant'
import 'vant/lib/index.css'

// 加载动态设置rem基准值
import 'amfe-flexible'

Vue.use(Vant)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
