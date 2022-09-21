<template lang="pug">
.flex.flex-col.h-screen
  main.flex-1.container.pb-6
    TheHeader
    Calculator
    TheFooter

Teleport(to='body')
  transition(leave-to-class='translate-y-full opacity-0')
    button.fixed.bottom-5.left-4.border-4.border-white.rounded-lg.p-1.transform.-rotate-12.transition-all(
      v-if='isDisclaimerVisible'
      @click='isDisclaimerVisible = false'
    )
      div.text-white.font-black.text-center.text-lg
        | 一代神卡
        br
        span.text-2xl 已殞落
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'

import Calculator from './components/Calculator.vue'
import TheHeader from './components/TheHeader.vue'
import TheFooter from './components/TheFooter.vue'

onMounted(() => {
  setTimeout(() => {
    document.body.className += 'transition-colors duration-300'
  }, 300)
})

const isDisclaimerVisible = ref(true)
</script>

<style lang="sass">
.link
  @apply text-blue-600 underline mr-2
</style>
