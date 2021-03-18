<template lang="pug">
footer.p-4.text-sm
  .text-gray-700.mr-2.font-medium 資料來源
  a.block.link(
    target='_blank'
    :href='url'
    v-for='{ url, name } in links'
  ) {{ name }}
  iframe.mt-2(src='https://ghbtns.com/github-btn.html?user=ngseke&repo=sinopac-dual-currency-card-calculator&type=star' frameborder='0' scrolling='0' width='150' height='20' title='GitHub')
</template>

<script setup>
import { computed, ref, watch } from 'vue'

const links = [
  {
    name: 'Kazamatsuri @ Re: [情報] 2021幣倍卡優惠 回饋表格 基本問題釋疑 - 看板 creditcard - 批踢踢實業坊',
    url: 'https://www.ptt.cc/bbs/creditcard/M.1609171266.A.73C.html',
  },
  {
    name: '永豐幣倍卡 有匯有回饋',
    url: 'https://bank.sinopac.com/sinopacBT/webevents/2003_dualcc/index.html',
  },
]
</script>
