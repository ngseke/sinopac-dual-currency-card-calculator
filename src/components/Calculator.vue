<template lang="pug">
form.flex.flex-wrap.-mx-4
  div(class='w-full lg:w-1/2 xl:w-1/3 px-4 space-y-6 mb-8')
    label.block
      .label 當期刷卡金額
      input.field(
        type='number'
        inputmode='numeric'
        v-model.number='expend'
      )

    div.space-y-2
      .label 資格
      div
        button.radio(
          type='button'
          v-for='(item, index) in qualifications'
          :class='{ active: (qualification.name === item.name) }'
          @click='qualificationIndex = index'
        )
          span.name {{ item.name }}
          span.content {{ item.content }}

    div.space-y-2
      .label 帳戶類型
      div
        button.radio(
          type='button'
          v-for='(item, index) in accounts'
          :class='{ active: (account.name === item.name) }'
          @click='accountIndex = index'
        )
          span.name {{ item.name }}
          span.content {{ item.content }}

  div(class='w-full lg:w-1/2 xl:w-1/3 px-4')
    .rounded-2xl.border.border-gray-300.p-5.space-y-5(class='dark:border-gray-700')
      div
        .title 回饋金額
        .text-4xl.font-black.gradient-text.from-yellow-400.to-yellow-600
          small $
          | {{ format(result) }}

      div
        .title 平均回饋率
        .text-3xl.font-bold.text-gray-700(class='dark:text-gray-300')
          template(v-if='avgRate != null && !isNaN(avgRate)') {{ avgRate }}%
          template(v-else) -

      div
        .title 參考算式
        div
          .flex.items-center(
            v-for='{ name, value, rate, isOverLimit, sign } in formulaTable'
          )
            div.w-6.text-lg.font-medium.text-gray-500 {{ sign }}
            .space-x-1(class='dark:text-white')
              span {{ name }}
              span.font-mono {{ rate }}%
              span(v-if='isOverLimit')  (已封頂)
            .flex-1.price(:class='{ over: isOverLimit }')
              small $
              span {{ value }}
          .border-b.border-gray-500.-mx-1
          .price
            small $
            | {{ format(result) }}

      p.italic.text-sm.text-gray-500 結果僅供參考
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { useLocalStorage } from '@vueuse/core'

const qualifications = [
  {
    name: '懂匯',
    content: '等值台幣 1 元以上',
    qualificationRate: .01,
    qualificationLimit: 200,
    accountsLimit: 200,
  },
  {
    name: '超匯',
    content: '等值台幣 10 萬元(含)以上',
    qualificationRate: .02,
    qualificationLimit: 1500,
    accountsLimit: 600,
  },
]
const qualificationIndex = useLocalStorage('qualificationIndex', 0)
const qualification = computed(() => qualifications[qualificationIndex.value])

const accounts = [
  {
    name: '數位',
    content: '已具備有效之永豐銀行DAWHO數位存款帳戶',
    accountRate: .03,
  },
  {
    name: '實體',
    content: '係指本行一般外幣存款帳戶且尚未持有DAWHO數位帳戶之客戶',
    accountRate: .02,
  },
]

const accountIndex = useLocalStorage('accountIndex', 0)
const account = computed(() => accounts[accountIndex.value])

const expend = useLocalStorage('expend', 10000)

watch(expend, (value) => {
  const min = 0
  const max = 9_999_999
  if (value >= max) expend.value = max
  else if (value < min) expend.value = min
})

const { round } = Math

const calc = (rate, limit = Infinity) => {
  const result = expend.value * rate
  return (result >= limit) ? limit : round(result)
}

const qualificationResult = computed(() => calc(
  qualification.value.qualificationRate,
  qualification.value.qualificationLimit
))

const isQualificationResultOverLimit = computed(() =>
  qualificationResult.value >= qualification.value.qualificationLimit
)

const accountResult = computed(() => calc(
  account.value.accountRate,
  qualification.value.accountsLimit
))

const isAccountResultOverLimit = computed(() =>
  accountResult.value >= qualification.value.accountsLimit
)

const basicResult = computed(() => calc(.01))

const result = computed(() => {
  return qualificationResult.value + accountResult.value + basicResult.value
})

const avgRate = computed(() => +(result.value / expend.value * 100).toFixed(2))

const format = new Intl.NumberFormat('en-US').format

const formulaTable = computed(() => [
  {
    name: '特選',
    value: format(accountResult.value),
    rate: account.value.accountRate * 100,
    isOverLimit: isAccountResultOverLimit.value,
  },
  {
    name: '資格',
    value: format(qualificationResult.value),
    rate: qualification.value.qualificationRate * 100,
    isOverLimit: isQualificationResultOverLimit.value,
  },
  {
    name: '基本',
    value: format(basicResult.value),
    rate: 1,
    isOverLimit: false,
    sign: '+',
  },
])
</script>

<style lang="sass" scoped>
.label
  @apply text-gray-700 dark:text-gray-200 font-medium text-lg

.radio
  @apply inline-flex flex-col rounded-lg bg-gray-100 dark:bg-gray-800 border border-transparent p-2 px-3 mb-2 mr-2 hover:border-gray-300 focus:outline-none
  @apply transition-colors duration-100
  &.active
    @apply border-gray-500 dark:border-gray-400
  .name
    @apply dark:text-white
  .content
    @apply text-xs text-gray-600 dark:text-gray-400 text-left

.field
  @apply mt-1 block w-full rounded-lg bg-gray-100 dark:bg-gray-800 dark:text-white border-transparent text-xl focus:border-gray-500  focus:ring-0 text-left

.title
  @apply mb-1 text-lg font-medium text-blue-900 dark:text-blue-400

.gradient-text
  @apply bg-clip-text text-transparent bg-gradient-to-r

.price
  @apply text-2xl font-bold text-right font-mono dark:text-white
  &.over
    @apply text-pink-600 dark:text-pink-500
</style>
