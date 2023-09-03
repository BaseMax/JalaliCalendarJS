/**
 *
 * @Name: Jalali Calendar JS
 * @Author: Max Base
 * @Date: 2023/09/03
 * @Repository: https://github.com/BaseMax/JalaliCalendarJS
 *
 */

// Const variables
const days = {
  1: "شنبه",
  2: "یک شنبه",
  3: "دو شنبه",
  4: "سه شنبه",
  5: "چهار شنبه",
  6: "پنج شنبه",
  7: "جمعه",
};

// Functions
const isLeapYear = (year) => {
  return year % 4 === 3 ? true : false;
};

const daysOfYear = (year) => {
  return isLeapYear(year) ? 366 : 365;
};

const daysOfMonth = (year, month) => {
  if (month > 12 || month < 1) return null;
  else if (month >= 1 && month <= 6) return 31;
  else if (month >= 7 && month <= 11) return 30;
  else if (month === 12) {
    if (isLeapYear(year) === true) return 30;
    return 29;
  }
  return null;
};

const jalaliDate = (year, month, day) => {
  const input = {
    year: year,
    month: month,
    day: day,
  };

  const result = [];
  const array = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];

  if (input["year"] <= 1600) {
    input["year"] -= 621;
    result["year"] = 0;
  } else {
    input["year"] -= 1600;
    result["year"] = 979;
  }

  const temp = input["year"] > 2 ? input["year"] + 1 : input["year"];
  let days =
    (temp + 3) / 4 +
    365 * input["year"] -
    (temp + 99) / 100 -
    80 +
    array[input["month"] - 1] +
    (temp + 399) / 400 +
    input["day"];

  result["year"] += 33 * (days / 12053);
  days %= 12053;
  result["year"] += 4 * (days / 1461);
  days %= 1461;

  if (days > 365) {
    result["year"] += (days - 1) / 365;
    days = (days - 1) % 365;
  }

  result["month"] = days < 186 ? 1 + days / 31 : 7 + (days - 186) / 30;
  result["day"] = 1 + (days < 186 ? days % 31 : (days - 186) % 30);

  return result;
};

const daysOfYearUntilDate = (year, month, day) => {
  let count_days = 0;

  for (let i = 1; i < month; i++) count_days += daysOfMonth(year, i);

  if (day > 31 || count_days + day > daysOfYear(year)) return null;

  count_days += day;

  return count_days;
};

const diffDays = (
  year1,
  month1,
  day1,
  year2,
  month2,
  day2
) => {
  const count_days1 = daysOfYearUntilDate(year1, month1, day1);
  const count_days2 = daysOfYearUntilDate(year2, month2, day2);

  const total_days1 = daysOfYear(year1); // 365 or 366
  const total_days2 = daysOfYear(year2); // 365 or 366

  if (count_days1 === null || count_days2 === null) return null;

  if (year1 === year2) return Math.abs(count_days2 - count_days1);
  else if (year1 > year2) {
    const rem_year2 = total_days2 - count_days2;
    let sum = 0;

    for (let i = year2 + 1; i < year1; i++) sum += daysOfYear(i);

    return rem_year2 + count_days1 + sum;
  } else if (year1 < year2) {
    const rem_year1 = total_days1 - count_days1;
    let sum = 0;

    for (let i = year1 + 1; i < year2; i++) sum += daysOfYear(i);

    return rem_year1 + count_days2 + sum;
  }

  return -1;
};

const firstDayOfYear = (year) => {
  const default_day = 3; // دو شنبه
  const diff = diffDays(year, 1, 1, 1401, 1, 1);

  const day = (default_day + diff) % 7;

  if (day === 0) return 7;
  return day;
};

const firstDayOfMonth = (year, month) => {
  const default_day = firstDayOfYear(year);
  const diff = daysOfYearUntilDate(year, month, 1);
  const day = (default_day + diff - 1) % 7;

  if (day === 0) return 7;
  return day;
};
