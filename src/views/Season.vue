<template>
  <div class="wrapper w-full">
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
             @rating-selected ='epRating(rating)'
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
     <section class=" mt-16 w-4/5 mx-auto pb-6">
       
       <div class="ep-container flex flex-col justify-center items-center">
         <h3 class="text-white text-5xl mb-1 tracking-wider ">EP</h3>
         <!--choose-->
         <div class="choose flex flex-wrap w-4/5 mx-auto">

          <div v-for='count in epTotal' :key='count' class="ep text-center m-3">
              <button class="text-white text-xl border-2 border-solid border-yellow-200 rounded-xl p-2 block w-20 md:w-full" @click='setEp(count)'>{{count}}</button>
            </div>
          
            </div> <!--choose-->
         </div> <!--ep-container -->     
     </section>
     <!--choose ep-->

     <!--cast & overview-->
     <section class="cast_overview w-full">
       <div class="container w-120 mx-auto p-16 md:w-full">

      <!--overview-->
      <div class="overview rounded-xl bg-gradient-to-r from-green-900 mt-5 my-20 p-8 ">
      <h3 class="tracking-widest text-3xl font-bold text-white pb-5 md:text-xl">OVERVIEW</h3>
      <p class="leading-7 text-white">{{overview}}</p>
    </div>
    <!--overview-->

     <!--cast-->
     <div class="cast">
       <h3 class="text-white tracking-widest text-3xl font-bold pb-5 px-5 md:text-xl">CAST</h3>
       <MultiSlide :cast=filter_cast /> 
    </div> 
    <!--cast-->

    </div>
    <!--container-->
     </section>
     <!--cast & overview-->

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import StarRating from 'vue-star-rating'
import MultiSlide from '@/components/MultiSlide'
import scrollReveal from 'scrollreveal'
export default {
  components: {
    MultiSlide,StarRating
   },
  data() {
    return {
      scrollReveal: scrollReveal(),
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
      async setEp(ep) {
        try {
            this.loading = true
            
            const { data: { air_date,episode_number, name, overview,still_path,vote_average, credits: {cast} }} = await this.$axios.get(`${process.env.VUE_APP_BASEURL}/tv/${this.id}/season/${this.num}/episode/${ep}?api_key=${process.env.VUE_APP_KEY}&append_to_response=credits`)

            this.date = air_date
            this.epNum = episode_number
            this.epName = name
            this.overview = overview
            this.backdrop = still_path
            this.score = vote_average
            this.castList = cast

            this.loading = false
         }catch(err) {
            this.loading = false
            if(err.response) {
              this.$notify({
               group:'alert',
               title:'<h1>OH NO!</h1>',
               text:'<h1>SOMETHING WRONG!</h1>'
             })
           }
         }
      },
    async epRating(rating) {
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
           await this.$axios.post(`${process.env.VUE_APP_BASEURL}/tv/${this.id}/season/${this.num}/episode/${this.epNum}/rating?api_key=${process.env.VUE_APP_KEY}&guest_session_id=${this.$store.state.guest_session_id}`, { 'value':rating } )

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
    },
    filter_cast() {
       let filter = [];
       this.castList.forEach(i=> {
         if(i.popularity > 3)  filter.push(i)       
      })
      return filter  
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
  h2,h3{
    font-family: 'Eagle Lake', cursive;
  }
  .choose {
    // max-width: 1300px;
    .ep {
     width: 13%;
  }
  }
  
</style>