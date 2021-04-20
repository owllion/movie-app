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
      isLoading:false 
    },
    mutations: {    
      setLang (state, value) {
        state.lang = value;
      },
      setLoading (state, value) {
        state.isLoading = value
      }
    },
    actions: {},
    getters: {
      isLoading: state => state.isLoading
    },
    plugins: [vuexLocalStorage.plugin]
  })
  
 export default store

 

  
