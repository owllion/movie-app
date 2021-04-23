<template>
<div class="wrapper">

  <div class="container w-120 mx-auto p-16 md:w-full">
    <div class="upcoming mb-8">
      <h3 class="tracking-widest p-3 mb-5 text-3xl font-semibold  text-white md:text-sm md:text-center">UPCOMING</h3>
            <MultiSlide :list=upcomingList /> 
    </div>

     <div class="nowplaying mb-8">
       <h3 class="tracking-widest p-3 mb-5 text-3xl font-semibold text-white md:text-sm md:text-center">NOW PLAYING</h3>
            <MultiSlide :list=nowPlayingList /> 
    </div>
     <div class="toprated">
       <h3 class="tracking-widest p-3 mb-5 text-3xl font-semibold text-white md:text-sm md:text-center">TOP RATED</h3>
            <MultiSlide :list=topRatedList /> 
    </div>

  </div>

  </div>
</template>

<script>
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
        const {data:{results}} = await this.$axios.get(`${process.env.VUE_APP_BASEURL}/movie/upcoming?api_key=${process.env.VUE_APP_KEY}&language=en-US&page=1`)

        this.upcomingList = results

        const {data:{results:top}} = await this.$axios.get(`${process.env.VUE_APP_BASEURL}/movie/top_rated?api_key=${process.env.VUE_APP_KEY}&language=en-US&page=1`)

         this.topRatedList = top

        const {data:{results:now}} = await this.$axios.get(`${process.env.VUE_APP_BASEURL}/movie/now_playing?api_key=${process.env.VUE_APP_KEY}&language=en-US&page=1`)

        this.nowPlayingList = now  

        this.loading = false
     }catch(err) {
        this.loading = false
        if(err.response) {
         this.$notify({
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