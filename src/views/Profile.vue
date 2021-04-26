<template>
  <div class="wrapper w-full  h-full pt-20 pb-64 bg-black">
    <section class="p-20" >
     <div class="mb-12">
    <Rated :list=ratedMovies type='Movie' link='movie' />
    </div>

    <div>
    <Rated :list=ratedTv type='TV Shows' link='tv' />
    </div>

   </section>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Rated from '@/components/Rated'
export default {
  components: {
    Rated
  },
  data() {
    return {
      guestId:'',
      ratedMovies:[],
      ratedTv:[],
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

        const {data: { results: ratedTv } } = await this.$axios.get(`${process.env.VUE_APP_BASEURL}/guest_session/${this.id}/rated/tv?api_key=${process.env.VUE_APP_KEY}&language=en-US&sort_by=created_at.asc`)
       
       this.ratedMovies = results
       this.ratedTv = ratedTv
    
       this.loading = false
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