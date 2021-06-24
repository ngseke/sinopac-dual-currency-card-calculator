<template lang="pug">
.flex.flex-col.h-screen
  main.flex-1.container.pb-6
    TheHeader
    Calculator
    TheFooter
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

import Calculator from './components/Calculator.vue'
import TheHeader from './components/TheHeader.vue'
import TheFooter from './components/TheFooter.vue'

onMounted(() => {
  setTimeout(() => {
    document.body.className += 'transition-colors duration-300'
  }, 300)
})
</script>

<style lang="sass">
.link
  @apply text-blue-600 underline mr-2
</style>
