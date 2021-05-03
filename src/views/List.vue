<template>
<div class="wrapper">
    <div class="flex md:justify-center items-center justify-start pl-28 pt-28 md:pl-0">
    <!--back icon-->
      <div class="back-icon cursor-pointer">
        <a @click="$router.go(-1)"><box-icon name='chevron-left' type='solid' flip='vertical' color='#ffffff' size='lg' class="sm:hidden"></box-icon>
        <box-icon name='chevron-left' type='solid' flip='vertical' color='#ffffff' size='sm' class="hidden sm:block"></box-icon>
        </a>
      </div>
      <!--back icon-->
    <h1 class="title tracking-widest text-white text-3xl tracking-wider font-bold mb- md:text-xl xs:text-lg md:tracking-wider">{{title}}</h1>
    </div>
   <!--inner-container-->
    <div class="inner-container flex flex-wrap justify-center md:px-16 xs:px-2">

      <!--v-for-->
       <div v-for='(item,i) in list' :key="i"  class="w-44 text-center m-5 md:w-full">
         <router-link :to='`/details/${type}/${item.id}`' class="overflow-hidden">
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
     <div class="btn text-center flex justify-center px-6" v-show='!hidden'>
         <button class="text-white my-6 p-5 trakcing-wider text-lg border-solid border-2 border-blue-800 w-48 block md:w-full hover:text-blue-800 hover:bg-white transition duration-500 font-bold"  @click="loadMore()">LOAD MORE</button>
         {{page}}
     </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            list:[],
            page:2,
            type:'',
            sort:'',
            title:''
           
        }
    },
    computed:{
        hidden() {
            if(this.page === 15) return true
            return false
        },
    },
    async beforeRouteUpdate (to, next) {
        const type = to.params.type
        const sort = to.params.sort
        this.title = to.params.title
        try {
             const {data: {results}} = await this.$axios.get(`${process.env.VUE_APP_BASEURL}/${type}/${sort}?api_key=${process.env.VUE_APP_KEY}&language=en-US&page=1`)

             this.list = results

            }catch(err){
            if(err.response) {
                this.$notify({
                type:'error',
                title:'<h1>OH NO!</h1>',
                text:'something wrong!'
                })
          }
        }
     next()
  },
    methods: {
       
      async loadMore() {  
       try {
          const {data: {results}} = await this.$axios.get(`${process.env.VUE_APP_BASEURL}/${this.type}/${this.sort}?api_key=${process.env.VUE_APP_KEY}&language=en-US&page=${this.page++}`)

         console.log(this.page)

         this.list = [...this.list, ...results]
       }catch(err) {
         if(err.response) {
             this.$notify({
              type:'error',
              title:'<h1>OH NO!</h1>',
              text:'something wrong!'
              })
         }
       }
     
        }
    },
   async created() {
    this.title = this.$route.params.title
    this.type = this.$route.params.type
    this.sort = this.$route.params.sort

    const {data: {results}} = await this.$axios.get(`${process.env.VUE_APP_BASEURL}/${this.type}/${this.sort}?api_key=${process.env.VUE_APP_KEY}&language=en-US&page=1`)

    this.list = results
   }
}
</script>

<style lang="scss" scoped>
.wrapper {
    min-height:100vh
}
</style>