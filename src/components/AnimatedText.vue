<template lang="pug">
div.font-roboto
  small(v-if='prepend') {{ prepend }}
  .inline-flex
    .char(
      v-for='(i, index) in split'
      :key='`${index}.${i}`'
      :class='{ "opacity-75": [",", "."].includes(i) }'
    ) {{ i }}
  small(v-if='append') {{ append }}
</template>

<script setup lang="ts">
import { defineProps, computed } from 'vue'

const props = defineProps({
  value: {
    type: String,
    default: '',
  },
  textClass: {
    type: String,
    default: '',
  },
  append: {
    type: String,
    default: '',
  },
  prepend: {
    type: String,
    default: '',
  },
})

const split = computed(() => props.value.split(''))
</script>

<style lang="sass" scoped>
@keyframes char
  from
    transform: scale(.9)
    opacity: .5

.char
  @apply inline-block
  animation: char .3s
  animation-fill-mode: both
</style>
