<template lang="pug">
.flex.flex-col.h-screen
  main.flex-1.container
    .py-6
      h1.font-black.bg-clip-text.text-transparent.bg-gradient-to-r.from-gray-700.to-black(class='text-4xl mb-4 lg:mb-8 lg:text-5xl lg:text-center max-w-full')
        | 2021 永豐幣倍卡回饋計算機
      Calculator

  footer.container.py-4
    .text-gray-700.mr-2.font-medium 資料來源
    a.block.link(href='https://www.ptt.cc/bbs/creditcard/M.1609171266.A.73C.html' target='_blank') Re: [情報] 2021幣倍卡優惠 回饋表格 基本問題釋疑 - 看板 creditcard - 批踢踢實業坊
    a.block.link(href='https://bank.sinopac.com/sinopacBT/webevents/2003_dualcc/index.html' target='_blank') 永豐幣倍卡 有匯有回饋
</template>

<script setup>
import Calculator from './components/Calculator.vue'

</script>

<style lang="sass">
.link
  @apply text-blue-600 underline mr-2
</style>
