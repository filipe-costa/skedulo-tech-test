export const getHour = (value) => {
  const date = new Date(value)
  return `${formatDateToPlural(date.getHours())}:${formatDateToPlural(date.getMinutes())}`
}

export const formatDateToPlural = (value) => {
  return parseInt(value, 10) >= 10 ? value : `0${value}`
}

export const formatDate = (value) => {
  const date = new Date(value)
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

  return `${weekDays[date.getDay()]} ${monthNames[date.getMonth()]} ${formatDateToPlural(date.getDate())} ${date.getFullYear()}`
}