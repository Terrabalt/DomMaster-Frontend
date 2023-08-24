export function getMonthRange(date: Date) : [Date, Date] {  
  const startDate = new Date(date)
  startDate.setDate(1)
  const endDate = new Date(date)
  endDate.setDate(1)
  endDate.setMonth(endDate.getMonth() + 1)
  return [startDate, endDate]
}

export function isDateOnDay(date:Date, day:Date) : boolean {
  const startDay = new Date(day)
  startDay.setHours(0,0,0,0)
  const endDay = new Date(day)
  endDay.setHours(23,59,59,999)
  return date >= startDay && date <= endDay
}
