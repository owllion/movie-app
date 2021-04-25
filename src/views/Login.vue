<template>
  <div class="wrapper w-full ">
    <div class="container w-full h-screen">
      <!--left-->
      <div class="left bg-gradient-to-b from-black to-gray-900 p-10 flex  justify-center items-start ">
        <!--content-->
        <div class="content mt-36 ">
        <h3 class="pt-20 text-center text-5xl bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-900">LOG IN</h3>

        <!--link-->
        <div class="link-container mt-10 text-white font-semibold">
          <router-link to='/profile' class="link text-center focus:outline-none focus:ring-4 focus:ring-blue-400 focus:ring-opacity-80 font-semibold block rounded-xl bg-gradient-to-r  from-blue-900 to-gray-900 p-3 mb-5 tracking-widest transition transform duration-500 hover:scale-105" @click.native='getGuestId'>AS GUEST</router-link> 
        </div>
        <!--link-->
       </div>
       <!--content-->
      </div>
       <!--left-->

      <!--right-->
      <div class="right w-full h-screen overflow-hidden transition transform duration-500 relative md:hidden">
        <!--info-->
        <div class="recommend absolute bottom-36 left-20 text-white ">
          <h3 class="text-3xl" >BODY GUARD</h3> 
          <p class="text-xl">Rating 7.9</p>
          <p class="text-xl">Air 2018-08-26</p>
        </div>
        <!--info-->
        <router-link to='/details/movie/80307'>
        <img src="https://image.tmdb.org/t/p/w1280/b8TXO9j8x88k1HvweLnf1Dtmff8.jpg" alt="" class="w-full h-full object-cover ">
        </router-link>
      </div>
     <!--right-->

    </div>
  </div>
</template>

<script>
import scrollReveal from 'scrollreveal'
export default {
  computed: {
    validate() {
      return `https://www.themoviedb.org/authenticate/${this.$store.state.token}?redirect_to=https://koza-organic.herokuapp.com/`
    }
  },
  data() {
    return {
      scrollReveal: scrollReveal(),
     
    }
  },
  methods: {
     async getGuestId() {
       console.log('請求session')
       try {
                console.log('請求session2')
           const {data: { guest_session_id } } = await this.$axios.get(`${process.env.VUE_APP_BASEURL}/authentication/guest_session/new?api_key=${process.env.VUE_APP_KEY}`)
                  console.log('請求session3')
           this.$store.commit('setGuestId', guest_session_id)
          console.log(this.$store.state.guest_session_id)
          this.$notify({
              group: 'foo',
              type: 'success',
              title:'Success!',
              text: 'Oh<b> Yeah!</b>',
              duration: 5000,
              speed: 1000 
        })
       }catch(err) {
         if(err.response) {
           alert('something wrong!')
         }
       }

     }
  },
  async created() {
    try {
      const { data: { request_token } } = await this.$axios.get(`${process.env.VUE_APP_BASEURL}/authentication/token/new?api_key=${process.env.VUE_APP_KEY}`)
      this.$store.commit('setToken', request_token)
      console.log(this.$store.state.token)
    }catch(err) {
      if(err.response) {
        alert('something wrong!')
      }
    }
      
      
  },
  mounted() {
    this.scrollReveal.reveal('.recommend', {   
    duration: 1000,   
    origin: 'bottom',   
    reset: true,
    mobile: true,  
    distance: '0',
    opacity: 0.001,
    easing: 'linear',
    scale: 0.5,
  });
  }
}
</script>

<style lang="scss" scoped>
.container {
  display: grid;
  grid-template-columns: 30% 70%;
  h3  {
    font-family: 'Eagle Lake', cursive;
  }
  .link {
    width: 250px;
    height: 3rem;
  }
}
@media(max-width:769px) {
  .container {
     grid-template-columns:1fr;
  }
}

</style>