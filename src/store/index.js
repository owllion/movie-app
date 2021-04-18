import Vue from 'vue'
import Vuex from 'vuex'

import VuexPersist from 'vuex-persist'
Vue.use(Vuex)

const vuexLocalStorage = new VuexPersist({
  storage: window.localStorage, 
})

const store = new Vuex.Store({
    state: {
      lang: null 
    },
    mutations: {    
      setLang (state, value) {
        state.lang = value;
      }
    },
    actions: {},
    modules: {},
    plugins: [vuexLocalStorage.plugin]
  })
  
 export default store

 

  
