<template>
<div >
  <div
    v-show='nav'
    class="sidenav-backdrop w-full h-full fixed top-0 left-0"
    @click='setNav'></div>

    <transition name="slide-side">
    <!-- side menu -->
      <div v-show='nav' class="aside bg-black w-72 h-full fixed top-0 bottom-0 flex-col z-50 md:w-full">

        <!-- close icon -->
        <div class="flex justify-end p-5">
          <box-icon name='x' color='#ffffff' class="cursor-pointer" size='md' @click="setNav"></box-icon>
        </div>
        <!-- close icon -->

        <!-- logo -->
        <router-link to='/' class="block text-center w-36 mx-auto">
         <h1 class="tracking-widest">FilmClub</h1>
        </router-link>
        <!-- logo -->

        <!--link -->
        <ul class=" text-xl  w-full font-normal mt-10"> 
         <li v-for="(item,i) in navText" :key='i' class="mb-5">
              <router-link  :to="{name:`${item.name}` }" class=" p-6  nav-text block text-white text-center hover:text-black hover:bg-white">{{item.link}}</router-link></li>
       </ul>
       <!--link -->

     </div>
     </transition>

 </div>   <!--  container -->
</template>

<script>
import { mapGetters } from 'vuex'
export default {
   computed: {
    ...mapGetters(['showNav']),
    nav: {
      get(){
        return this.showNav
      },
      set(value) {
        return this.$store.commit('setNav', value)
      }
    }
  },
  methods: {
      setNav() {
      this.nav = !this.nav
    }
  },
   data() {
      return {
        navText:[
           {
             name:'Login',
             link:'SIGN IN'
           },
           {
             name:'Profile',
             link:'RATED MOVIE'
           },
        ]
    }
  },
}
</script>

<style lang="scss" scoped>
$neon-border:#911258;
$neon-text:#d65f57;
$font:'Eagle Lake', cursive;
.aside {
  z-index: 10000;
}
 .sidenav-backdrop {
  z-index: 1000;
  background-color: rgba(0, 0, 0, 0.7)
 }
.slide-side-enter-active,
.slide-side-leave-active {
  transition: all 0.3s ease-out;
}
.slide-side-enter,
.slide-side-leave-to {
  transform: translateX(-101%);
}
 .nav-text {
    transition: all .5s; 
    font-family:$font; 
 }
 h1 {
  font-size: .9rem;
  font-family:$font; 
  padding: 10px;
  color: #fff;
  border: 2px solid #fff;
  border-radius: 10px;
  
  animation: flicker 1.5s infinite alternate;     
}

@keyframes flicker { 
    0%, 19%, 21%, 23%, 25%, 54%, 56%, 100% {  
       
         text-shadow:
          -1px -1px 5px $neon-text,  
           1px -1px 5px $neon-text,
           -1px 1px 5px $neon-text,
            1px 1px 5px $neon-text;

         box-shadow:
            0 0 .5rem $neon-border,
            inset 0 0 .7rem $neon-border,
            0 0 2rem $neon-border,
            inset 0 0 2rem $neon-border,
            0 0 4rem $neon-border,
            inset 0 0 4rem $neon-border;        
    }
    
    20%, 24%, 55% {        
       text-shadow: none;
        box-shadow: none;
    }    
}
</style>