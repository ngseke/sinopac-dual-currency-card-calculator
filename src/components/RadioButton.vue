<template lang="pug">
button.radio(
  type='button'
  :class='{ active }'
  @click='$emit("click", $event)'
)
  span.name {{ name }}
  span.content {{ content }}
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

<style lang="sass" scoped>
.radio
  @apply inline-flex flex-col rounded-lg bg-gray-100 dark:bg-gray-800 border border-transparent p-2 px-3 mb-2 mr-2 hover:border-gray-300 focus:outline-none
  @apply transition-colors duration-100
  &.active
    @apply border-gray-500 dark:border-gray-400
  .name
    @apply dark:text-white
  .content
    @apply text-xs text-gray-600 dark:text-gray-400 text-left
</style>
