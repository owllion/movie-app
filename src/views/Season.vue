<template>
  <div class="wrapper w-full">
    <!--ep-img-->
    <section class="relative movie-img overflow-hidden w-full h-screen pb-10 xl:h-auto md:pb-0"> 
      <div class="backdrop w-full h-full absolute top-0 left-0 z-10 pointer-events-none"></div> 

     <!--back icon-->
      <div class="back-icon cursor-pointer sm:hidden">
        <a @click="$router.go(-1)"><box-icon name='chevron-left' type='solid' flip='vertical' color='#ffffff' size='lg'></box-icon>
        </a>
      </div>
      <!--back icon-->
      
    <!--img-->  
   <div class="relative">
     <img class="swiper-img w-full h-full object-cover md:w-full " :src="`https://image.tmdb.org/t/p/w1280/${backdrop}`"/>

      <!--info-->
      <div class="info">
      <div class="nam-num">
      <h2 class=" text-white text-5xl mb-1 tracking-wider md:text-xl s:text-sm">{{epName}}</h2> 
      <p class="md:text-sm text-2xl text-white tracking-wide">S{{num}} | EP {{epNum}}</p>
      </div>

      <div class="title_rating">
           <span class="score text-2xl text-white tracking-wide md:text-sm">Rating 
             <span :class="`${getColor(score)}`" class="md:text-sm">{{score}}</span>
             </span> 
        </div>

       </div>
        <!--info-->
     </div>
     <!--img-->  
     </section>   
    <!--ep-img-->
     
     <!--choose ep-->
     <section class=" mt-16 w-4/5 mx-auto pb-6">
       
       <div class="ep-container flex flex-col justify-center items-center">
         <h3 class="ep-title text-white text-5xl mb-1 tracking-wider ">EP</h3>
         <!--choose-->

         <select class="selectEp border-2 border-solid border-green-100 bg-green-500 text-white font-semibold rounded-xl px-3 py-4 w-36 focus:outline-none hidden xs:block" @change='setEp(count)' v-model='count'>
            <option :value="count" v-for='count in epTotal' :key='count'>{{count}}</option>
         </select>

         <div class="choose flex flex-wrap justify-center w-4/5 mx-auto md:w-full xs:hidden">          
          <div v-for='count in epTotal' :key='count' class="ep m-3">
              <button class="text-center text-white text-xl border-2 border-solid border-yellow-200 rounded-xl p-2 block w-20 md:w-36" @click='setEp(count)'>{{count}}</button>        
            </div>
           
            </div> <!--choose-->
         </div> <!--ep-container -->     
     </section>
     <!--choose ep-->

     <!--cast & overview-->
     <section class="cast_overview w-full">
       <div class="container w-120 mx-auto px-16 py-1 xl:w-full md:p-5 ">

      <!--overview-->
      <Overview :overview=overview />
    <!--overview-->

     <!--cast-->
     <div class="cast">
       <h3 class="text-white tracking-widest text-3xl font-bold pb-5 px-5 md:text-xl">CAST</h3>
       <MultiSlide :cast=filter_cast /> 
    </div> 
    <!--cast-->

    </div>
    <!--container-->
     </section>
     <!--cast & overview-->

  </div>
</template>

<script>
import { getEpDetail , getSeasonEpLength } from '@/api/tmdb'
import { mapGetters } from 'vuex'
import MultiSlide from '@/components/MultiSlide'
import scrollReveal from 'scrollreveal'
import Overview from '@/components/Overview'
export default {
  components: {
    MultiSlide , Overview
   },
  data() {
    return {
      scrollReveal: scrollReveal(),
      epTotal:'',
      count:1,
      id:'',
      num:'',
      date:'',
      epNum:'',
      epName:'',
      overview:'',
      backdrop:'',
      score:'',
      castList:[]
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
      async setEp(ep) {
        try {
            this.loading = true
          
            const data = {
              id:this.id,
              num:this.num,
              ep
            }
            const { data: { air_date,episode_number, name, overview,still_path,vote_average, credits: {cast} }} = await getEpDetail(data)
            
            this.date = air_date
            this.epNum = episode_number
            this.epName = name
            this.overview = overview
            this.backdrop = still_path
            this.score = vote_average
            this.castList = cast

            this.loading = false
         }catch(err) {
            this.loading = false
            if(err.response) {
              this.$notify({
               group:'alert',
               title:'<h1>OH NO!</h1>',
               text:'<h1>SOMETHING WRONG!</h1>'
             })
           }
         }
      },
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
    filter_cast() {
       let filter = [];
       this.castList.forEach(i=> {
         if(i.popularity > 3)  filter.push(i)       
      })
      return filter  
    }
  },
   async created() {
    
     this.id = this.$route.params.id
     this.num = this.$route.params.num

    try {
      this.loading = true  
      
      //get ep detail
      const data = {
          id:this.id,
          num:this.num,
          ep:1
      }
      const { data: { air_date,episode_number, name, overview,still_path,vote_average, credits: {cast} }} = await getEpDetail(data)

      this.date = air_date
      this.epNum = episode_number
      this.epName = name
      this.overview = overview
      this.backdrop = still_path
      this.score = vote_average
      this.castList = cast
      
      //get season ep length
      const data2 = {
         id:this.id,
         num:this.num,
      }
      const {data: { episodes } } = await getSeasonEpLength(data2)
      this.epTotal = episodes.length 

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

   }
}
</script>

<style lang="scss" scoped>

.backdrop {
    background-image: linear-gradient( rgba(0, 0, 0, 0.6)
    ,rgba(0,0,0,.5));
  }
  h2,.ep-title{
    font-family: 'Eagle Lake', cursive;
  }
  .info {
    position: absolute;
    top: 40%;
    left: 10%;
    z-index: 10;
  }
  .back-icon {
    position: absolute;
    top: 15%;
    z-index: 10;
    left: 8%;
  }
</style>