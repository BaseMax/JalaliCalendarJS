# Jalali Calendar JS (JavaScript)

This is a JavaScript library that allows you to working with Jalali Calendar system.

## Using

```javascript
console.log(jalaliDate(2022, 12, 5));
console.log(daysOfMonth(1401, 9));
console.log(days[firstDayOfYear(1401)]); // دو شنبه
console.log(days[firstDayOfMonth(1401, 9)]);
```

## Functions

- `en2fa(value)`: Convert a English number to Persian digit characters
- `isLeapYear(year)`: Check a Jalali year is a leap year or not
- `daysOfYear(year)`: Count number of days in a Jalali year
- `daysOfMonth(year, month)`: Count number of month in a Jalali year
- `jalaliDate(yearnull, monthnull, daynull)`: Convert a Gregorian date to Jalali date
- `daysOfYearUntilDate(year, month, day)`: Count number of days until a Jalali date
- `diffDays(year1, month1, day1, year2, month2, day2)`: Count number of days between two Jalali dates
- `firstDayOfYear(year)`: Get first day of a Jalali year
- `firstDayOfMonth(year, month)`: Get first day of a Jalali month

## Authors

- Max Base: Creator
- ...: JS package

© Copyright Max Base, 2022
