<template>
<div class="wrapper">

  <div class="container w-120 mx-auto p-16 xl:w-full">
    <div class="upcoming mb-8">
      <div class="flex flex-wrap items-center justify-between">
        <h3 class="tracking-widest p-3 mb-5 text-3xl font-semibold  text-white md:text-xl md:mb-0 md:text-center md:w-full md:tracking-wider">UPCOMING</h3>

        <router-link to="/list/movie/upcoming/UPCOMING" class="text-white text-xl block md:w-full md:text-center p-3 border-2 border-solid border-green-700  md:mb-10">See More<box-icon name='right-arrow-alt' type='solid' animation='burst' color='#fff' class="align-text-bottom ml-2"></box-icon></router-link>
        
        </div>
      
            <MultiSlide :list=upcomingList link='movie' /> 
    </div>

     <div class="nowplaying mb-8">
       <div class="flex flex-wrap items-center justify-between">
        <h3 class="tracking-widest p-3 mb-5 text-3xl font-semibold  text-white md:text-xl md:mb-0 md:text-center md:w-full md:tracking-wider">NOW PLAYING</h3>

        <router-link to="/list/movie/now_playing/NOW PLAYING" class="text-white text-xl block md:w-full md:text-center p-3 border-2 border-solid border-green-700  md:mb-10">See More<box-icon name='right-arrow-alt' type='solid' animation='burst' color='#fff' class="align-text-bottom ml-2"></box-icon></router-link>
        
        </div>
      
            <MultiSlide :list=nowPlayingList link='movie' /> 
    </div>
     <div class="toprated">
       <div class="flex flex-wrap items-center justify-between">
        <h3 class="tracking-widest p-3 mb-5 text-3xl font-semibold  text-white md:text-xl md:mb-0 md:text-center md:w-full md:tracking-wider">TOP RATED</h3>

        <router-link to="/list/movie/top_rated/TOP RATED" class="text-white text-xl block md:w-full md:text-center p-3 border-2 border-solid border-green-700  md:mb-10">See More<box-icon name='right-arrow-alt' type='solid' animation='burst' color='#fff' class="align-text-bottom ml-2"></box-icon></router-link>
        
        </div>
            <MultiSlide :list=topRatedList link='movie' /> 
    </div>

  </div>

  </div>
</template>

<script>
import { getUpcoming, getNowPlaying , getMovieTopRated } from '@/api/tmdb'
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
      upcomingList:[],
      topRatedList:[],
      nowPlayingList:[],

    }
  },
  async created() {
     try {
        this.loading = true
        const {data:{results}} = await getUpcoming()
        this.upcomingList = results

        const {data:{results:top}} = await getMovieTopRated()
         this.topRatedList = top

        const {data:{results:now}} = await getNowPlaying()
        this.nowPlayingList = now  

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