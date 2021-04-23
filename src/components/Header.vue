<template>
  <div class="wrapper">
   <nav  ref='navbar' class='fixed w-full  h-20 p-7 top-0 left-0 z-20 flex justify-between' >

   <!--menu-->

    <div >
       <box-icon name='menu' color='#ffffff' size='md' class="cursor-pointer" @click='setNav' v-show='!nav'></box-icon>     
     </div>
    <!--menu-->

    <!--search-->
      <div >
        <box-icon name='search-alt' animation='tada' class="search-icon cursor-pointer "  size='md'  color='white' @click='setSearch' v-if='search === false'></box-icon>    
     </div>
     <!--search-->

   </nav>
   </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  methods: {
    setNav() {
      this.nav = !this.nav
    },
    setSearch() {
      this.search = !this.search
    },
    handleScroll () {
     if (window.scrollY > 20 || document.documentElement.scrollTop > 20) {
       this.$refs.navbar.style.backgroundColor = "black";
      } else {
       this.$refs.navbar.style.backgroundColor = "transparent";
      }
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
  },
  
  created() {
    window.addEventListener('scroll', this.handleScroll,true);
  }
}
</script>

<style lang="scss" scoped>
</style>