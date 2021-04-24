<template>
  <div class="wrapper text-white">

    <!--movie-img-->
    <section class="relative movie-img overflow-hidden w-full h-screen pb-10 md:h-auto md:pb-0"> 
      <div class="backdrop w-full h-full absolute top-0 left-0 z-10 pointer-events-none"></div> 

     <!--back icon-->
      <div class="back-icon absolute left-28 top-36 z-10 cursor-pointer md:hidden">
        <a @click="$router.go(-1)"><box-icon name='chevron-left' type='solid' flip='vertical' color='#ffffff' size='lg'></box-icon>
        </a>
      </div>
      <!--back icon-->
      
   <div  class="relative">
     <img class="swiper-img w-full h-full object-cover md:w-full " :src="`https://image.tmdb.org/t/p/w1280/${backdrop}`"/> 

      <p class="tagline text-white text-5xl absolute z-10 top-80 left-28 md:text-xl md:top-24 md:left-24 xs:text-lg xs:top-1/2 xs:left-10">{{tagline}}</p> 

      <!--movie-info-->
      <div class="movieInfo sm:hidden absolute p-10 z-10 text-white bottom-48 left-20 md:top-48 md:left-10 flex items-center"> 
       <!--left-->
          <div class="left mr-10 xs:hidden w-36">
            <img :src="`https://image.tmdb.org/t/p/w185/${poster}`" alt="poster" class="w-full h-full object-cover rounded-xl">
            
          </div>
        <!--left-->
        <!--right-->
         <div class="right xs:-mt-36">
          <div class="title_rating">
           <h2 class="font-base text-3xl tracking-wider md:text-xl md:pb-2">{{title}}</h2>
           <span class="score">Rating 
             <span :class="`${getColor(score)}`">{{score}}</span>
             </span> 
             <StarRating 
             :increment="0.5"
             :max-rating="10"
             inactive-color="#fff"
             active-color="#f6bb32"
             :star-size="10"
             v-model='rating'
             @rating-selected ='movieRating(rating)'
              />
             </div>

             <p>{{status}} | <span class="uppercase">{{lang}}</span> </p>
             <p>{{ filter_genres }}</p>
             <p>{{ release_date }}</p>
             </div>
             <!--right-->      
         </div>
         <!--movie-info-->
     </div>  
     </section>   
    <!--movie-img-->
     
  
   <!--mobile-info-->
       <!--movie-info-->
      <div class="mobileInfo movieInfo  p-10  text-white flex items-center justify-center "> 
       <!--left-->
          <div class="left">
            <img :src="`https://image.tmdb.org/t/p/w185/${poster}`" alt="poster" class="w-full h-full object-cover rounded-xl">
            
          </div>
        <!--left-->
        <!--right-->
         <div class="right rounded-xl bg-gradient-to-l from-yellow-800 via-red-700  p-5 mt-6">
          <div class="title_rating text-center">
           <h2 class="font-base text-3xl tracking-widest sm:my-5 sm:text-xl sm:font-bold">{{title}}</h2>
           <span class="score">Rating 
             <span :class="`${getColor(score)}`">{{score}}</span>
             </span>
             <!--rating-component--> 
             <div class="flex justify-center">
             <StarRating 
             :increment="0.5"
             :max-rating="10"
             inactive-color="#fff"
             active-color="#f6bb32"
             :star-size="10"
             v-model='rating'
             @rating-selected ='movieRating(rating)'
              />
              </div>
           <!--rating-component-->
             </div>

             <p class="text-center">{{status}} | <span class="uppercase">{{lang}}</span> </p>
             <p class="text-center">{{ filter_genres }}</p>
             <p class="text-center">{{ release_date }}</p>
             </div>
             <!--right-->      
         </div>
         <!--movie-info-->
    <!--mobile-info-->

    <div class="container w-120 mx-auto p-16 md:w-full">
    <!--overview-->
    <div class="overview rounded-xl bg-gradient-to-r from-green-900 my-24 p-8 md:my-5">
    <h3 class="tracking-widest text-3xl font-bold text-white pb-5 md:text-xl">OVERVIEW</h3>
    <p class="leading-7">{{overview}}</p>
    <div class="imdb-link flex justify-end pt-8">
    <a :href="`http://imdb.com/title/${imbdId}`" target="_blank" class="text-center tracking-wider rounded-xl bg-green-800 text-white p-4 font-semibold duration-500 transition hover:bg-white hover:text-green-800">View On IMDb</a>
    </div>

    </div>
    <!--overview-->

     <!--cast-->
     <div class="cast">
       <h3 class="tracking-widest text-3xl font-bold pb-5 px-5 md:text-xl">CAST</h3>
       <MultiSlide :cast=filter_cast link='movie' /> 
    </div> 
    <!--cast-->

    <!--trailer-->
   <div class="trailer mt-24">
    <h3 class="tracking-widest text-3xl font-bold pb-5 px-5 md:text-xl">TRAILER</h3>
    <!--if there are trailers-->
    <div class="flex flex-wrap justify-between" v-if="videos.length">
    <div v-for="(video,i) in videos" :key="`${video}${i}`" class="mb-5">
     <video-embed css="embed-responsive-16by9" :src="`https://www.youtube.com/watch?v=${video.key}`"></video-embed>
    </div>
    </div>
    <!--if there are trailers-->

    <!--else-->
    <div v-if="!videos.length" class="pl-5">
      <p class="text-2xl md:text-xl text-white "> No trailers found.</p>   
   </div>
   <!--else-->

     </div>
     <!--trailer-->

     <!--review-->
    <div class="review-container mt-10">
      <h3 class="tracking-widest text-3xl font-bold text-white pb-5 pl-5 uppercase md:text-xl md:tracking-wide">popular reviews</h3>

      <div class="text-2xl md:text-lg text-white pl-6 " v-if='!reviewsList.length'>No reviews found.</div>

      <!--one review-->
      <div v-if='reviewsList.length'> 
      <div class="review rounded-xl bg-gradient-to-r from-purple-900 via-blue-900 to-black p-10 mb-10 overflow-hidden" v-for="(review,i) in reviewsList" :key='i' > 
        <div class="author-info w-16 flex items-center mb-5 xs:flex-col xs:w-full">
          <img :src="`https://image.tmdb.org/t/p/w185/${review.author_details.avatar_path}`"  class="block mr-5 w-full rounded-full xs:mb-5 xs:mr-0" alt="avatar">
          <h4 class="text-yellow-300 tracking-widest text-md font-bold">{{review.author}}</h4>
          </div>     
          <p class="leading-7  text-white">{{review.content}}</p>
          <div class="imdb-link flex justify-end pt-8">
          <a :href="`${review.url}`" target="_blank" class="text-center tracking-wider rounded-xl bg-blue-800 text-white p-4 duration-500 transition hover:bg-white hover:text-green-800 font-semibold">See Full Article</a>
          </div>
        </div>
       </div>
       <!--one review-->
    </div>
    <!--review-containe-->
    <!--review-->

    </div><!--container-->
    </div>
