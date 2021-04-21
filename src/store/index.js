import Vue from 'vue'
import Vuex from 'vuex'

import VuexPersist from 'vuex-persist'
Vue.use(Vuex)

const vuexLocalStorage = new VuexPersist({
  storage: window.localStorage, 
})

const store = new Vuex.Store({
    state: {
      lang: null,
      isLoading:false,
      token:'',
      session_id:'',
      guest_session_id:'',
      showNav:false
    },
    mutations: {    
      setLang (state, value) {
        state.lang = value;
      },
      setLoading (state, value) {
        state.isLoading = value
      },
      setToken(state, value) {
        state.token = value
      },
      setSessionId(state, value) {
        state.session_id = value
      },
      setGuestId(state, value) {
        state.guest_session_id = value
      },
      setNav(state, value) {
        state.showNav = value
      }
    },
    actions: {},
    getters: {
      isLoading: state => state.isLoading,
      showNav: state => state.showNav
    },
    plugins: [vuexLocalStorage.plugin]
  })
  
 export default store

 

  
