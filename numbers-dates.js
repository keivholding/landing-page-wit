//
//
// this functon returns a formatted number (us locale)
//
//

const getFormattedNumber = function (num) {
  const formattedNumber = new Intl.NumberFormat("en-US").format(num);

  return formattedNumber;
};

//
//
// this functon returns a formatted number (us locale) --> i.e. 1,302
//
//

//
//
// this function gets the formatted date (us locale) --> i.e. April 1 2023
//
//

const getFormattedDate = function (date) {
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date));

  return formattedDate;
};

//
//
// this function gets the formatted date (us locale) --> i.e. April 1 2023
//
//

//
//
// this function finds the difference between today's date and the given date
//
//

const getDateDifference = function (date) {
  const currentDate = new Date().getTime();
  const oldDate = new Date(date).getTime();

  // this calculates the difference (in days) between today's date and the old date
  const difference = Math.floor((currentDate - oldDate) / 1000 / 60 / 60 / 24);

  // if the difference between today and date is 0, then return today, else if it is greater than 0 and less than 14, return x days ago, else call get formatted date and return the actual date
  if (difference === 0) {
    return `Today`;
  } else if (difference > 0 && difference < 14) {
    return `${difference} days ago`;
  } else {
    return getFormattedDate(date);
  }
};

//
//
// this function finds the difference between today's date and the given date
//
//
