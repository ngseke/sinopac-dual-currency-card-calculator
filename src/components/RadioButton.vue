<template lang="pug">
button(
  type='button'
  class='inline-flex flex-col rounded-lg bg-gray-100 dark:bg-gray-800 border border-transparent p-2 px-3 mb-2 mr-2 hover:border-gray-600 dark:hover:border-gray-300 focus:outline-none outline-none transition-all duration-100 transform active:scale-95'
  :class='{ "border-gray-500 dark:border-gray-400": active }'
  @click='$emit("click", $event)'
)
  span(class='dark:text-white') {{ name }}
  span(class='text-xs text-gray-600 dark:text-gray-400 text-left') {{ content }}
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

defineProps({
  active: {
    type: Boolean,
    default: false,
  },
  name: String,
  content: String,
})
</script>
