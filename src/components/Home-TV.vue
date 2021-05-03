<template>
<div class="wrapper">

  <div class="container w-120 mx-auto p-16 xl:w-full">
    <div class="air mb-8">
      <div class="flex flex-wrap items-center justify-between mb-5">
        <h3 class="tracking-widest p-3 text-3xl font-semibold  text-white md:text-xl md:text-center md:w-full md:tracking-wider">AIRING TODAY</h3>

        <router-link to="/list/tv/airing_today/AIRING TODAY" class="text-white text-xl block md:w-full md:text-center p-2 border-b-2 md:border-2 border-solid border-green-700  md:mb-10">See More<box-icon name='right-arrow-alt' type='solid' animation='burst' color='#fff' class="align-text-bottom ml-2"></box-icon></router-link>
      </div>
            <MultiSlide :list=airingTodayList link='tv' /> 
    </div>

     <div class="onair mb-8">
       <div class="flex flex-wrap items-center justify-between mb-5">
        <h3 class="tracking-widest p-3 text-3xl font-semibold  text-white md:text-xl md:text-center md:w-full md:tracking-wider">ON THE AIR</h3>

        <router-link to="/list/tv/on_the_air/ON THE AIR" class="text-white text-xl block md:w-full md:text-center p-2 border-b-2 md:border-2 border-solid border-green-700  md:mb-10">See More<box-icon name='right-arrow-alt' type='solid' animation='burst' color='#fff' class="align-text-bottom ml-2"></box-icon></router-link>
      </div>
            <MultiSlide :list=onAirList link='tv' /> 
    </div>
     <div class="toprated">
       <div class="flex flex-wrap items-center justify-between mb-5">
        <h3 class="tracking-widest p-3 text-3xl font-semibold  text-white md:text-xl md:text-center md:w-full md:tracking-wider">TOP RATED</h3>

        <router-link to="/list/tv/top_rated/TOP RATED" class="text-white text-xl block md:w-full md:text-center p-2 border-b-2 md:border-2 border-solid border-green-700  md:mb-10">See More<box-icon name='right-arrow-alt' type='solid' animation='burst' color='#fff' class="align-text-bottom ml-2"></box-icon></router-link>
      </div>
            <MultiSlide :list=topRatedList link='tv' /> 
    </div>

  </div>

  </div>
</template>

<script>
import { getAirToday, getOnAir , getTvTopRated } from '@/api/tmdb'
import MultiSlide from '@/components/MultiSlide'
import { mapGetters } from 'vuex'
export default {
   components: {
    MultiSlide
  },
  computed: {
    ...mapGetters(['isLoading']),
    loading: {
      get() {
         return this.isLoading
      },
      set(value) {
        return this.$store.commit('setLoading', value)
      }
    },
  },
  data() {
    return {
      airingTodayList:[],
      topRatedList:[],
      onAirList:[],

    }
  },
  async created() {
     try {
        this.loading = true

        const {data:{ results } } = await getAirToday()
        this.airingTodayList = results

        const {data:{ results:top } } = await getTvTopRated()
        this.topRatedList = top

        const {data:{ results:onair } } = await getOnAir()
        this.onAirList = onair

        this.loading = false
     }catch(err) {
        this.loading = false
        if(err.response) {
         this.$notify({
           group:'alert',
           type:'error',
           title:'<h1>Oops!</h1>',
           text:'something wrong!'
         })
       }
     }
  }
}
</script>

<style lang="scss" scoped>

h3 {
  letter-spacing: .8rem;
}

</style>