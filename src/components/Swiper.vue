
<template>
  <div class="wrapper overflow-hidden w-full h-screen  pb-10 xl:h-auto">
   
  <swiper :options="swiperOption">  
    <swiper-slide  class="relative " v-for="item in list" :key=item.id >
      <router-link :to="`/details/${link}/${item.id}`"  >  
         <div class="backdrop w-full h-full absolute top-0 left-0 z-10"></div>

         <div class="absolute p-10 z-10 text-white bottom-48 left-10 md:bottom-0 md:left-0 text-xl">       
             <p class="tracking-wider">{{type}}</p>

             <h2 class="font-bold tracking-widest text-2xl" v-if='item.title'>{{item.title}}</h2>
             <h2 class="font-bold tracking-widest text-2xl" v-if='item.name'>{{item.name}}</h2>

             <p >Rating <span :class="`${getColor(item.vote_average)}`">{{item.vote_average}}</span> </p>
            
         </div>
        <img class="swiper-img w-full" :src="`https://image.tmdb.org/t/p/w1280/${item.backdrop_path}`" alt='No backdrop.' /> 
      </router-link>
     </swiper-slide> 
    </swiper>
  </div>   
</template>

<script>
  import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
  export default {
    name: 'swiper-example-space-between',
    title: 'Space between slides',
    components: {
      Swiper,
      SwiperSlide
    },
    computed: {
      movie_genreIds() {
        const idBatch = this.list?.map(i=> i.genre_ids)
        console.log(idBatch)
        const result =  this.genreList.filter(i=> {return idBatch.filter(id=> {return id.filter(nestId=> {return i.id === nestId})}) })
        console.log(result)
        return result
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
      }
    },
    props:['type','list','status','tagline','title','score','lang','backdrop','genres','link'],
    data() {
      return {
            genreList:[],
            swiperOption:{       
                pagination:{         
                    el:'.swiper-pagination',
                    clickable:true
                },
                loop:true,                              
            }
        }
    },
    async created() {
        const {data: { genres } } = await this.$axios.get(`${process.env.VUE_APP_BASEURL}/genre/movie/list?api_key=${process.env.VUE_APP_KEY}&language=en-US`)

        this.genreList = genres
        console.log(this.link)
    }
  }
</script>

<style lang="scss" scoped> 
.backdrop {
    background-image: linear-gradient( rgba(0, 0, 0, 0.6)
    ,rgba(0,0,0,.5));
  }
  
</style>