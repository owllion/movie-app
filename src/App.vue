<template>
  <div id="app" class="bg-gradient-to-r from-black to-gray-800">
    
    <Header/> 
    <Loading :active.sync="isLoading" :background-color='loadingColor' :opacity=1 >    
      <BreedingRhombusSpinner
      :animation-duration="700" :size="80" color="#c38022"
      />
    </Loading>   
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
}
</script>

<style>
#app {
  /* background: rgb(37, 36, 38); */
  font-family:'Varela Round', sans-serif;
}

</style>
