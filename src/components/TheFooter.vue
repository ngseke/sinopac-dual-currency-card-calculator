<template lang="pug">
footer.text-sm.mb-8
  .text-gray-700.mr-2.font-medium(class='dark:text-gray-300') 資料來源

  a.block.link(
    target='_blank'
    :href='url'
    v-for='{ url, name } in links'
  ) {{ name }}

  .mt-2
    span.mr-2
      GithubButton(
        :href='githubLink'
        :data-color-scheme='colorScheme'
      ) Star
    span
      GithubButton(
        :href='`${githubLink}issues`'
        :data-color-scheme='colorScheme'
        data-icon='octicon-issue-opened'
      ) 問題回報
</template>

<script setup lang="ts">
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import GithubButton from 'vue-github-button'

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

const colorScheme = 'no-preference: light; light: light; dark: dark;'
const githubLink = 'https://github.com/ngseke/sinopac-dual-currency-card-calculator/'
</script>
