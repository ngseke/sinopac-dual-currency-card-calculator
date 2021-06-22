<template lang="pug">
form.flex.flex-wrap.-mx-4
  div(class='w-full md:w-1/2 xl:w-1/3 px-4 space-y-6 mb-8')
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
        RadioButton(
          v-for='({ name, content }, index) in qualifications'
          :active='qualification.name === name'
          :name='name'
          :content='content'
          @click='qualificationIndex = index'
        )

    div.space-y-2
      .label 帳戶類型
      div
        RadioButton(
          v-for='({ name, content }, index) in accounts'
          :active='account.name === name'
          :name='name'
          :content='content'
          @click='accountIndex = index'
        )

  div(class='w-full md:w-1/2 xl:w-1/3 px-4')
    div(class='rounded-2xl border border-gray-300 p-5 dark:border-gray-700')
      div(class='flex flex-wrap w-full -mx-2 space-y-3 md:space-y-5')
        div(class='w-full px-2')
          .title 回饋金額
          AnimatedText(
            class='text-4xl font-black text-yellow-500 dark:text-yellow-400'
            prepend='$'
            :value='format(result)'
          )
        div(class='w-full sm:w-2/3 px-2')
          .title 刷卡金額
          AnimatedText(
            class='text-3xl font-bold dark:text-white'
            prepend='$'
            :value='format(expend)'
          )

        div(class='w-full sm:w-1/3 px-2')
          .title 平均回饋率
          AnimatedText(
            class='text-3xl font-bold dark:text-white'
            :append='avgRate || avgRate === 0 ? "%" : ""'
            :value='avgRate || avgRate === 0 ? `${avgRate}` : "-"'
          )

        div(class='w-full px-2')
          .title 參考算式
          div
            .flex.items-center(
              v-for='{ name, value, rate, isOverLimit, sign } in formulaTable'
            )
              div.w-6.text-lg.font-medium.text-gray-500 {{ sign }}
              .space-x-1(class='dark:text-white')
                span {{ name }}
                span.font-roboto {{ rate }}%
                span(v-if='isOverLimit')  (已封頂)
              .flex-1.price(
                :class='{ over: isOverLimit }'
              )
                small $
                span {{ value }}
            .border-b.border-gray-500.-mx-1
            .price
              small $
              | {{ format(result) }}

      p.italic.text-sm.text-gray-500 結果僅供參考
</template>

<script setup lang="ts">
import { computed, unref, watch } from 'vue'
import { useLocalStorage } from '@vueuse/core'

import RadioButton from './RadioButton.vue'
import AnimatedText from './AnimatedText.vue'

const qualifications = [
  {
    name: '懂匯',
    content: '等值台幣 1 元以上',
    qualificationRate: 0.01,
    qualificationLimit: 200,
    accountsLimit: 200,
  },
  {
    name: '超匯',
    content: '等值台幣 10 萬元(含)以上',
    qualificationRate: 0.02,
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
    accountRate: 0.03,
  },
  {
    name: '實體',
    content: '係指本行一般外幣存款帳戶且尚未持有DAWHO數位帳戶之客戶',
    accountRate: 0.02,
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

const calc = (
  rate: number,
  limit = Infinity
) => {
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

const basicResult = computed(() => calc(0.01))

const result = computed(() =>
  [
    qualificationResult.value,
    accountResult.value,
    basicResult.value,
  ].reduce((p, v) => p + v, 0)
)

const avgRate = computed(() => +(result.value / expend.value * 100).toFixed(2))

const format = new Intl.NumberFormat('en-US').format

const formulaTable = computed<{
  name: string,
  value: string,
  rate: number,
  isOverLimit?: boolean,
  sign?: '+',
}[]>(() => [
  {
    name: '特選',
    value: format(unref(accountResult)),
    rate: unref(account).accountRate * 100,
    isOverLimit: unref(isAccountResultOverLimit),
  },
  {
    name: '資格',
    value: format(unref(qualificationResult)),
    rate: unref(qualification).qualificationRate * 100,
    isOverLimit: unref(isQualificationResultOverLimit),
  },
  {
    name: '基本',
    value: format(basicResult.value),
    rate: 1,
    sign: '+',
  },
])
</script>

<style lang="sass" scoped>
.label
  @apply text-gray-700 dark:text-gray-200 font-medium text-lg

.field
  @apply mt-1 block w-full rounded-lg bg-gray-100 dark:bg-gray-800 dark:text-white border-transparent text-xl focus:border-gray-500 focus:ring-0 text-left

.title
  @apply text-base font-medium text-blue-900 dark:text-blue-400

.price
  @apply text-2xl font-bold text-right font-roboto dark:text-white
  &.over
    @apply text-pink-600 dark:text-pink-500
</style>
