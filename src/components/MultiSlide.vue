<template>
   <swiper class="swiper " :options="swiperOption" v-if='list' >
    <swiper-slide v-for='(item,i) in list' :key='`${item}${i}`' >  
       <div class="relative text-center tracking-widest md:w-full transition transform duration-700 hover:scale-105">
         <router-link :to='`/details/movie/${item.id}`' class="overflow-hidden relative block">
         <img :src='`https://image.tmdb.org/t/p/w185/${item.poster_path}`' alt="No Image :(" class="rounded-xl w-full ">
         <div class="backdrop w-full h-full absolute top-0 left-0 z-10 pointer-events-none"></div>
         </router-link>

        <h5 class=" pt-5 text-white text-center " v-if=item.title>{{item.title}}</h5>
        <h5 class="pt-2  text-white text-center tracking-wide" v-if=item.name>{{item.name}}</h5>
        <h5 class=" pt-2 text-white text-center tracking-wide" v-if=item.air_date>{{item.air_date}}</h5>
      
        <div>
        <span class="tag absolute rounded-xl bg-black px-3 font-bold align-middle"  :class="`${getColor(item.vote_average)}`" v-if='item.vote_average'>     
          <box-icon name='star' type='solid' flip='horizontal' animation='spin' color='#f4ec15' class="align-middle pr-2" >
          </box-icon>
       {{item.vote_average}}       
        </span>
        </div>

       </div>
    </swiper-slide>
  </swiper> 

  <swiper class="swiper" :options="swiperOption" v-else>
    <swiper-slide v-for='c in cast' :key=c.name class="transition transform duration-700 hover:scale-105">            
      <router-link :to="`/details/people/${c.id}`">
      <img :src="`https://image.tmdb.org/t/p/original/${c.profile_path}`"  alt="No Image:(" class="rounded-xl">
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
    props:['list','cast','movieId'],
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
.swiper-container {   
  //  padding: 0 3.5rem;
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