<template>
  <div class="wrapper w-full text-white">
    <div class="px-10 py-32 container w-110 mx-auto">

    <div class="profile-container flex justify-around">

    <div > <!--left-->
    <!--img-container--> 
    <div class="img-container">
    <img :src="`https://image.tmdb.org/t/p/w500/${profile_img}`"  alt="" class="rounded-xl">
    </div>
    <!--img-container-->

    <div class="mt-5">  <!--info-->
    <h3 class="text-2xl">Personal Info</h3>
    <div>
     <h4>Known For</h4>
     <p>{{known_for}}</p>
    </div> 
    <div>
     <h4>Birthday</h4>
      <p class="inline-block">{{birthday}}</p>
      <p class="inline-block">( {{$moment().diff(birthday, 'years')}} years old )</p>
    </div>   
   </div> <!--info--> 
   </div><!--left-->

   <div class="w-1/2"> <!--right-->
     <h2 class="text-3xl mb-6">{{name}}</h2>
     <h4 class="text-xl pb-5">Biography</h4>
     <p>{{biography}}</p>
   </div><!--right-->

  </div><!--profile-container-->

   <div><!--known for-->
    <div v-for='(item,i) in cast' :key='`${item}${i}`'>
       <div >
         <router-link :to='`/details/movie/${item.id}`'>
         <img :src='`https://image.tmdb.org/t/p/w200/${item.poster_path}`' alt="" class="rounded-xl">
         </router-link>
        <h5>{{item.title}}</h5>
        <span>{{item.vote_average}}</span>
       </div>
     </div>
   </div><!--known for-->

    </div>
  </div>
</template>

<script>

export default {
  data() {
     return {
       id:'',
       name:'',
       biography:'',
       birthday:'',
       profile_img:'',
       cast:[],
       known_for:''
     }
  },
  async created() {
     this.id = this.$route.params.id

     const { data: { 
       name,
       biography,
       birthday,
       credits:{ cast },
       known_for_department,
       images:{profiles}
       }} = await this.$axios.get(`${process.env.VUE_APP_BASEURL}/person/${this.id}?api_key=${process.env.VUE_APP_KEY}&append_to_response=credits,images`)
     
     this.name = name
     this.biography = biography
     this.birthday = birthday
     this.profile_img = profiles[1].file_path
     this.cast = cast 
     this.known_for = known_for_department

  }
}
</script>

<style>

</style>