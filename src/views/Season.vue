<template>
  <div class="wrapper">
    <!--ep-img-->
    <section class="relative movie-img overflow-hidden w-full h-screen pb-10 md:h-auto md:pb-0"> 
      <div class="backdrop w-full h-full absolute top-0 left-0 z-10 pointer-events-none"></div> 

     <!--back icon-->
      <div class="back-icon absolute left-28 top-36 z-10 cursor-pointer md:hidden">
        <a @click="$router.go(-1)"><box-icon name='chevron-left' type='solid' flip='vertical' color='#ffffff' size='lg'></box-icon>
        </a>
      </div>
      <!--back icon-->
      
    <!--img-->  
   <div class="relative">
     <img class="swiper-img w-full h-full object-cover md:w-full " :src="`https://image.tmdb.org/t/p/w1280/${backdrop}`"/>

      <!--info-->
      <div class="info absolute z-10 top-96 left-36 md:text-xl md:top-24 md:left-24 xs:text-lg xs:top-1/2 xs:left-10">

      <div class="nam-num">
      <h2 class=" text-white text-5xl mb-1 tracking-wider">{{epName}}</h2> 
      <p class="text-2xl text-white tracking-wide">S{{num}} | EP {{epNum}}</p>
      </div>

      <div class="title_rating">
           <span class="score text-2xl text-white tracking-wide">Rating 
             <span :class="`${getColor(score)}`">{{score}}</span>
             </span> 
             <StarRating 
             :increment="0.5"
             :max-rating="10"
             inactive-color="#fff"
             active-color="#f6bb32"
             :star-size="15"
             v-model='rating'
             @rating-selected ='movieRating(rating)'
             class="text-white"
              />
        </div>

       </div>
        <!--info-->
     </div>
     <!--img-->  
     </section>   
    <!--ep-img-->
     
     <!--choose ep-->
     <section>
       <div class="choose flex flex-wrap justify-around">
          <div v-for='count in epTotal' :key='count'>
              <button class="text-white text-xl border-2 border-solid border-yellow-200 rounded-xl p-2 w-16">{{count}}</button>
              </div>
         </div>
         
       
     </section>
     <!--choose ep-->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import StarRating from 'vue-star-rating'

export default {
  components: {
    StarRating
   },
  data() {
    return {
      rating:0,
      epTotal:'',
      id:'',
      num:'',
      date:'',
      epNum:'',
      epName:'',
      overview:'',
      backdrop:'',
      score:'',
      castList:[]
    }
  },
  methods: {
      getColor(score) {
        if(score >= 8) {
          return 'text-green-300'
        }else if (score >= 6) {
          return 'text-yellow-500'
        }else {
          return 'text-red-600'
        }
      },
    async movieRating(rating) {
      if( !this.$store.state.guest_session_id ) {
        this.$notify({
              group: 'alert',
              type: 'warn',
              text:'<h1>login please!<h1>',
              title: '<b>Oh No!</b>',
              duration: 5000,
              speed: 500 
        })
        return 
      }else {
        try {
           await this.$axios.post(`${process.env.VUE_APP_BASEURL}/movie/${this.movieId}/rating?api_key=${process.env.VUE_APP_KEY}&guest_session_id=${this.$store.state.guest_session_id}`, { 'value':rating } )

           this.$notify({
              group: 'alert',
              type: 'success',
              title:'<h1>success!</h1>',
              text: `<b>Your rating: ${rating}</b>`,
              duration: 2000,
              speed: 500,
              width:'350px',          
           })
         }catch(err) {
           if(err.response) {
            this.$notify({
              group: 'alert',
              type: 'error',
              title:'<h1>OH NO!</h1>',
              text: '<b>something wrong!</b>',
              duration: 2000,
              speed: 500,
              width:'350px',          
        })
           }
         }
        
      }
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
    }
  },
   async created() {
    
     this.id = this.$route.params.id
     this.num = this.$route.params.num

    try {
      this.loading = true
      //get season details
      const { data: { air_date,episode_number, name, overview,still_path,vote_average, credits: {cast} }} = await this.$axios.get(`${process.env.VUE_APP_BASEURL}/tv/${this.id}/season/${this.num}/episode/1?api_key=${process.env.VUE_APP_KEY}&append_to_response=credits`)

      this.date = air_date
      this.epNum = episode_number
      this.epName = name
      this.overview = overview
      this.backdrop = still_path
      this.score = vote_average
      this.castList = cast
      
      const {data: {episodes}} = await this.$axios.get(`${process.env.VUE_APP_BASEURL}/tv/${this.id}/season/${this.num}?api_key=${process.env.VUE_APP_KEY}&language=en-US`)
      this.epTotal = episodes.length 

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

.backdrop {
    background-image: linear-gradient( rgba(0, 0, 0, 0.6)
    ,rgba(0,0,0,.5));
  }
  h2,h3,h4 {
    font-family: 'Eagle Lake', cursive;
  }

</style>