<template>
  <div class="w-full h-full bg-black">
    <Swiper :list = list  type='LATEST' />
     <div v-for='(item,i) in list' :key='`${item}${i}`'>
       <div class="text-center">
         <router-link :to='`/details/movie/${item.id}`'>
         <img :src='`https://image.tmdb.org/t/p/w200/${item.poster_path}`' alt="">
         </router-link>
        <h5>{{item.title}}</h5>
        <span>{{item.vote_average}}</span>
       </div>
     </div>

  </div>  
</template>

<script>
import Swiper from '@/components/Swiper' 
export default {
  components: {
    Swiper
  },
  data () {
    return {
      keywords:'',
      list:[],
    }
  },
  async created(){  
     const { data: {results} } = await this.$axios.get(`${process.env.VUE_APP_BASEURL}/movie/popular?api_key=${process.env.VUE_APP_KEY}&language=en-US&page=1`)
     
     console.log(results)
     this.list = results

  }
}
</script>
<style lang="scss" scoped>
     

</style>