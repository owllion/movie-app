
<template>
  <div class="wrapper">
  <a href="#">   
  <swiper :options="swiperOption" >
    <swiper-slide class="relative" v-for="item in list" :key=item.id>
         <div class="backdrop"></div>
         <div class="absolute p-10 z-10 text-white bottom-48 left-10 md:bottom-0 md:left-0">
             <p>{{type}}</p>
             <h2 class="font-bold">{{item.name}}</h2>
             <p>Action | {{item.vote_average}} Rating</p>
         </div>
     <img class="swiper-img" :src="`https://image.tmdb.org/t/p/w1280/${item.backdrop_path}`"/> 
     </swiper-slide>
      <swiper-slide >
          <div class="backdrop"></div>
      <img class="swiper-img" src="https://image.tmdb.org/t/p/w1280/5NxjLfs7Bi07bfZCRl9CCnUw7AA.jpg"/> 
     </swiper-slide>
    <!-- <div class="swiper-button-prev" slot="button-prev"></div>
    <div class="swiper-button-next" slot="button-next"></div> -->
   
    </swiper>
    </a>
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
      filter_genres() {
        let result ;
         this.list?.[0].
      }
    },
    props:['type','list'],
    data() {
      return {
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
    }
  }
</script>

<style lang="scss" scoped>
  .wrapper {    
      overflow: hidden;
      
      width: 100%;
      height: 100vh;
      padding-top: 4.9rem;
      padding-bottom: 30%;
      .swiper-img {
          width: 100%;
         
      }
    .backdrop {
        position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          z-index: 10;
          background-image: linear-gradient( rgba(0, 0, 0, 0.6)
          ,rgba(0,0,0,.5));
       }
  }
  
</style>