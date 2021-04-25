<template>
    <div class="overview rounded-xl bg-gradient-to-r from-green-900 my-24 p-8 md:mb-20">
    <h3 class="tracking-widest text-3xl font-bold text-white pb-5 md:text-xl">OVERVIEW</h3>
    <p class="leading-7">{{overview}}</p>
    <div class="imdb-link flex justify-end pt-8">

    <a :href="`http://imdb.com/title/${imdbId}`" target="_blank" class="text-center tracking-wider rounded-xl bg-green-800 text-white p-4 font-semibold duration-500 transition hover:bg-white hover:text-green-800" v-if='imdbId'>View On IMDb</a>

    </div>
</div>
</template>

<script>
export default {
  props:['overview','imdbId']
}
</script>

<style>

</style>