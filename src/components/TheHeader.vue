<template lang="pug">
.flex.justify-between.items-center(class='py-3 lg:py-6')
  .overflow-hidden
    h1(class='md:mb-2 font-black bg-clip-text text-transparent bg-gradient-to-r from-gray-700 to-black dark:from-gray-100 dark:to-white text-2xl lg:text-4xl max-w-full truncate') 永豐幣倍卡回饋計算機
    p(class='text-lg text-gray-700 dark:text-gray-200 font-roboto truncate') 2021/07/01 ~ 2021/12/31
  DarkModeToggleButton
hr(class='-mx-4 xl:mx-0 mb-4  border-gray-200 dark:border-gray-700')
</template>

<script setup lang="ts">
import DarkModeToggleButton from './DarkModeToggleButton.vue'
</script>
