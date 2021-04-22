<template>
  <div class="wrapper w-full py-20">
    <section class="search-results p-20">

    <!--if results.length-->
     <div v-if='results.length'>
       <div v-for='(result,i) in results' :key="i"  class="w-44 text-center">
         <router-link :to='`/details/movie/${result.id}`' class="overflow-hidden">
         <img :src='`https://image.tmdb.org/t/p/w185/${result.poster_path}`' alt="No Image :(" class="rounded-xl w-full h-64">
         </router-link>
        <h5 class="text-center pt-2 font-bold tracking-widest">{{result.title}}</h5>
        <span class="tag text-white px-3 font-bold align-middle">
          <box-icon name='star' type='solid' flip='horizontal' animation='spin' color='#f4ec15' class="align-middle pr-2" ></box-icon>{{result.vote_average}}
        </span>
      </div>
     </div> 
     <!--if results.length-->

     <!--if !results.length-->
     <div v-if='!results.length'>
       <p class="text-white font-semibold text-3xl">The resource you requested could not be found:(</p>
     </div>
     <!--if !results.length-->


    </section>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      results:[],
      keyword:''
    }
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
   async created() {
     try {
        this.loading = true
        this.keyword = this.$route.params.keyword

        const {data: { results } } = await this.$axios.get(`${process.env.VUE_APP_BASEURL}/search/multi?api_key=${process.env.VUE_APP_KEY}&language=en-US&query=${this.keyword}&page=1&include_adult=false`)
          
        this.loading = false
         
        console.log(results)
        this.results = results
     }catch(err) {
       this.loading = false
       if(err.response) {
         alert('wrong!')
       }
     }
   }
}
</script>

<style>

</style>