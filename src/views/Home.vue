<template>
  <div class="w-full h-full bg-gradient-to-l from-gray-900 via-black to-pink-900">
    <Swiper :list =movieList type='POPULAR' link='movie' v-if="show === 'movie'"/>
    <Swiper :list =tvList type='POPULAR' link='tv' v-if="show === 'tv'" />

    <div class="btn-container mt-36 px-10 flex flex-wrap justify-center md:mt-5">
         <button class="movie-btn block w-99  mr-10 p-3 border-2 border-solid  text-center text-xl text-white tracking-widest font-semibold transition transform duration-500 hover:scale-90 md:w-full xl:mr-0 xl:mb-8" @click="show ='movie'">MOVIE</button>
         <button class="tv-btn block w-99  p-3 border-2 border-solid  text-center text-xl text-white tracking-widest font-semibold transition transform duration-500 hover:scale-90 md:w-full" @click="show ='tv'">TV SHOWS</button>
      </div>
     <Movie v-if="show === 'movie'" />
     <TV v-if="show === 'tv'" />

  </div>  
</template>

<script>
import Swiper from '@/components/Swiper' 
import Movie from '@/components/Home-movie'
import TV from '@/components/Home-TV'
import { mapGetters } from 'vuex'
export default {
  components: {
    Swiper,Movie,TV
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
  data () {
    return {
      movieList:[],
      tvList:[],
      show:''
    }
  },
  async created(){  
     try {
       this.loading = true
       const { data: { results } } = await this.$axios.get(`${process.env.VUE_APP_BASEURL}/movie/popular?api_key=${process.env.VUE_APP_KEY}&language=en-US&page=1`)
     
       this.movieList = results

       const { data: { results:tv } } = await this.$axios.get(`${process.env.VUE_APP_BASEURL}/tv/popular?api_key=${process.env.VUE_APP_KEY}&language=en-US&page=1`)

       this.tvList = tv
       this.show ='tv'  
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
  .movie-btn {
   border-image: linear-gradient(45deg, rgb(240, 198, 121), rgb(80, 5, 21)) 1;
}    
 .tv-btn {
   border-radius: 100px;
   border-image: linear-gradient(45deg, rgb(160, 9, 122), rgb(80, 5, 21)) 1;
}    

</style>