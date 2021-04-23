<template>
  <div class="wrapper w-full py-20 bg-gradient-to-b from-black via-gray-700 to-blue-900">
    <section class="rated-movie p-20">
     <h3 class="text-3xl tracking-widest text-white p-5 m-5 md:m-0 md:pb-5">Rated Movies</h3>
    <!--if ratedMovies.length-->
     <div v-if='ratedMovies.length' >
      

    <!--inner-container-->
    <div class="inner-container flex flex-wrap justify-center ">

      <!--v-for-->
       <div v-for='(movie,i) in ratedMovies' :key="i"  class="w-44 text-center m-5 md:w-full">
         <router-link :to='`/details/movie/${movie.id}`' class="overflow-hidden">
         <img :src='`https://image.tmdb.org/t/p/w185/${movie.poster_path}`' alt="No Image :(" class="rounded-xl w-full transition duration-500 transform hover:scale-105">
         </router-link>
        <h5 class="text-center pt-2 tracking-widest text-white">{{movie.title}}</h5>
        <span class="tag text-white px-3 font-bold align-middle">
          <box-icon name='star' type='solid' flip='horizontal' animation='spin' color='#f4ec15' class="align-middle pr-2" ></box-icon>{{movie.vote_average}}
        </span>
      </div>
       <!--v-for-->
    </div>
     <!--inner-container-->

    </div> 
     <!--if ratedMovies.length-->

     <!--if !ratedMovies.length-->
     <div v-if='!ratedMovies.length'>
       <p class="text-white font-semibold text-3xl pl-5 mt-6">You have not rated any movies!</p>
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
     try {
        this.loading = true
        this.id  = this.$store.state.guest_session_id
        console.log(this.$store.state.guest_session_id)

        const {data: { results } } = await this.$axios.get(`${process.env.VUE_APP_BASEURL}/guest_session/${this.id}/rated/movies?api_key=${process.env.VUE_APP_KEY}&language=en-US&sort_by=created_at.asc`)

         this.loading = false
         
        console.log(results)
        this.ratedMovies = results
     }catch(err) {
       this.loading = false
       if(err.response) {
         this.$notify({
           type:'error',
           title:"<h1>OH NO!</h1>",
           text:"<h2>Something wrong!</h2>"
         })
       }
     }
   }
}
</script>

<style lang="scss" scoped>
$neon-text:#16c7a1;
$neon-border:#086830;
 h3 {
      font-family: 'Eagle Lake', cursive;
      border: 2px solid #fff;
      border-radius: 10px;
      animation: flicker 1.5s infinite alternate;     
}

@keyframes flicker { 
    0%, 19%, 21%, 23%, 25%, 54%, 56%, 100% {  
       
         text-shadow:
          -1px -1px 5px $neon-text,  
           1px -1px 5px $neon-text,
           -1px 1px 5px $neon-text,
            1px 1px 5px $neon-text;

         box-shadow:
            0 0 .5rem $neon-border,
            inset 0 0 .7rem $neon-border,
            0 0 2rem $neon-border,
            inset 0 0 2rem $neon-border,
            0 0 4rem $neon-border,
            inset 0 0 4rem $neon-border;        
    }
    
    20%, 24%, 55% {        
       text-shadow: none;
        box-shadow: none;
    }    
}  

</style>