const dateTimeFormatter = new Intl.DateTimeFormat('ru-RU', {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric',
});

export function formatDateTime(date: Date) {
  const dateObject = new Date(date);
  if (dateObject.toString() === 'Invalid Date') {
    return date;
  }
  return dateTimeFormatter.format(dateObject);
}
