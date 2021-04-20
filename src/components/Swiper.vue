
<template>
  <div class="wrapper overflow-hidden w-full h-screen pt-20 pb-10 md:h-full">
   
  <swiper :options="swiperOption">  
    <swiper-slide  class="relative " v-for="item in list" :key=item.id >
      <router-link :to="`/details/movie/${item.id}`"  >  
         <div class="backdrop w-full h-full absolute top-0 left-0 z-10"></div>

         <div class="absolute p-10 z-10 text-white bottom-48 left-10 md:bottom-0 md:left-0">       
             <p>{{type}}</p>
             <h2 class="font-bold">{{item.title}}</h2>
             <p>{{item.vote_average}} Rating</p>
             <p>{{item.release_date}}</p>
         </div>
        <img class="swiper-img w-full" :src="`https://image.tmdb.org/t/p/w1280/${item.backdrop_path}`"/> 
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
      },
      // filter_genres() {
      //    const genreId = this.genres
      //    const list = this.genreList 
      //   //  console.log(genreId)
      //   //  console.log(this.genres)
      //   //  console.log(list)
      //   //  const result = list.find(i=> { genreId.forEach(id=> i.id === id)})
      //   //  return result
      //   return 1
      // }  
      
    },
    props:['type','list','status','tagline','title','score','lang','backdrop','genres'],
    data() {
      return {
            genreList:[],
            swiperOption:{       
                pagination:{         
                    el:'.swiper-pagination',
                    clickable:true
                },
                loop:true,    
                autoplay:{      
                    delay:1500,
                    disableOnInteraction:false
                },
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev'
          },
                
                speed:1500    
            }
        }
    },
    async created() {
        const {data: { genres } } = await this.$axios.get(`${process.env.VUE_APP_BASEURL}/genre/movie/list?api_key=${process.env.VUE_APP_KEY}&language=en-US`)

        this.genreList = genres
        console.log(this.genreList)
    }
  }
</script>

<style lang="scss" scoped> 
.backdrop {
    background-image: linear-gradient( rgba(0, 0, 0, 0.6)
    ,rgba(0,0,0,.5));
  }
  
</style>