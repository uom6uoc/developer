"use strict";
const path = require("path");
const rootPath = path.resolve();
const ciqlJson = require(`ciql-json`);

switch (process.env.SERVICE) {
  case "onair.v1":
    break;
  default:
    break;
}

let packageFile = undefined;

if (process.env.REPOSITORY && process.env.SERVICE) {
  packageFile = `${rootPath}/../${process.env.REPOSITORY}/services/${process.env.SERVICE}/package.json`;
} else {
  throw new Error("process.env.SERVICE_PATH를 찾을 수 없습니다!");
}

// ========================
// version-updater
// ========================

const getWeekNumber = (d) => {
  const firstOfYear = new Date(d.getFullYear(), 0, 1);
  const days = Math.floor((d - firstOfYear) / (24 * 60 * 60 * 1000));
  return Math.ceil((d.getDay() + 1 + days) / 7);
};

const getVersion = async () => {
  const date = new Date();
  const year = date.getFullYear().toString();
  let week = getWeekNumber(date).toString();
  if (week.length === 1) {
    week = "0" + week;
  }
  const { data } = await ciqlJson.open(packageFile).extract("{version}");
  const array = data.version.split(".");

  if (array[0] === year && array[1] === week) {
    const number = (parseInt(array[2]) + 1).toString().padStart(3, 0);
    return `${year}.${week}.${number}`;
  } else {
    return `${year}.${week}.001`;
  }
};

const run = async () => {
  const version = await getVersion();
  ciqlJson
    .open(packageFile)
    .set("version", version)
    .saveWithTabsize(null, 2, true);
  console.log(version);
};

run();
