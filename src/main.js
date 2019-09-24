// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from './App'
import router from './router'

import '../node_modules/element-ui/lib/theme-chalk/index.css';

import ElementUI from 'element-ui';
import VueResource from "vue-resource";
import VueCookies from "vue-cookies";
import VueRouter from "vue-router";

let qiniu = require('qiniu-js')

Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use(VueResource);
Vue.use(VueCookies);
Vue.use(qiniu);

new Vue({ el: "#app", router, components: { App }, template: "<App/>" });

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(console.error);
};