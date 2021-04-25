<template>
  <div class="wrapper w-full text-white">
    <div class="px-10 py-32 container w-110 mx-auto md:w-full">

     <div class="back-icon  cursor-pointer sm:hidden">
        <a @click="$router.go(-1)"><box-icon name='chevron-left' type='solid' flip='vertical' color='#ffffff' size='lg'></box-icon>
        </a>
      </div>

    <div class="profile-container mb-16 gap-x-1 md:gap-x-9">

    <div class="left mb-5"> <!--left-->
    <!--img-container--> 
    <div class="img-container">
    <img :src="`https://image.tmdb.org/t/p/w500/${profile_img}`"  alt="" class="rounded-xl" >
    </div>
    <!--img-container-->

    <div class="mt-5">  <!--info-->
    <h3 class="tracking-widest text-2xl font-semibold mb-5">Personal Info</h3>

    <div class="known-for">
     <h3 class="tracking-widest text-xl font-medium"><box-icon name='happy-alt' type='solid' color='white' class="align-text-bottom mr-1.5"></box-icon>Known For</h3>
     <p>{{known_for}}</p>
    </div> 

    <div class="birth mt-5">
    <h3 class="tracking-widest text-xl font-medium mb-2"><box-icon name='cake' type='solid' flip='horizontal' color='white' class="align-text-bottom mr-1.5"></box-icon>Birthday</h3>
      <p class="inline-block">{{birthday}}</p>
      <p class="inline-block">( {{$moment().diff(birthday, 'years')}} years old )</p>
    </div>   
    <div class="link py-10">
      <a :href="`http://imdb.com/name/${imbd}`" target="_blank" class="text-center tracking-wider rounded-xl bg-red-700 text-white p-4 font-semibold duration-500 transition hover:bg-white hover:text-red-700">View On IMDb</a>
    </div>
   </div> <!--info--> 
   </div>
   <!--left-->

   <!--right-->
   <div class="right"> 
     <h2 class="text-3xl mb-6">{{name}}</h2>
     <h3 class="text-xl pb-5 tracking-widest font-medium">Biography</h3>
     <p class="tracking-wide leading-7 text-justify bg-gray-800 p-8 rounded-xl">{{biography}}</p>
   </div>
   <!--right-->
  </div>
  <!--profile-container-->

  <!--credits-->
   <div>
     <div class="movie mb-16">
      <h3 class="tracking-widest text-3xl font-bold pb-5">Movie Credits</h3>
     <MultiSlide :list=movieCredit link='movie' />
     </div>

     <div class="tv">
      <h3 class="tracking-widest text-3xl font-bold pb-5">TV Credits</h3> 
     <MultiSlide :list=TvCredit link='tv' /> 
   </div>

   </div>
   <!--credits-->

  </div>
  </div>
</template>

<script>
import MultiSlide from '@/components/MultiSlide'
import scrollReveal from 'scrollreveal'
import { mapGetters } from 'vuex'
export default {
   components: {
     MultiSlide
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
    movieCredit() {
      let list = []
      this.creditList.forEach(i=> {
        if(i.media_type === 'movie') {
          list.push(i)
        }
      })
      return list
    },
    TvCredit() {
      let list = []
      this.creditList.forEach(i=> {
        if(i.media_type === 'tv') {
          list.push(i)
        }
      })
      return list
    }
  },
  data() {
     return {
       scrollReveal: scrollReveal(),
       id:'',
       imbd:'',
       movieId:'',
       name:'',
       biography:'',
       birthday:'',
       profile_img:'',
       creditList:[],
       known_for:''
     }
  },
  async created() {
     this.id = this.$route.params.id
     this.movieId = this.$route.params.movieId
     console.log(`這是movieid*-->${this.movieId}`)
     try {
      this.loading = true
      const { data: { 
       name,
       biography,
       birthday,
       combined_credits:{ cast },
       known_for_department,
       images:{ profiles },
       imdb_id
       }} = await this.$axios.get(`${process.env.VUE_APP_BASEURL}/person/${this.id}?api_key=${process.env.VUE_APP_KEY}&append_to_response=combined_credits,images`)
     
      this.name = name
      this.biography = biography
      this.birthday = birthday
      this.profile_img = profiles[0].file_path
      this.creditList = cast 
      this.known_for = known_for_department
      this.imbd = imdb_id
      this.loading = false
     }catch(err) {
       if(err.response) {
          alert('something wrong!')
       }
     }
     

  },
  mounted() {
  this.scrollReveal.reveal('.left', {   
    duration: 800, 
    origin: 'left',   
    reset: false,
    mobile: true,  
    distance: '50%',
    opacity: 0,
    easing: 'linear',
    scale: 1.1,
  });
  this.scrollReveal.reveal('.right', {   
    duration: 800, 
    origin: 'right',   
    reset: false,
    mobile: true,  
    distance: '50%',
    opacity: 0,
    easing: 'linear',
    scale: 1.1,
  });


}
  
}
</script>

<style lang="scss" scoped>
$font-h2:'Eagle Lake', cursive;

 .profile-container {
   display:grid;
   grid-template-columns: repeat(auto-fit,minmax(300px,1fr));  
 }
 h2 {
    font-family: $font-h2;
 }
 .back-icon {
    position: absolute;
    top: 15%;
    z-index: 10;
    left: 8%;
  }

</style>