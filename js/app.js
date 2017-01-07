/**
 * 创建入口文件
 *
 * Created by sunbowei on 17-1-7.
 */

import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);
Vue.config.debug = true;
Vue.config.delimiters = ['${', '}']; // 把默认的{{ }} 改成ES6的模板字符串 ${ }
Vue.config.devtools = true;

var App = Vue.extend({});
var router = new VueRouter({});

router.map(require('./routes'));
router.start(App, '#app');
router.go({"path":"/"});