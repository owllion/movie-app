<template>
<div class="wrapper">

  <div class="container w-120 mx-auto p-16 md:w-full">
      <MultiSlide :list=list /> 
  </div>

  </div>
</template>

<script>
import MultiSlide from '@/components/MultiSlide'
export default {
   components: {
    MultiSlide
  },
}
</script>

<style>

</style>