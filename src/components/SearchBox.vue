<template>
  <div class="wrapper w-full fixed top-0 left-0 z-20">

   <transition name="search">
   <div class="container w-4/5  px-10 mx-auto mt-5" v-show="showSearch">

   <!--inner-->
   <div class="inner relative ">
       <input type="text" class="w-full rounded-xl bg-black block text-green-400 py-5 pl-14 text-xl focus:outline-none tracking-widest" v-model='keywords' placeholder="Search" @keyup.enter='submit(keywords)'>

       <box-icon name='search-alt-2' class="absolute top-6 left-5 cursor-pointer " color='white' @click='submit(keywords)'></box-icon>
     </div>
     <!--inner-->

      </div>
    </transition>
   
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
   computed: {
    ...mapGetters(['showSearch']),
  },
  methods: {
    submit(keyword) {
    //avoid error
    const path = `/search/${keyword}`
    if (this.$route.path !== path) this.$router.push(path)
  
    }
  }
}
</script>

<style lang="scss" scoped>
@mixin animation($name,$time){
  animation:$name;
  animation-duration: $time; 
}
.search-box {
    position: relative;
    background: #000;
    border:1px solid rgb(77, 76, 76);
    height: 100px;
    border-radius: 10px;            
    input {
        padding-left: 36px;
        outline: none;
        font-size: .6rem;      
      }
    .search-icon {
        position: absolute;
        top: 12px;
        left: 16px;
      }
  } 
.search-enter {
    opacity: 0;
}
.search-leave-to {
    @include animation(flipOutX,.9s) 
}
.search-enter-to {   
    @include animation(flipInX,.9s) 
}
</style>