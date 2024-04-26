/*
 * @Author: Mx
 * @Date: 2022-08-14 21:30:04
 * @Description: 
 */
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import './mock';

Vue.use(Antd);
Vue.config.productionTip = false;

// 组件库
import mxCrud from "../packages/src/index.js";
import '../packages/src/styles/index.scss';
// 调试或者自定义crud
// import mxCrud from "../packages/src/index";
Vue.use(mxCrud);

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
