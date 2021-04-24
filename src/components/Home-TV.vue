<template>
<div class="wrapper">

  <div class="container w-120 mx-auto p-16 md:w-full">
    <div class="upcoming mb-8">
      <h3 class="tracking-widest p-3 mb-5 text-3xl font-semibold  text-white md:text-sm md:text-center">AIRING TODAY</h3>
            <MultiSlide :list=airingTodayList link='tv' /> 
    </div>

     <div class="nowplaying mb-8">
       <h3 class="tracking-widest p-3 mb-5 text-3xl font-semibold text-white md:text-sm md:text-center">ON THE AIR</h3>
            <MultiSlide :list=onAirList link='tv' /> 
    </div>
     <div class="toprated">
       <h3 class="tracking-widest p-3 mb-5 text-3xl font-semibold text-white md:text-sm md:text-center">TOP RATED</h3>
            <MultiSlide :list=topRatedList link='tv' /> 
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
      airingTodayList:[],
      topRatedList:[],
      onAirList:[],

    }
  },
  async created() {
     try {
        this.loading = true
        const {data:{results}} = await this.$axios.get(`${process.env.VUE_APP_BASEURL}/tv/airing_today?api_key=${process.env.VUE_APP_KEY}&language=en-US&page=1`)
  
        this.airingTodayList = results

        const {data:{results:top}} = await this.$axios.get(`${process.env.VUE_APP_BASEURL}/tv/top_rated?api_key=${process.env.VUE_APP_KEY}&language=en-US&page=1`)
     
         this.topRatedList = top

        const {data:{results:onair}} = await this.$axios.get(`${process.env.VUE_APP_BASEURL}/tv/on_the_air?api_key=${process.env.VUE_APP_KEY}&language=en-US&page=1`)

        this.onAirList = onair

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