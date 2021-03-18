<template lang="pug">
.flex.flex-col.h-screen
  main.flex-1.container
    .py-6
      h1.font-black.bg-clip-text.text-transparent.bg-gradient-to-r.from-gray-700.to-black(class='text-4xl mb-4 lg:mb-8 lg:text-5xl lg:text-center max-w-full')
        | 2021 永豐幣倍卡回饋計算機
      Calculator
  TheFooter
</template>

<script setup>
import Calculator from './components/Calculator.vue'
import TheFooter from './components/TheFooter.vue'
</script>

<style lang="sass">
.link
  @apply text-blue-600 underline mr-2
</style>
