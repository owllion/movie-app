<template>
  <div>
    <Swiper/>
     <button @click='getInfo()'>test</button>
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
      list:[]
    }
  },
  methods: {
    setLang (value) {
      this.$store.commit('setLang', value);
      this.$i18n.locale = value;
      localStorage.setItem('lang', value);
    },
    async getInfo() {
    const baseUrl  = 'https://api.themoviedb.org/3'
     const {data: {results}}= await this.$axios.get(`${baseUrl}/movie/popular?api_key=64a181c4f1c07039374331f8479761ba&language=en-US&page=1`)
     console.log(results)
     this.list = results
    }
  }
}
</script>
<style lang="scss" scoped>
     

</style>