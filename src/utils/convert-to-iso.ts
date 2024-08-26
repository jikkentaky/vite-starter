const convertToISO = (dateString: string) => {
  const [datePart, timePart] = dateString.split(' ')
  const [year, month, day] = datePart.split('-').map(Number)
  const [hours, minutes] = timePart.split(':').map(Number)

  const date = new Date(Date.UTC(year, month - 1, day, hours, minutes))

  return date.toISOString()
}

export { convertToISO }
