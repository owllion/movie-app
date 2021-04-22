<template>
  <div class="wrapper w-full py-20 text-white">
    <section class="search-results p-20">
    
    <div class="movie">
     <h3 class="title text-3xl tracking-widest text-white p-5 m-5 md:m-0 md:mb-8 ">Movie And TV</h3>

     <!--if 404 movieAndTv-->
     <div v-if='!movieAndTvResult.length '>
       <p class="text-white font-semibold text-3xl pl-5 md:text-2xl md:mb-5">The resource you requested could not be found <box-icon name='ghost' type='solid' color='#ffffff' class="ml-5 align-bottom" size='md' ></box-icon></p>
     </div>
     <!--if 404 movieAndTv-->

    <!--if movieAndTvResult-->  
     <div v-if='movieAndTvResult.length' class="flex flex-wrap justify-center">
       <div v-for='(result,i) in movieAndTvResult' :key="i"  class="w-44 text-center m-5 md:w-full">
         <router-link :to='`/details/movie/${result.id}`' class="overflow-hidden">
         <img :src='`https://image.tmdb.org/t/p/w185/${result.poster_path}`' alt="No Image :(" class="rounded-xl w-full">
         </router-link>
        <h5 class="text-center pt-2 font-bold tracking-widest">{{result.title}}</h5>
        <span class="tag text-white px-3 font-bold align-middle">
          <box-icon name='star' type='solid' flip='horizontal' animation='spin' color='#f4ec15' class="align-middle pr-2" ></box-icon>{{result.vote_average}}
        </span>
      </div>
     </div> 
     <!--if movieAndTvResult.length-->
     </div>
     <!--movie-->
     
     <!--people-->
     <div class="people">
     <h3 class="title text-3xl tracking-widest text-white p-5 m-5 md:m-0 md:mb-8 ">People</h3>
     <!--if 404 people -->
     <div v-if='!peopleResult.length'>
       <p class="text-white font-semibold text-3xl pl-5 md:text-2xl">
         No matching results
         <box-icon name='dizzy' type='solid' animation='spin' flip='horizontal' color='#fff' class="ml-5 align-bottom" size='md'>        
         </box-icon>
         </p>
     </div>
     <!--if 404 people-->

    <!--if peopleResult.length-->
    <div v-if='peopleResult.length' class="flex flex-wrap justify-center">
    <div v-for='c in peopleResult' :key=c.name class="w-44 text-center m-5 md:w-full">            
      <router-link :to="`/details/people/${c.id}`">
      <img :src="`https://image.tmdb.org/t/p/original/${c.profile_path}`"  alt="No Image:(" class="rounded-xl">
      <h3 class="text-center pt-3">{{c.name}}</h3>
      </router-link>
    </div>
    </div>
    <!--if peopleResult.length-->
    </div>
    <!--people-->

    </section>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import scrollReveal from 'scrollreveal'
export default {
  data() {
    return {
      scrollReveal: scrollReveal(),
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
    peopleResult() {
      let result = []
      this.results.forEach(i=> {
        if(i.media_type === 'person') {
          result.push(i)
        }
      })
      return result
    },
    movieAndTvResult() {
      let result = []
      this.results.forEach(i=> {
        if(i.media_type === 'movie' || i.media_type === 'tv') {
          result.push(i)
        }
      })
      return result
    }
  },
  async beforeRouteUpdate (to, next) {
    const keyword = to.params.keyword
   try {
         const {data: { results } } = await this.$axios.get(`${process.env.VUE_APP_BASEURL}/search/multi?api_key=${process.env.VUE_APP_KEY}&language=en-US&query=${keyword}&page=1&include_adult=false`)

         this.results = results
        }catch(err){
          if(err.response) {
            this.$notify({
              type:'error',
              title:'<h1>OH NO!</h1>',
              text:'something wrong!'
            })
          }
        }
    next()
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
   },
mounted() {
   this.scrollReveal.reveal('.title', {   
        duration: 1000,   
        origin: 'right',   
        reset: true,
        mobile: true,  
        distance: '100px',
        opacity: 0.001,
        easing: 'linear',
        scale: 1.1,
    })
  }
}
</script>

<style lang="scss" scoped>
$neon-text:#c78c0d;
$neon-border:#0f6b50;
 .title {
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