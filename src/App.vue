<template lang="pug">
.flex.flex-col.h-screen
  main.flex-1.container
    .py-6
      div
        h1(class='mb-2 font-black bg-clip-text text-transparent bg-gradient-to-r from-gray-700 to-black text-2xl lg:text-4xl max-w-full') 2021 下半年永豐幣倍卡回饋計算機
        p.text-lg.text-gray-700.font-mono 2021/6/30 ~ 12/31
      hr(class='my-4 xl:my-6')
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
