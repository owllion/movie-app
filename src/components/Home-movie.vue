<template>
<div class="wrapper">

  <div class="container w-120 mx-auto p-16 md:w-full">
    <div class="upcoming mb-8">
      <h3 class="tracking-widest p-3 mb-5 text-3xl font-semibold  text-white md:text-sm md:text-center">UPCOMING</h3>
            <MultiSlide :list=upcomingList link='movie' /> 
    </div>

     <div class="nowplaying mb-8">
       <h3 class="tracking-widest p-3 mb-5 text-3xl font-semibold text-white md:text-sm md:text-center">NOW PLAYING</h3>
            <MultiSlide :list=nowPlayingList link='movie' /> 
    </div>
     <div class="toprated">
       <h3 class="tracking-widest p-3 mb-5 text-3xl font-semibold text-white md:text-sm md:text-center">TOP RATED</h3>
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