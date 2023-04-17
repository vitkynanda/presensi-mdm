import { toast } from "react-toastify";
import { format } from "date-fns";
import * as XLSX from "xlsx";
import { Timestamp } from "firebase/firestore";

const exportExcel = (data) => {
  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.json_to_sheet(data);
  XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
  XLSX.writeFile(wb, "export.xlsx");
};

const formatDate = (value, type) => {
  var d = new Date(value),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return type === "local"
    ? [day, month, year].join("-")
    : [year, month, day].join("-");
};

const responseHandler = (res, { onSuccess, onError }) => {
  if (res?.RESPONSE?.STATUS_CODE === 200)
    onSuccess({ data: res.RESPONSE.DATA, response: res.RESPONSE });

  if (!res.RESPONSE || res?.RESPONSE?.STATUS_CODE > 200)
    onError({
      message: res.RESPONSE ? res.RESPONSE.RESPONSE_MESSAGE : res.message,
      response: res.RESPONSE,
    });
};

const convertBase64 = (type, val) =>
  type === "encode" ? btoa(val) : atob(val);

const updateThemeStorage = (key, val) => {
  let currentStorage = JSON.parse(themeStorage);
  if (!currentStorage) currentStorage = {};
  currentStorage[key] = val;
  localStorage.setItem("themeStorage", JSON.stringify(currentStorage));
  return val;
};

const validateInputField = (input) => {
  const mandatoryList = [
    "username",
    "password",
    "role_id",
    "phone_number",
    "bank_name",
    "account_number",
    "category",
    "ammount",
    "old_password",
    "new_password",
    "status",
    "type_id",
    "bank_id",
  ];

  const validate = (input, message) => {
    for (let [key, val] of Object.entries(input)) {
      if (!val && mandatoryList.includes(key)) {
        toast.error(message || `${formatKey(key)} is required !`);
        return false;
      }
    }
    return true;
  };

  if (input.length) {
    let valToValidate = {};
    for (let value of input) {
      valToValidate["VALUE"] = value.VALUE;
    }
    return validate(valToValidate, "All inputs must be filled in !");
  } else {
    return validate(input);
  }
};

const upperFirstChar = (val) => val.charAt(0).toUpperCase() + val.slice(1);

const formatKey = (key) =>
  key
    .split("_")
    .map((val) => upperFirstChar(val))
    .join(" ");

const inputType = (val) => {
  return val.includes("index") ||
    val.includes("number") ||
    val.includes("balance")
    ? "number"
    : val.includes("password")
    ? "password"
    : "text";
};

const toastErrorMessage = (res) =>
  (typeof res.error === "string"
    ? res.error
    : res.message || `${res.error[0].field}, ${res.error[0].message}`) ||
  "Something went wrong";

const formatDateID = (date) => {
  const dateJS = new Date(date);
  return format(dateJS, "EEE, dd LLL yyyy, HH:mm");
};

const currencyFormat = (format, number, withDecimal = true) => {
  let result = 0;
  if (typeof number === "number") {
    if (withDecimal) {
      result = new Intl.NumberFormat(format, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(number);
    } else {
      result = new Intl.NumberFormat(format).format(number);
    }
  }

  switch (format) {
    case "ID":
      return `Rp${result}`;
    default:
      return result;
  }
};

const countTotalBalance = (coins) =>
  coins.reduce((acc, curr) => acc + curr.balance, 0);

const filterNonAdminRoutes = (routes) =>
  routes.filter((route) => nonAdminRoutes.includes(route.route));

const nonAdminRoutes = ["/profile"];

const themeStorage = localStorage.getItem("themeStorage");

const successStatus = [200, 201];

const currencyFormatList = ["ammount", "balance", "admin_fee"];

const transformTimeStamp = (timestamp) => new Date(timestamp * 1000);

const validateClockOut = (clock_in, clock_out) =>
  new Date(clock_in.seconds * 1000 + 8 * 3600 * 1000) <= Date.now();

export {
  validateClockOut,
  formatDate,
  transformTimeStamp,
  responseHandler,
  convertBase64,
  updateThemeStorage,
  inputType,
  formatKey,
  upperFirstChar,
  validateInputField,
  toastErrorMessage,
  formatDateID,
  currencyFormat,
  exportExcel,
  filterNonAdminRoutes,
  countTotalBalance,
  themeStorage,
  successStatus,
  currencyFormatList,
};

export function getUUID() {
  // eslint gets funny about bitwise
  /* eslint-disable */
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const piece = (Math.random() * 16) | 0;
    const elem = c === "x" ? piece : (piece & 0x3) | 0x8;
    return elem.toString(16);
  });
  /* eslint-enable */
}

export function getLocation(setLocation) {
  if (navigator.permissions) {
    navigator.permissions
      .query({
        name: "geolocation",
      })
      .then((permission) => {
        if (permission.state !== "granted") {
          return "Please allow geolocation access";
        }
      });
  }
  if (navigator.geolocation) {
    return navigator.geolocation.getCurrentPosition(setLocation);
  } else {
    return "Geolocation is not supported by this browser.";
  }
}

export const getPresenceToday = (presenceInfo) => {
  const now = new Date();
  const todayMidnight = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    0,
    0,
    0,
    0
  );

  const [todayPresence] =
    presenceInfo &&
    presenceInfo.filter(
      (presence) => presence?.clock_in >= Timestamp.fromDate(todayMidnight)
    );
  return todayPresence;
};

export const weekday = [
  "Minggu",
  "Senin",
  "Selasa",
  "Rabu",
  "Kamis",
  "Jumat",
  "Sabtu",
];

export function arePointsNear(checkPoint, centerPoint, km = 70) {
  var ky = 40000 / 360;
  var kx = Math.cos((Math.PI * centerPoint.lat) / 180.0) * ky;
  var dx = Math.abs(centerPoint.lng - checkPoint.lng) * kx;
  var dy = Math.abs(centerPoint.lat - checkPoint.lat) * ky;
  return Math.sqrt(dx * dx + dy * dy) <= km / 1000;
}
