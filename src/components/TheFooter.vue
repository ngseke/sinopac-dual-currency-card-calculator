<template lang="pug">
footer.text-sm
  .text-gray-700.mr-2.font-medium(class='dark:text-gray-300') 資料來源
  a.block.link(
    target='_blank'
    :href='url'
    v-for='{ url, name } in links'
  ) {{ name }}
  iframe.mt-2(src='https://ghbtns.com/github-btn.html?user=ngseke&repo=sinopac-dual-currency-card-calculator&type=star' frameborder='0' scrolling='0' width='150' height='20' title='GitHub')
</template>

<script setup>
const links = [
  {
    name: 'teofil @ [情報]  永豐幣倍下半年權益',
    url: 'https://www.ptt.cc/bbs/creditcard/M.1624258550.A.749.html',
  },
  {
    name: '永豐幣倍卡 鈔匯省賺回饋',
    url: 'https://bank.sinopac.com/sinopacBT/webevents/2003_dualcc/index.html',
  },
]
</script>
