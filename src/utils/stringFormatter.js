function formatDate(dateString) {
  // Create a new Date object from the provided date string
  const date = new Date(dateString);

  // Define an array of month names
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  // Get the month, day, and year components from the date object
  const month = monthNames[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();

  // Construct the formatted date string
  const formattedDate = `${month} ${day}, ${year}`;

  return formattedDate;
}

// truncate strings to ellipses for display
function truncateString(str, num) {
  if (str.length <= num) {
    return str
  }
  return str.slice(0, num) + '...'
}

// format into time and date
function formatDateTime(dateString) {
  const date = new Date(dateString);

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const month = monthNames[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();
  const hour = date.getHours()<10?'0'+date.getHours():date.getHours();
  const minute = date.getMinutes()<10?'0'+date.getMinutes():date.getMinutes();

  const formattedDateTime = `${month} ${day}, ${year} ${hour}:${minute}`;

  return formattedDateTime;
}

export {
  formatDate, formatDateTime
}