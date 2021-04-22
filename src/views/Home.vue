<template>
  <div class="w-full h-full bg-gradient-to-l from-gray-900 via-black to-pink-900">
    <Swiper :list = list  type='POPULAR' />

    <div class="btn-container mt-36 px-10 flex flex-wrap justify-center">
         <button class="movie-btn block w-99  mr-10 p-3 border-2 border-solid  text-center text-xl text-white tracking-widest font-semibold transition transform duration-500 hover:scale-90 md:w-full xl:mr-0 xl:mb-8">MOVIE</button>
         <button class="tv-btn block w-99  p-3 border-2 border-solid  text-center text-xl text-white tracking-widest font-semibold transition transform duration-500 hover:scale-90 md:w-full">TV SHOWS</button>
      </div>
     <Movie />

  </div>  
</template>

<script>
import Swiper from '@/components/Swiper' 
import Movie from '@/components/Home-movie'
export default {
  components: {
    Swiper,Movie
  },
  data () {
    return {
      list:[],
    }
  },
  async created(){ 
    console.log(`這是訪客id-->${this.$store.state.guest_session_id}`)
    
     const { data: {results} } = await this.$axios.get(`${process.env.VUE_APP_BASEURL}/movie/popular?api_key=${process.env.VUE_APP_KEY}&language=en-US&page=1`)
     
     console.log(results)
     this.list = results

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