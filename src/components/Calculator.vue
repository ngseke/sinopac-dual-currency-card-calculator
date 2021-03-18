<template lang="pug">
form.flex.flex-wrap.justify-center.-mx-4
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
      .space-x-6
        label.inline-flex.items-center.cursor-pointer(v-for='item in qualifications')
          input.radio(
            type='radio'
            v-model='qualification'
            :value='item'
          )
          span.ml-2 {{ item.name }}

    div.space-y-2
      .label 帳戶類型
      .space-x-6
        label.inline-flex.items-center.cursor-pointer(v-for='item in accounts')
          input.radio(
            type='radio'
            v-model='account'
            :value='item'
          )
          span.ml-2 {{ item.name }}



  div(class='w-full lg:w-1/2 px-4')
    .rounded-2xl.border.border-gray-300.bg-gray-50.p-5.space-y-5
      div
        .title 回饋金額
        .text-5xl.font-black.gradient-text.from-blue-700.to-blue-900 ${{ format(result) }}

      div
        .title 參考算式
        .flex.flex-wrap.text-2xl.font-bold.text-gray-900
          .flex(:class='{ "text-pink-600": isAccountResultOverLimit }')
            span ${{ accountResult }}
            sup.text-sm
              | 特選 {{ account.accountRate * 100 }}%
              span(v-if='isAccountResultOverLimit') (封頂)

          .text-gray-700.px-1 +
          .flex(:class='{ "text-pink-600": isQualificationResultOverLimit }')
            span ${{ qualificationResult }}
            sup.text-sm
              | 資格 {{ qualification.qualificationRate * 100 }}%
              span(v-if='isQualificationResultOverLimit') (封頂)


          .text-gray-700.px-1 +

          .flex
            span ${{ basicResult }}
            sup.text-sm
              | 基本 1%

      div
        .title 平均回饋率
        .text-4xl.font-bold.gradient-text.from-gray-700.to-black
          template(v-if='avgRate') {{ avgRate }}%
          template(v-else) -

      p.italic.text-sm.text-gray-500 計算結果僅供參考
</template>

<script setup>
import { computed, ref, watch } from 'vue'

const qualifications = [
  {
    name: '懂匯',
    content: '等值台幣 1 元以上',
    qualificationRate: .01,
    qualificationLimit: 600,
    accountsLimit: 300,
  },
  {
    name: '超匯',
    content: '等值台幣 10 萬元(含)以上',
    qualificationRate: .02,
    qualificationLimit: 1500,
    accountsLimit: 600,
  },
]
const qualification = ref(qualifications[0])

const accounts = [
  {
    name: '數位',
    accountRate: .06,
  },
  {
    name: '實體',
    accountRate: .05,
  },
]

const account = ref(accounts[0])

const expend = ref(10000)

watch(expend, (value) => {
  const min = 0
  const max = 100_000_000
  if (value >= max) expend.value = max
  else if (value <= min) expend.value = min
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
</script>

<style lang="sass" scoped>
.label
  @apply text-gray-700 font-medium text-lg

.radio
  @apply rounded bg-gray-200 border-transparent text-gray-700 focus:border-transparent focus:bg-gray-200 focus:ring-1 focus:ring-offset-2 focus:ring-gray-500

.field
  @apply mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0

.title
  @apply mb-1 font-medium text-gray-700

.gradient-text
  @apply bg-clip-text text-transparent bg-gradient-to-r
</style>
