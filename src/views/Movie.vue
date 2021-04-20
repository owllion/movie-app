<template>
  <div class="wrapper text-white">
    <div class="relative">
    <img :src="`https://image.tmdb.org/t/p/w1280/${backdrop}`" alt="backdrop" >
    </div>
    <h4>Movie Id: {{id}}</h4>
    <h3 class="absolute bottom-5 left-5 text-xl md:text-xl">{{tagline}}</h3>
    <h2>{{title}}</h2>
    <h4>{{com_genres}}</h4>
    <h2>Trailer</h2>

    <div class="cast" v-for='c in filter_cast' :key=c.name>
      <router-link :to="`/details/people/${c.id}`">
      <img :src="`https://image.tmdb.org/t/p/w185/${c.profile_path}`"  alt="">
      <h3 >{{c.name}}</h3>
      </router-link>
    </div>

    <div v-for="(video,i) in videos" :key="`${video}${i}`">
     <video-embed css="embed-responsive-16by9" :src="`https://www.youtube.com/watch?v=${video.key}`"></video-embed>
    </div>


    </div>
</template>

<script>
export default {
  data() {
    return {
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
      cast:[]
    }
  },
  computed: {
    com_genres() {
      return this.genres?.[0]?.name
    },
    filter_cast() {
       let filter = [];
       this.cast.forEach(i=> {
         if(i.popularity > 10)  filter.push(i)       
      })
      return filter  
    }
  },
   async created() {
    
     this.id = this.$route.params.id
     const baseUrl  = 'https://api.themoviedb.org/3'
     const { data: { backdrop_path, genres,title, overview,poster_path, release_date, tagline, vote_average, videos:{results},credits: {cast} } } = await this.$axios.get(`${baseUrl}/movie/${this.id}?api_key=64a181c4f1c07039374331f8479761ba&append_to_response=videos,credits`)

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
   }
}
</script>

<style lang="scss" scoped>


</style>