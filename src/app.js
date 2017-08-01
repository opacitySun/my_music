/**
 * 创建入口文件
 *
 * Created by sunbowei on 17-1-7.
 */

import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import JqueryWeui from 'jquery-weui/dist/js/jquery-weui.min.js';
import Routes from './routes';
import App from './app.vue';
import Store from './vuex/store';
import Global from './js/global';

Vue.use(VueRouter);
Vue.use(VueResource);

Vue.config.debug = true;

const router = new VueRouter(Routes);

//new Vue({router: router}).$mount('#app');
new Vue({
    el: '#app',
    JqueryWeui,
    Global,
    Store,
    router: router,
    render: h => h(App)
});