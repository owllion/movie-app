<template>
  <div id="app" class="bg-gradient-to-r from-black to-gray-800" v-cloak>
    
    <Header/> 
    <Loading :active.sync="isLoading" :background-color='loadingColor' :opacity=1 >    
      <BreedingRhombusSpinner
      :animation-duration="700" :size="80" color="#c38022"
      />
    </Loading>
    <notifications group="foo"/>   
    <vue-page-transition name="fade-in-right">
    <router-view/>
    </vue-page-transition>
  </div>
</template>

<script>
import { BreedingRhombusSpinner } from 'epic-spinners'
import { mapGetters } from 'vuex'
import Header from '@/components/Header'
export default {
   components: {
     Header,
     BreedingRhombusSpinner
   },
    computed: {
    ...mapGetters(['isLoading']),
    
  },
  data() {
    return {
      loadingColor:'#000000'
    }
  },
  created() {
    this.$store.commit('setLoading',false)
  }
}
</script>

<style lang="scss" scoped>
[v-cloak] {
display: none;
}
#app {
  height: 100%;
  font-family:'Varela Round', sans-serif;
}

   .vue-notification  {
    padding: 3rem  !important;
    font-size: 3rem !important;
    font-family: 'Eagle Lake', cursive;
    line-height: 1.8;
  }
  
</style>
