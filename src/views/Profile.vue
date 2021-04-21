<template>
  <div class="wrapper w-full py-20">
    <section class="rated-movie p-20">

    <!--if ratedMovies.length-->
     <div v-if='ratedMovies.length'>
       <div v-for='(movie,i) in ratedMovies' :key="i"  class="w-44 text-center">
         <router-link :to='`/details/movie/${movie.id}`' class="overflow-hidden">
         <img :src='`https://image.tmdb.org/t/p/w185/${movie.poster_path}`' alt="No Image :(" class="rounded-xl w-full h-64">
         </router-link>
        <h5 class="text-center pt-2 font-bold tracking-widest">{{movie.title}}</h5>
        <span class="tag text-white px-3 font-bold align-middle">
          <box-icon name='star' type='solid' flip='horizontal' animation='spin' color='#f4ec15' class="align-middle pr-2" ></box-icon>{{movie.vote_average}}
        </span>
      </div>
     </div> 
     <!--if ratedMovies.length-->

     <!--if !ratedMovies.length-->
     <div v-if='!ratedMovies.length'>
       <p class="text-white font-semibold text-3xl">You have not rated any movies!</p>
     </div>
     <!--if !ratedMovies.length-->


    </section>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      guestId:'',
      ratedMovies:[]
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
     console.log('test profikle')
     try {
       this.loading = true
       this.id  = this.$store.state.guest_session_id
       console.log(this.$store.state.guest_session_id)
        const {data: { results } } = await this.$axios.get(`${process.env.VUE_APP_BASEURL}/guest_session/${this.id}/rated/movies?api_key=${process.env.VUE_APP_KEY}&language=en-US&sort_by=created_at.asc`)
       this.loading = false
         console.log('await')

        console.log(results)
         console.log('wait for result')
        this.ratedMovies = results
     }catch(err) {
       this.loading = false
       if(err.response) {
         alert('wrong!')
       }
     }
       

      
      // const {data: { session_id } } = await this.$axios.post(`${process.env.VUE_APP_BASEURL}/authentication/session/new?api_key=${process.env.VUE_APP_KEY}`,this.$store.state.token)

      // this.$store.commit('setSessionId', session_id)
      // console.log(this.$store.state.session_id)
   }
}
</script>

<style>

</style>