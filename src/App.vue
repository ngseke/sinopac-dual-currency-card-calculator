<template lang="pug">
.flex.flex-col.h-screen
  main.flex-1.container
    .py-6
      .flex.justify-between.items-center
        div
          h1(class='mb-2 font-black bg-clip-text text-transparent bg-gradient-to-r from-gray-700 to-black dark:from-gray-100 dark:to-white text-2xl lg:text-4xl max-w-full') 永豐幣倍卡回饋計算機
          p(class='text-lg text-gray-700 dark:text-gray-200 font-mono') 2021/07/01 ~ 2021/12/31
        button.text-2xl.p-3(
          type='button'
          @click='toggleDark'
          title='切換深色模式'
        ) {{ isDark ? '☀️' : '🌕' }}
      hr(class='-mx-4 xl:mx-0 my-4 xl:my-3 border-gray-200 dark:border-gray-700')
      Calculator
    TheFooter
</template>

<script setup>
import { useDark, useToggle } from '@vueuse/core'

import Calculator from './components/Calculator.vue'
import TheFooter from './components/TheFooter.vue'

const isDark = useDark()
const toggleDark = useToggle(isDark)
</script>

<style lang="sass">
.link
  @apply text-blue-600 underline mr-2
</style>
