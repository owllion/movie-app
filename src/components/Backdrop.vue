<template>
  <div class="wrapper">
  <!--img-->
    <section class="relative show-img overflow-hidden w-full h-screen pb-10 xl:h-auto xl:pb-0"> 
      <div class="backdrop w-full h-full absolute top-0 left-0 z-10 pointer-events-none"></div> 

     <!--back icon-->
      <div class="back-icon  z-10 cursor-pointer sm:hidden">
        <a @click="$router.go(-1)"><box-icon name='chevron-left' type='solid' flip='vertical' color='#ffffff' size='lg'></box-icon>
        </a>
      </div>
      <!--back icon-->
      
   <div  class="relative">
     <img class="swiper-img w-full h-full object-cover  md:w-full " :src="`https://image.tmdb.org/t/p/w1280/${backdrop}`"/> 

      <p class="tagline text-white text-5xl absolute z-10 top-80 left-28  xl:top-44 xl:text-3xl md:hidden">{{tagline}}</p> 

      <!--info-->
      <div class="info sm:hidden absolute p-10 z-10 text-white bottom-48 left-20 xl:top-80  md:left-28 flex items-center"> 
       <!--left-->
          <div class="left mr-10 xs:hidden w-36">
            <img :src="`https://image.tmdb.org/t/p/w185/${poster}`" alt="poster" class="w-full h-full object-cover rounded-xl">
            
          </div>
        <!--left-->
        <!--right-->
         <div class="right xs:-mt-36">
          <div class="title_rating">
           <h2 class="font-base text-3xl tracking-wider md:text-xl md:pb-2">{{title}}</h2>
           <span class="score">Rating 
             <span :class="`${getColor(score)}`">{{score}}</span>
             </span> 
             <StarRating 
             :increment="0.5"
             :max-rating="10"
             inactive-color="#fff"
             active-color="#f6bb32"
             :star-size="10"
             v-model='rating'
             @rating-selected ='showRating(rating)'
              />
             </div>

             <p>{{status}} | <span class="uppercase">{{lang}}</span> </p>
             <p>{{ filter_genres }}</p>
             <p>{{ release_date }}</p>
             </div>
             <!--right-->      
         </div>
         <!--info-->
     </div>  
     </section>   
    <!--show-img-->
     
  
   <!--mobile-info-->
       <!--info-->
      <div class="mobileInfo info  p-10  text-white flex items-center justify-center "> 
       <!--left-->
          <div class="left">
            <img :src="`https://image.tmdb.org/t/p/w185/${poster}`" alt="poster" class="w-full h-full object-cover rounded-xl">
            
          </div>
        <!--left-->
        <!--right-->
         <div class="right rounded-xl bg-gradient-to-l from-yellow-800 via-red-700  p-5 mt-6">
          <div class="title_rating text-center">
           <h2 class="font-base text-3xl tracking-widest sm:my-5 sm:text-xl sm:font-bold">{{title}}</h2>
           <span class="score">Rating 
             <span :class="`${getColor(score)}`">{{score}}</span>
             </span>
             <!--rating-component--> 
             <div class="flex justify-center">
             <StarRating 
             :increment="0.5"
             :max-rating="10"
             inactive-color="#fff"
             active-color="#f6bb32"
             :star-size="10"
             v-model='rating'
             @rating-selected ='showRating(rating)'
              />
              </div>
           <!--rating-component-->
             </div>

             <p class="text-center">{{status}} | <span class="uppercase">{{lang}}</span> </p>
             <p class="text-center">{{ filter_genres }}</p>
             <p class="text-center">{{ release_date }}</p>
             </div>
             <!--right-->      
         </div>
         <!--info-->
    <!--mobile-info-->
  </div>
</template>

<script>
import StarRating from 'vue-star-rating'
import scrollReveal from 'scrollreveal'
export default {
  components: {
     StarRating
   },
   props:['id','backdrop','tagline','poster','title','score','status','lang','filter_genres','release_date','seasons','episode_count', 'type'],
   data() {
     return {
       scrollReveal: scrollReveal(),
       rating:0
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
      },
    async showRating(rating) {
      if( !this.$store.state.guest_session_id ) {
        this.$notify({
              group: 'alert',
              type: 'warn',
              text:'<h1>login please!<h1>',
              title: '<b>Oh No!</b>',
              duration: 5000,
              speed: 500 
        })
        return 
      }else {
        try {
           await this.$axios.post(`${process.env.VUE_APP_BASEURL}/${this.type}/${this.id}/rating?api_key=${process.env.VUE_APP_KEY}&guest_session_id=${this.$store.state.guest_session_id}`, { 'value':rating } )

           this.$notify({
              group: 'alert',
              type: 'success',
              title:'<h1>success!</h1>',
              text: `<b>Your rating: ${rating}</b>`,
              duration: 2000,
              speed: 500,
              width:'350px',          
           })
         }catch(err) {
           if(err.response) {
            this.$notify({
              group: 'alert',
              type: 'error',
              title:'<h1>OH NO!</h1>',
              text: '<b>something wrong!</b>',
              duration: 2000,
              speed: 500,
              width:'350px',          
        })
           }
         }
        
      }
    }
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
  }
}
</script>

<style lang="scss" scoped>
.backdrop {
    background-image: linear-gradient( rgba(0, 0, 0, 0.6)
    ,rgba(0,0,0,.5));
  }
  .tagline {
    font-family: 'Eagle Lake', cursive;
  }
  .mobileInfo {
    display: none;
  }
  .back-icon {
    position: absolute;
    top: 15%;
    z-index: 10;
    left: 8%;
  }
  @media(max-width:769px){
    .info {
      top:45%;
    } 
  }
  @media(max-width:639px) {
    .mobileInfo {
        display:block;
    }

  }

</style>