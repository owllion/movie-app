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
      guest_session_id:'',
      showNav:false,
      showSearch:false
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
      setGuestId(state, value) {
        state.guest_session_id = value
      },
      setNav(state, value) {
        state.showNav = value
      },
      setSearch(state, value) {
        state.showSearch = value
      }
    },
    actions: {},
    getters: {
      isLoading: state => state.isLoading,
      showNav: state => state.showNav,
      showSearch: state => state.showSearch
    },
    plugins: [vuexLocalStorage.plugin]
  })
  
 export default store

 

  
