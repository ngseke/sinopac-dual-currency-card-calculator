import { format, multiply } from './utils'

export type Qualification = {
  name: string
  description: string
  qualificationRate: number
  qualificationLimit: number
  accountsLimit: number
}

export const qualifications: Qualification[] = [
  {
    name: '懂匯',
    description: '等值台幣 1 元以上',
    qualificationRate: 0.01,
    qualificationLimit: 200,
    accountsLimit: 200,
  },
  {
    name: '超匯',
    description: '等值台幣 10 萬元(含)以上',
    qualificationRate: 0.02,
    qualificationLimit: 1500,
    accountsLimit: 600,
  },
]

export type Account = {
  name: string
  description: string
  accountRate: number
}

export const accounts: Account[] = [
  {
    name: '數位',
    description: '已具備有效之永豐銀行DAWHO數位存款帳戶',
    accountRate: 0.03,
  },
  {
    name: '實體',
    description: '係指本行一般外幣存款帳戶且尚未持有DAWHO數位帳戶之客戶',
    accountRate: 0.02,
  },
]

export type Result = {
  value: number,
  isOverLimit: boolean,
}

export const calcQualificationResult = (
  expense: number,
  qualification: Qualification,
): Result => {
  const value = multiply(
    expense,
    qualification.qualificationRate,
    qualification.qualificationLimit
  )
  const isOverLimit = value >= qualification.qualificationLimit

  return { value, isOverLimit }
}

export const calcAccountResult = (
  expense: number,
  account: Account,
  qualification: Qualification,
): Result => {
  const value = multiply(
    expense,
    account.accountRate,
    qualification.accountsLimit
  )
  const isOverLimit = value >= qualification.accountsLimit

  return { value, isOverLimit }
}

export const calcBasicResult = (expense: number): Result => {
  const value = multiply(expense, 0.01)
  const isOverLimit = false

  return { value, isOverLimit }
}

export const getFormulaTable = ({ account, accountResult, qualification, qualificationResult, basicResult }: {
  account: Account,
  accountResult: Result,
  qualification: Qualification,
  qualificationResult: Result,
  basicResult: Result,
}): {
  name: string,
  value: string,
  rate: number,
  isOverLimit?: boolean,
  sign?: '+',
}[] => {
  return [
    {
      name: '特選',
      value: format(accountResult.value),
      rate: account.accountRate * 100,
      isOverLimit: accountResult.isOverLimit,
    },
    {
      name: '資格',
      value: format(qualificationResult.value),
      rate: qualification.qualificationRate * 100,
      isOverLimit: qualificationResult.isOverLimit,
    },
    {
      name: '基本',
      value: format(basicResult.value),
      rate: 1,
      sign: '+',
    },
  ]
}
