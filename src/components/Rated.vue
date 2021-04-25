<template>
    <!--movie & tv -->
    <div>
     <h3 class="text-3xl tracking-widest text-white p-5 m-5 md:m-0 md:pb-5">Rated {{type}}</h3>

    <!--if ratedMovies.length-->
     <div v-if='list.length' >
    <!--inner-container-->
    <div class="inner-container flex flex-wrap justify-center ">

      <!--v-for-->
       <div v-for='(item,i) in list' :key="i"  class="w-44 text-center m-5 md:w-full">
         <router-link :to='`/details/${link}/${item.id}`' class="overflow-hidden">
         <img :src='`https://image.tmdb.org/t/p/w185/${item.poster_path}`' alt="No Image :(" class="rounded-xl w-full transition duration-500 transform hover:scale-105">
         </router-link>

        <h5 v-if='item.title' class="text-center pt-2 tracking-widest text-white">{{item.title}}</h5>

        <h5 v-if='item.name' class="text-center pt-2 tracking-wide text-white">{{item.name}}</h5>
       
        <span class="tag text-white px-3 font-bold align-middle">
          <box-icon name='star' type='solid' flip='horizontal' animation='spin' color='#f4ec15' class="align-middle pr-2" ></box-icon>{{item.vote_average}}
        </span>
      </div>
       <!--v-for-->
    </div>
     <!--inner-container-->
    </div> 
     <!--if list.length-->

     <!--if !list.length-->
     <div v-if='!list.length'>
       <p class="text-white font-semibold text-3xl pl-5 mt-6">You have not rated any {{link}}!</p>
     </div>
     <!--if !list.length-->
    </div>
</template>

<script>
export default {
  props:['list','type','link'],
}
</script>

<style lang="scss" scoped>
$neon-text:#16c7a1;
$neon-border:#086830;
 h3 {
      font-family: 'Eagle Lake', cursive;
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