</template>

<script>
import StarRating from 'vue-star-rating'
import scrollReveal from 'scrollreveal'
import MultiSlide from '@/components/MultiSlide'
import { mapGetters } from 'vuex'
export default {
  components: {
     MultiSlide, StarRating
   },
  data() {
    return {
      scrollReveal: scrollReveal(),
      rating:0,
      movieId:'',
      id:'',
      imbdId:'',
      backdrop:'',
      title:'',
      genres:[],
      overview:'',
      poster:'',
      release_date:'',
      tagline:'',
      score:'',
      videos:[],
      cast:[],
      status:'',
      lang:'',
      reviewsList:[]
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
      console.log('tett')
      console.log(rating)
      if( !this.$store.state.guest_session_id ) {
        this.$notify({
              group:'alert',
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
              text: 'Oh<b> Yeah!</b>',
              duration: 2000,
              speed: 5000,
              width:'350px',          
        })
         }catch(err) {
           if(err.response) {
             alert('wrong')
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
    filter_genres() {
      let result = []
      if(this.genres) {
        this.genres.forEach(i=> result.push(i.name))   
      }
      const genres = result.join(" | ")
      return genres
    },
    filter_cast() {
       let filter = [];
       this.cast.forEach(i=> {
         if(i.popularity > 3)  filter.push(i)       
      })
      return filter  
    }
  },
   async created() {
     console.log(`guestid-->${this.$store.state.guest_session_id}
     `)
     this.id = this.$route.params.id

    try {
      this.loading = true
      const { data: { id,imdb_id,backdrop_path, genres ,title, overview,poster_path, release_date, tagline, vote_average, videos:{results},credits: {cast}, status,reviews:{results:reviews}, original_language } } = await this.$axios.get(`${process.env.VUE_APP_BASEURL}/movie/${this.id}?api_key=${process.env.VUE_APP_KEY}&append_to_response=videos,credits,reviews`)

      this.movieId = id
      this.imbdId = imdb_id
      this.backdrop = backdrop_path
      this.title = title
      this.overview = overview
      this.poster = poster_path
      this.release_date = release_date
      this.tagline = tagline
      this.score = vote_average
      this.videos = results
      this.genres = genres
      this.cast = cast
      this.status = status
      this.lang = original_language
      this.reviewsList = reviews
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
     
     
   },
   
mounted() {
  this.scrollReveal.reveal('.tagline', {   
    duration: 1000,   
    origin: 'top',   
    reset: true,
    mobile: true,  
    distance: '200px',
    opacity: 0.001,
    easing: 'linear',
    scale: 1.2,
  });
  // this.scrollReveal.reveal('.movieInfo', {   
  //   duration: 1000, 
  //   origin: 'left',   
  //   reset: true,
  //   mobile: true,  
  //   distance: '20%',
  //   opacity: 0,
  //   easing: 'linear',
  //   scale: 2.5,
  //  });
   this.scrollReveal.reveal('.review-container', {   
    duration: 1000, 
    origin: 'right',
    delay:200,   
    reset: false,
    mobile: true,  
    distance: '100px',
    opacity: 0,
    easing: 'linear',
   });
   this.scrollReveal.reveal('.overview', {   
    duration: 1000, 
    origin: 'left',   
    reset: false,
    mobile: true,  
    distance: '30%',
    opacity: 0,
    easing: 'linear',
    
   });
   this.scrollReveal.reveal('.cast', {   
    duration: 1000, 
    origin: 'left',
    delay:200,   
    reset: false,
    mobile: true,  
    distance: '30%',
    opacity: 0,
    easing: 'linear',
   });
   this.scrollReveal.reveal('.trailer', {   
    duration: 1000, 
    origin: 'left',
    delay:200,   
    reset: false,
    mobile: true,  
    distance: '30%',
    opacity: 0,
    easing: 'linear',
    
   });
  }
}
</script>

<style lang="scss" scoped>
$font:'Varela Round', sans-serif;
.backdrop {
    background-image: linear-gradient( rgba(0, 0, 0, 0.6)
    ,rgba(0,0,0,.5));
  }
  .tagline {
    font-family: 'Eagle Lake', cursive;
  }
  h2,h3,.movieInfo {
    font-family:$font;
  }
  .mobileInfo {
    display: none;
  }
  @media(max-width:639px) {
    .mobileInfo {
        display:block;
    }

  }
</style>