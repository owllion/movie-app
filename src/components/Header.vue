<template>
  <div class="text-white">
    <nav class="flex justify-evenly items-center">

    <router-link to='/'>
    <h1 class="tracking-widest">FilmClub</h1>
    </router-link>

    <div class="search-box w-72">
        <input type="text" class="bg-transparent block text-green-400 pt-1.5 " v-model='keywords' placeholder="Search">
      <box-icon name='search-alt' animation='tada' class="search-icon cursor-pointer " color='white' ></box-icon>
    </div>
    
    <div>
      <ul class="flex ">
        <li class="mr-5 pt-3">
          <router-link to='/login'>
          <box-icon name='face' type='solid' color='#ffffff' animation='tada-hover'  size='sm'></box-icon>
          </router-link>
        </li>
        <li class="pt-3">
          <router-link to='/discover'>
         <box-icon name='binoculars' type='solid' color='#ffffff' animation='tada-hover'  size='sm'></box-icon>
          </router-link>
        </li>
      </ul>
    </div>
    </nav>
   </div>

</template>

<script>
export default {
  data () {
    return {
      keywords:'',
      
    }
  },
}
</script>

<style lang="scss" scoped>
$neon-border:#911258;
$neon-text:#d65f57;

 nav {
   background: #000;
   position: fixed;
   width: 100%;
   z-index: 1000;
   height: 80px;
   padding: 1rem 0;
   margin-bottom: 100px;
 }
.search-box {
    position: relative;
    background: #000;
    border:1px solid rgb(77, 76, 76);
    height: 45px;
    border-radius: 40px;
    padding: 8px;            
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

h1 {
  font-size: .9rem;
  font-family: 'Eagle Lake', cursive;
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