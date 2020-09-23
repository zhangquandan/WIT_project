import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Echarts from 'echarts'
import store from './store'

Vue.prototype.echarts = Echarts
Vue.use(Echarts)
Vue.use(ElementUI);
Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
