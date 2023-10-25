// This script is released to the public domain and may be used, modified and
// distributed without restrictions. Attribution not necessary but appreciated.
// Source: https://weeknumber.com/how-to/javascript

// Returns the ISO week of the date.
Date.prototype.getWeek = function () {
  var date = new Date(this.getTime());
  date.setHours(0, 0, 0, 0);
  date.setDate(date.getDate() + 3 - ((date.getDay() + 6) % 7));
  var week1 = new Date(date.getFullYear(), 0, 4);
  return (
    1 +
    Math.round(
      ((date.getTime() - week1.getTime()) / 86400000 -
        3 +
        ((week1.getDay() + 6) % 7)) /
        7
    )
  );
};

// Returns the four-digit year corresponding to the ISO week of the date.
Date.prototype.getWeekYear = function () {
  var date = new Date(this.getTime());
  date.setDate(date.getDate() + 3 - ((date.getDay() + 6) % 7));
  return date.getFullYear();
};

// ==========

String.prototype.fillZero = function (width) {
  return this.length >= width
    ? this
    : new Array(width - this.length + 1).join("0") + this; //남는 길이만큼 0으로 채움
};

//숫자 프로토타입으로 입력 길이만큼 앞에 0을 채운 문자열 반환
Number.prototype.fillZero = function (width) {
  let n = String(this);
  return n.length >= width ? n : new Array(width - n.length + 1).join("0") + n;
};

// ==========

const getYearWeek = () => {
  const date = new Date("2022/01/06");
  const year = date.getWeekYear();
  let week = date.getWeek().fillZero(2);

  return `${year}.${week}` + date.getWeek();
};

const run = () => {
  console.log(getYearWeek());
};

run();
