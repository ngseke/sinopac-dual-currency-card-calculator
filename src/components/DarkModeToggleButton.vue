<template lang="pug">
button(
  class='inline-flex items-center justify-center text-2xl w-16 h-16 focus:outline-none hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-all duration-100 overflow-hidden whitespace-nowrap transform active:scale-95 select-none'
  type='button'
  @click='toggleDark'
  title='切換深色模式'
) {{ isDark ? '☀️' : '🌕' }}
</template>

<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core'

const isDark = useDark()
const toggleDark = useToggle(isDark)
</script>
