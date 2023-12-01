const formatDateHandle = (inputDate) => {
  // Create a new Date object from the input date string
  const date = new Date(inputDate);

  // Get day, month, and year components
  const day = String(date.getUTCDate()).padStart(2, "0");
  const month = String(date.getUTCMonth() + 1).padStart(2, "0"); // Months are 0-based, so add 1
  const year = date.getUTCFullYear();

  // Format the date as dd-MM-yyyy
  const formattedDate = `${day}-${month}-${year}`;

  return formattedDate;
};

const formatDayHandle = (inputDate) => {
  // Create a new Date object from the input date string
  const date = new Date(inputDate);

  // Get day, month, and year components
  const day = String(date.getUTCDate()).padStart(2, "0");
  const month = String(date.getUTCMonth() + 1).padStart(2, "0"); // Months are 0-based, so add 1
  const year = date.getUTCFullYear();

  // Format the date as dd-MM-yyyy
  const formattedDate = `${year}-${month}-${day}`;

  return formattedDate;
};

const formatFromObjectToDate = (inputDate) => {
  const date = new Date(inputDate);
  const day = String(date.getUTCDate()).padStart(2, "0");
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const year = date.getUTCFullYear();
  const formattedDate = `${day}-${month}-${year}`;
  return formattedDate;
};

const formatTimeHandle = (inputDate) => {
  const date = new Date(inputDate);

  const hour = String(date.getUTCHours()).padStart(2, "0");
  const minute = String(date.getUTCMinutes()).padStart(2, "0");

  // Format the time hh:mm
  const formattedTime = `${hour}:${minute}`;

  return formattedTime;
};

// const formatFromDatetoObject = (inputStringDate) => {
//     const parsedDate = parse(inputStringDate, 'dd-MM-yyyy', new Date());
//     const formattedDate = format(parsedDate, "EEE MMM dd yyyy HH:mm:ss 'GMT'Z (zz)", {
//         timeZone: 'Asia/Ho_Chi_Minh', // Múi giờ của Việt Nam
//     });
//     return formattedDate;
// }

module.exports = {
  formatDateHandle,
  formatDayHandle,
  formatFromObjectToDate,
  formatTimeHandle,
  // formatFromDatetoObject
};
