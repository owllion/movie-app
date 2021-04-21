<template>
   <swiper class="swiper " :options="swiperOption" v-if='list' >
    <swiper-slide v-for='(item,i) in list' :key='`${item}${i}`' >  
       <div class="relative text-center tracking-widest">
         <router-link :to='`/details/movie/${item.id}`' class="overflow-hidden">
         <img :src='`https://image.tmdb.org/t/p/w185/${item.poster_path}`' alt="No Image :(" class="rounded-xl w-full h-64">
         </router-link>
        <h5 class="w-48 pt-5 text-white">{{item.title}}</h5>
        <span class="tag absolute rounded-xl bg-black  text-white px-3 font-bold align-middle"><box-icon name='star' type='solid' flip='horizontal' animation='spin' color='#f4ec15' class="align-middle pr-2" ></box-icon>{{item.vote_average}}</span>
       </div>
    </swiper-slide>
  </swiper> 

  <swiper class="swiper" :options="swiperOption" v-else>
    <swiper-slide v-for='c in cast' :key=c.name >            
      <router-link :to="`/details/people/${c.id}`">
      <img :src="`https://image.tmdb.org/t/p/original/${c.profile_path}`"  alt="No Image:(" class="w-30 rounded-xl">
      <h3 class="text-center pt-3">{{c.name}}</h3>
      </router-link>
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
    props:['list','cast'],
    data() {
      return {
        swiperOption: {
          slidesPerView: 4,
          spaceBetween: 75,
          slidesPerGroup: 4,
          loop: true,
          loopFillGroupWithBlank: false,
          pagination: {
            el: '.swiper-pagination',
            clickable: true
          },
         
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
$font:'Eagle Lake', cursive;
$font-else:'Varela Round', sans-serif;
 .swiper-container {
    padding: 0 3.5rem;
}
h3{
    font-family: $font;
}
.tag {
   font-family: $font-else;
   background: rgba(0,0,0,.6);
   right:5%;
   top: 8%;
}
</style>