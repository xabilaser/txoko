export function addDays(d: Date, n: number) {
  const x = new Date(d)
  x.setDate(x.getDate() + n)
  return x
}

export function isThursday(d: Date) {
  return d.getDay() === 4
}
