import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import axios from 'axios';
import VueAxios from 'vue-axios';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import './assets/tailwind.css';
import JwPagination from 'jw-vue-pagination';
Vue.component('jw-pagination', JwPagination);
import VueToast from 'vue-toast-notification';
import moment from 'moment'
import Embed from 'v-video-embed'
Vue.use(Embed);
import Notifications from 'vue-notification'
Vue.use(Notifications)

import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/swiper-bundle.css'
Vue.use(VueAwesomeSwiper)

import VuePageTransition from 'vue-page-transition'
Vue.use(VuePageTransition)

import VueMeta from 'vue-meta'
import Vuelidate from 'vuelidate';
import 'vue-toast-notification/dist/theme-sugar.css';
Vue.use(VueToast, {
	position: 'top'
  })
Vue.use(VueMeta)
Vue.use(Vuelidate);
Vue.use(VueAxios, axios);

Vue.component('Loading', Loading);

Vue.config.productionTip = false;
Vue.prototype.$axios = axios;
Vue.prototype.$moment = moment


router.beforeEach((to,from,next) => {
	store.commit('setNav', false)
	store.commit('setSearch', false)
	next()
})

new Vue({
	router,
	store,
	render: (h) => h(App)
}).$mount('#app');
