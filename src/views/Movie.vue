<template>
  <div class="wrapper text-white">

    <!--movie-img-->
    <section class="relative movie-img overflow-hidden w-full h-screen pb-10"> 
      <div class="backdrop w-full h-full absolute top-0 left-0 z-10 pointer-events-none"></div> 

      <div class="back-icon absolute left-36 top-24 z-10 cursor-pointer">
        <a @click="$router.go(-1)"><box-icon name='chevron-left' type='solid' animation='tada' flip='vertical' color='#ffffff' size='lg'></box-icon>
        </a>
      </div>

      <p class="tagline text-white text-5xl absolute z-10 top-1/2 left-28 md:text-3xl md:top-64">{{tagline}}</p>

      <!--movie-info-->
      <div class="movieInfo absolute p-10 z-10 text-white bottom-24 left-20 md:top-96 md:left-20"> 

          <div class="title_rating">
           <h2 class="font-base text-3xl tracking-widest ">{{title}}</h2>
           <span class="score">Rating {{score}}</span> 
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
         </div>
         <!--movie-info-->

     <img class="swiper-img w-full " :src="`https://image.tmdb.org/t/p/w1280/${backdrop}`"/> 
     </section>  
    <!--movie-img-->

    <div class="container w-120 mx-auto p-16 md:w-full">
    <!--overview-->
    <div class="overview rounded-xl bg-gradient-to-r from-green-900 my-24 p-8">
    <h3 class="tracking-widest text-3xl font-bold text-white pb-5">OVERVIEW</h3>
    <p>{{overview}}</p>
    <div class="imdb-link flex justify-end pt-8">
    <a :href="`http://imdb.com/title/${imbdId}`" target="_blank" class="text-center tracking-widest rounded-xl bg-green-800 text-white p-4">View On IMDb</a>
    </div>

    </div>
    <!--overview-->

     <!--cast-->
     <div class="cast">
       <h3 class="tracking-widest text-3xl font-bold pb-5 px-5">CAST</h3>
       <MultiSlide :cast=filter_cast :movieId=movieId /> 
<!--        
       <div class="cast" v-for='c in filter_cast' :key=c.name>
      <router-link :to="`/details/people/${c.id}`">
      <img :src="`https://image.tmdb.org/t/p/w185/${c.profile_path}`"  alt="">
      <h3 >{{c.name}}</h3>
      </router-link>
      </div> -->
    </div> 
    <!--cast-->

    <!--trailer-->
   <div class="trailer mt-24">
    <h3 class="tracking-widest text-3xl font-bold pb-5 px-5">TRAILER</h3>
    <!--if there are trailers-->
    <div class="flex flex-wrap justify-between" v-if="videos.length">
    <div v-for="(video,i) in videos" :key="`${video}${i}`" class="mb-5">
     <video-embed css="embed-responsive-16by9" :src="`https://www.youtube.com/watch?v=${video.key}`"></video-embed>
    </div>
    </div>
    <!--if there are trailers-->

    <!--else-->
    <div v-if="!videos.length" class="pl-5">
      <p class="text-xl font-semibold text-white"> No trailers found:(</p>   
   </div>
   <!--else-->

     </div><!--trailer-->

     <!--review-->
    <div class="review">
       
    </div>
     <!--review-->

    </div><!--container-->
    </div>
</template>

<script>
import StarRating from 'vue-star-rating'
import scrollReveal from 'scrollreveal'
import MultiSlide from '@/components/MultiSlide'
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
      lang:''
    }
  },
  methods: {
    async movieRating(rating) {
      console.log('tett')
      console.log(rating)
      if( !this.$store.state.guest_session_id ) {
        this.$notify({
              group: 'foo',
              type: 'warn',
              title:'login please!',
              text: 'Oh<b> No!</b>',
              duration: 5000,
              speed: 1000 
        })
        return 
      }else {
        try {
             await this.$axios.post(`${process.env.VUE_APP_BASEURL}/movie/${this.movieId}/rating?api_key=${process.env.VUE_APP_KEY}&guest_session_id=${this.$store.state.guest_session_id}`, { 'value':rating } )
//           await this.$axios.post('https://api.themoviedb.org/3/movie/581387/rating?api_key=64a181c4f1c07039374331f8479761ba&guest_session_id=a56bcdf7b4a0b4004f9ae17ec86406bd', {
//   "value": 8.5
// })
           this.$notify({
              group: 'foo',
              type: 'success',
              title:'success!',
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
     console.log(`這是訪客id-->${this.$store.state.guest_session_id}`)
     this.id = this.$route.params.id

     const { data: { id,imdb_id,backdrop_path, genres ,title, overview,poster_path, release_date, tagline, vote_average, videos:{results},credits: {cast}, status, original_language } } = await this.$axios.get(`${process.env.VUE_APP_BASEURL}/movie/${this.id}?api_key=${process.env.VUE_APP_KEY}&append_to_response=videos,credits`)
     this.movieId = id
     console.log(`這是電影id-->${this.movieId}`)
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
  this.scrollReveal.reveal('.movieInfo', {   
    duration: 1000, 
    origin: 'left',   
    reset: true,
    mobile: true,  
    distance: '20%',
    opacity: 0,
    easing: 'linear',
    scale: 2.5,
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
  
</style>