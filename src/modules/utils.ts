export const normalizeExpense = (
  value: number,
  [min, max]: [number, number] = [0, 9_999_999]
): number => {
  return Math.max(min, Math.min(max, value))
}

export const multiply = (
  value: number,
  rate: number,
  limit = Infinity
): number => {
  const result = value * rate
  return (result >= limit) ? limit : Math.round(result)
}

export const calcPercentage = (
  dividend: number,
  divisor: number,
): number => {
  return +(dividend / divisor * 100).toFixed(2)
}

export const sum = (numbers: number[]): number => {
  return numbers.reduce((p, v) => p + v, 0)
}

export const { format } = new Intl.NumberFormat('en-US')
