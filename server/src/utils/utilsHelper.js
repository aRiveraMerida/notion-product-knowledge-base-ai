function getCurrentDateFormatted() {
  const date = new Date()
  const year = date.getFullYear()
  const month = ('0' + (date.getMonth() + 1)).slice(-2) // Months are zero-based, so we add 1
  const day = ('0' + date.getDate()).slice(-2) // We pad the day with a zero if it's a single digit
  const formattedDate = `${year}-${month}-${day}`

  return formattedDate
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

// Write a function that gets current day of the week
function getCurrentDayOfWeek() {
  const date = new Date()
  const dayOfWeek = date.getDay()
  const daysOfWeek = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
  ]
  return daysOfWeek[dayOfWeek]
}

module.exports = {
  getCurrentDateFormatted,
  getCurrentDayOfWeek,
  capitalizeFirstLetter
}
