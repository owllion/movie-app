<template>
  <div class="wrapper text-white">

    <!--movie-img-->
    <section class="relative movie-img overflow-hidden w-full h-screen pb-10"> 
      <div class="backdrop w-full h-full absolute top-0 left-0 z-10 pointer-events-none"></div> 
      <box-icon class="absolute right-36 top-24 cursor-pointer" name='heart' type='solid' animation='tada' color='#FF0909' size="lg"></box-icon>
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
              />
             </div>

             <p>{{status}} | {{upperLang}} </p>
             <p>{{ filter_genres }}</p>
         </div>
         <!--movie-info-->

     <img class="swiper-img w-full " :src="`https://image.tmdb.org/t/p/w1280/${backdrop}`"/> 
     </section>  
    <!--movie-img-->

    <div class="container w-120 mx-auto p-16 md:w-full">
    <!--overview-->
    <div class="overview rounded-xl bg-gradient-to-r from-green-900 my-24 p-5">
    <h3 class="tracking-widest text-3xl font-bold text-white pb-2">OVERVIEW</h3>
    <p>{{overview}}</p>
    </div>
    <!--overview-->

     <!--cast-->
     <div class="cast">
       <h3 class="tracking-widest text-3xl font-bold pb-5 px-5">CAST</h3>
       <MultiSlide :cast=filter_cast /> 
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
      id:'',
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
  computed: {
    upperLang() {
       return this.lang.toUpperCase()
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
    
     this.id = this.$route.params.id

     const { data: { backdrop_path, genres ,title, overview,poster_path, release_date, tagline, vote_average, videos:{results},credits: {cast}, status, original_language } } = await this.$axios.get(`${process.env.VUE_APP_BASEURL}/movie/${this.id}?api_key=${process.env.VUE_APP_KEY}&append_to_response=videos,credits`)
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