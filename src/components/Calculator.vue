<template lang="pug">
form.flex.flex-wrap.-mx-4.mb-4
  div(class='w-full md:w-1/2 xl:w-1/3 px-4 space-y-6 mb-8')
    label.block
      .label 當期刷卡金額
      input.field(
        type='number'
        inputmode='numeric'
        v-model.number='expense'
      )

    div.space-y-2
      .label 資格
      div
        RadioButton(
          v-for='({ name, description }, index) in qualifications'
          :active='qualification.name === name'
          :name='name'
          :content='description'
          @click='qualificationIndex = index'
        )

    div.space-y-2
      .label 帳戶類型
      div
        RadioButton(
          v-for='({ name, description }, index) in accounts'
          :active='account.name === name'
          :name='name'
          :content='description'
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
            :value='format(total)'
          )
        div(class='w-full sm:w-2/3 px-2')
          .title 刷卡金額
          AnimatedText(
            class='text-3xl font-bold dark:text-white'
            prepend='$'
            :value='format(expense)'
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
              | {{ format(total) }}

      p.italic.text-sm.text-gray-500 結果僅供參考
</template>

<script setup lang="ts">
import { computed, unref, watch } from 'vue'
import { useLocalStorage } from '@vueuse/core'

import RadioButton from './RadioButton.vue'
import AnimatedText from './AnimatedText.vue'

import {
  qualifications,
  accounts,
  calcQualificationResult,
  calcAccountResult,
  calcBasicResult,
  getFormulaTable,
} from '../modules/sino-dual-currency-card'
import { normalizeExpense, multiply, calcPercentage, sum, format } from '../modules/utils'

const qualificationIndex = useLocalStorage('qualificationIndex', 0)
const qualification = computed(() => qualifications[qualificationIndex.value])

const accountIndex = useLocalStorage('accountIndex', 0)
const account = computed(() => accounts[accountIndex.value])

const expense = useLocalStorage('expend', 10000)

watch(expense, (value) => {
  if (typeof value !== 'number') return
  expense.value = normalizeExpense(value)
})

const qualificationResult = computed(() => calcQualificationResult(
  expense.value,
  qualification.value
))

const accountResult = computed(() => calcAccountResult(
  expense.value,
  account.value,
  qualification.value
))

const basicResult = computed(() => calcBasicResult(expense.value))

const total = computed(() => sum([
  qualificationResult.value.value,
  accountResult.value.value,
  basicResult.value.value,
]))

const avgRate = computed(() => calcPercentage(total.value, expense.value))

const formulaTable = computed(() => getFormulaTable({
  account: unref(account),
  accountResult: unref(accountResult),
  qualification: unref(qualification),
  qualificationResult: unref(qualificationResult),
  basicResult: unref(basicResult),
}))
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
