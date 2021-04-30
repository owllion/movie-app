<template>
  <div id="app" class="bg-gradient-to-r from-black to-gray-800" v-cloak>
    
    <Header/> 
    <SideNav/>
    <SearchBox/>
    <Loading :active.sync="isLoading" background-color='#000' :opacity=1 >    
    <div id="lottie" ref='lottieBox' class="w-36 h-36"></div>
    </Loading>

    <notifications group="alert"/>   
    <vue-page-transition name="fade-in-right">
    <router-view/>
    </vue-page-transition>
  </div>
</template>

<script>
import lottie from 'lottie-web'
import loadingJson from '@/assets/loading.json'

import { mapGetters } from 'vuex'
import Header from '@/components/Header'
import SideNav from '@/components/SideNav'
import SearchBox from '@/components/SearchBox'
export default {
   components: {
     Header,
     SideNav,
     SearchBox
   },
    computed: {
    ...mapGetters(['isLoading',]),
    
  },
  created() {
    this.$store.commit('setLoading',false)
    this.$store.commit('setGuestId', '')
  },
   mounted() { 
      const lottieSvg =lottie.loadAnimation({
      wrapper:this.$refs.lottieBox,
      animType: 'svg',
      loop: true,
      animationData: loadingJson,
      prerender: true,
      autoplay: true
    })
    lottieSvg.setSpeed(1) 
   }
}
</script>

<style lang="scss" scoped>
[v-cloak] {
display: none;
}
#app {
  font-family:'Varela Round', sans-serif;
}
 .vue-notification  {
    padding: 3rem  !important;
    font-size: 3rem !important;
    font-family: 'Eagle Lake', cursive;
    line-height: 1.8;
  }
  
</style>
