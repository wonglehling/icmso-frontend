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

export {
  formatDate
}