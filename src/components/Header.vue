<template>
  <div class="wrapper">
    <!-- <transition name="slide-side">
    <nav class="fixed w-full z-20 h-20 py-2 px-0 transition duration-700 transform flex justify-evenly items-center bg-black " v-show='nav'>

    <router-link to='/'>
    <h1 class="tracking-widest">FilmClub</h1>
    </router-link>

    <div class="search-box w-72">
        <input type="text" class="bg-transparent block text-green-400 pt-1.5 " v-model='keywords' placeholder="Search" @keyup.enter='submit(keywords)'>
      <box-icon name='search-alt' animation='tada' class="search-icon cursor-pointer " color='white' @click='submit(keywords)'></box-icon>
    </div>
    
    <div>
      <ul class="flex ">
        <li class="mr-5 pt-3">
          <router-link to='/login'>
          <box-icon name='face' type='solid' color='#ffffff' animation='tada-hover'  size='sm'></box-icon>
          </router-link>
        </li>
        <li class="pt-3">
          <router-link to='/profile'>
         <box-icon name='binoculars' type='solid' color='#ffffff' animation='tada-hover'  size='sm'></box-icon>
          </router-link>
        </li>
      </ul>   
    </div>
    </nav>
    </transition> -->
    <nav >
   <!--menu-->
   <!-- -->
    <div class="fixed top-10 left-20 z-50">
       <box-icon name='menu' color='#ffffff' size='md' class="cursor-pointer" @click='setNav' v-show='!nav'></box-icon>     
     </div>
    <!--menu-->

    <!--search-->
      <div class="fixed top-10 right-20 z-50">
        <box-icon name='search-alt' animation='tada' class="search-icon cursor-pointer "  size='md'  color='white' @click='setSearch'></box-icon>    
     </div>
     <!--search-->
   </nav>



   </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      keywords:''  
    }
  },
  methods: {
    setNav() {
      this.nav = !this.nav
    },
    setSearch() {
      this.search = !this.search
    }
  },
  computed: {
    ...mapGetters(['showNav','showSearch']),
    nav: {
      get(){
        return this.showNav
      },
      set(value) {
        return this.$store.commit('setNav', value)
      }
    },
    search: {
      get() {
        return this.showSearch
      },
      set(value) {
        return this.$store.commit('setSearch', value)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.slide-side-enter-active,
.slide-side-leave-active {
  transition: all 0.3s ease-out;
}
.slide-side-enter,
.slide-side-leave-to {
  opacity: 0;
}
</style>