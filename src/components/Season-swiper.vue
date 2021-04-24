<template>
   <swiper class="swiper " :options="swiperOption" >
    <swiper-slide v-for='(item,i) in list' :key='`${item}${i}`' >  
       <div class="relative text-center tracking-wide md:w-full transition transform duration-700 hover:scale-105">
         <router-link :to='`/details/tv/${tvId}/season/${item.season_number}`' class="overflow-hidden relative block">
         <img :src='`https://image.tmdb.org/t/p/w185/${item.poster_path}`' alt="No Image :(" class="rounded-xl w-full ">
         <div class="backdrop w-full h-full absolute top-0 left-0 z-10 pointer-events-none"></div>
         </router-link>

        <h5 class="pt-2  text-white text-center" >{{item.name}}</h5>
        <h5 class=" pt-2 text-white text-center tracking-wide">{{item.air_date}}</h5>
       </div>
    </swiper-slide>
  </swiper> 
</template>

<script>
  import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
  export default {
    name: 'swiper-example-loop-group',
    title: 'Loop mode with multiple slides per group',
    components: {
      Swiper,
      SwiperSlide
    },
    props:['list','tvId'],
    data() {
      return {
        swiperOption: {
          slidesPerView: 1,
          spaceBetween: 10,
          slidesPerGroup: 1,
          loop: true,
          loopFillGroupWithBlank: false,
          pagination: {
            el: '.swiper-pagination',
            clickable: true
          },
          breakpoints: {
            1024: {
              slidesPerView: 6,
              spaceBetween: 70,
              slidesPerGroup: 6,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 20,
              slidesPerGroup: 3,

            },
           640: {
              slidesPerView: 3,
              spaceBetween: 20,
              slidesPerGroup: 3,

            },
            320: {
              slidesPerView: 1,
              spaceBetween: 70,
              slidesPerGroup: 1,
            }
          }
         
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
$font:'Eagle Lake', cursive;
$font-else:'Varela Round', sans-serif;

h3{
    font-family: $font;
}
.tag {
   font-family: $font-else;
   background: rgba(0,0,0,.6);
   right:5%;
   top: 8%;
}
.backdrop {
    background-image: linear-gradient( rgba(0, 0, 0, 0.6)
    ,rgba(0,0,0,.5));
  }
 a {
    
   &:hover {
      .backdrop {
        background-image:none;
      }
   }
 }

</style>