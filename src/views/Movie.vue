<template>
  <div class="wrapper text-white">
     
    <Backdrop :id=id :backdrop=backdrop :tagline=tagline :poster=poster :title=title :score=score :status=status :lang=lang :filter_genres=filter_genres :release_date = release_date   type='movie' />

    <div class="container w-120 mx-auto p-16 xl:w-full md:p-5">
    <!--overview-->
      <Overview :overview =overview :imdbId=imdbId />
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
import { getMovieDetail } from '@/api/tmdb'
import Backdrop from '@/components/Backdrop'
import Overview from '@/components/Overview'
import scrollReveal from 'scrollreveal'
import MultiSlide from '@/components/MultiSlide'
import { mapGetters } from 'vuex'
export default {
  components: {
     MultiSlide,Backdrop, Overview
   },
  data() {
    return {
      scrollReveal: scrollReveal(),
      rating:0,
      movieId:'',
      id:'',
      imdbId:'',
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
      const { data: { id,imdb_id,backdrop_path, genres ,title, overview,poster_path, release_date, tagline, vote_average, videos:{results},credits: {cast}, status,reviews:{results:reviews}, original_language } } = await getMovieDetail(this.id)

      this.movieId = id
      this.imdbId = imdb_id
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

</style>