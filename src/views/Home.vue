<template>
  <div>
    <!-- <label
      v-for="(item, i) in optionsLang"
      :key="i"
    >
      <input type="radio" v-model="$store.state.lang" :value="item.value" @change="setLang(item.value)"> {{ item.text }}
    </label>

    <ul class="flex justify-evenly">
      <li v-for="(item,i) in $t('GENERAL.NAV_OPTIONS')" :key='i+1'>
        
      </li>
    </ul> -->

   <div class="search-box w-72">
        <input type="text" class="bg-transparent block text-green-400 " v-model='keywords' placeholder="Search">
      <box-icon name='search-alt' animation='tada' class="search-icon " color='green' ></box-icon>
        </div>


     <button @click='getInfo()'>test</button>
     <div v-for='(item,i) in list' :key='`${item}${i}`'>
       <div>
         <img :src='`https://image.tmdb.org/t/p/w200/${item.poster_path}`' alt="">
        <h5>{{item.title}}</h5>
        <span>{{item.vote_average}}</span>
       </div>
     </div>
      
  </div>  
</template>

<script>
export default {
  data () {
    return {
      keywords:'',
      optionsLang: [
        { text: '中文', value: 'zh' },
        { text: 'English', value: 'en' }
      ],
      list:[]
    }
  },
  methods: {
    setLang (value) {
      this.$store.commit('setLang', value);
      this.$i18n.locale = value;
      localStorage.setItem('lang', value);
    },
    async getInfo() {
    const baseUrl  = 'https://api.themoviedb.org/3'
     const {data: {results}}= await this.$axios.get(`${baseUrl}/movie/popular?api_key=64a181c4f1c07039374331f8479761ba&language=en-US&page=1`)
     console.log(results)
     this.list = results
    }
  }
}
</script>
<style lang="scss" scoped>

.search-box {
            position: relative;
            background: #000;
            height: 45px;
            border-radius: 40px;
            padding: 8px;            
            input {
               padding-left: 36px;
               outline: none;
               font-size: 1.1rem;
               
            }
             .search-icon {
                 position: absolute;
                 color: rgb(196, 213, 44);
                 top: 12px;
                 left: 16px;
               }
          }         

</style>