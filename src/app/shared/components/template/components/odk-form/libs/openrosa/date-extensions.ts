// imported from https://github.com/enketo/enketo-xpathjs/blob/master/src/date-extensions.js
// TODO probably shouldn't be changing Date.prototype - when these can be safely removed,
// these functions would probably more appropriately be in utils/date.js

/**
 * Consistent with JavaRosa, the following should produce an empty string:
 *
 * - `date('')`
 * - `format-date('')`
 * - `format-date(date(''))`
 *
 * Conversions of `date('')` to a number is still invalid. This behavior
 * deviates from JavaRosa by producing 'Invalid Date' rather than `NaN`,
 * for consistency with historical behavior.
 */
export class BlankDate extends Date {
  constructor() {
    super(NaN);
  }

  toString() {
    return "";
  }
}

/**
 * Converts a native Date UTC String to a RFC 3339-compliant date string with local offsets
 * used in ODK, so it replaces the Z in the ISOstring with a local offset
 * @param {Date} date
 * @return {string} a datetime string formatted according to RC3339 with local offset
 */
export const toISOLocalString = (date) => {
  //2012-09-05T12:57:00.000-04:00 (ODK)

  if (["Invalid Date", ""].includes(date.toString())) {
    return date.toString();
  }

  var dt = new Date(date.getTime() - date.getTimezoneOffset() * 60 * 1000)
    .toISOString()
    .replace("Z", getTimezoneOffsetAsTime(date));

  if (dt.indexOf("T00:00:00.000") > 0) {
    return dt.split("T")[0];
  } else {
    return dt;
  }
};

/**
 * @param {Date} date
 * @return {string}
 */
export const getTimezoneOffsetAsTime = (date) => {
  var offsetMinutesTotal;
  var hours;
  var minutes;
  var direction;
  var pad2 = function (x) {
    return x < 10 ? "0" + x : x;
  };

  if (date.toString() === "Invalid Date") {
    return date.toString();
  }

  offsetMinutesTotal = date.getTimezoneOffset();

  direction = offsetMinutesTotal < 0 ? "+" : "-";
  hours = pad2(Math.floor(Math.abs(offsetMinutesTotal / 60)));
  minutes = pad2(Math.floor(Math.abs(offsetMinutesTotal % 60)));

  return direction + hours + ":" + minutes;
};

// /**
//  * @deprecated
//  * @see {toISOLocalString}
//  */
// Date.prototype.toISOLocalString = function() {
//   return toISOLocalString(this);
// };

// /**
//  * @deprecated
//  * @see {getTimezoneOffsetAsTime}
//  */
// Date.prototype.getTimezoneOffsetAsTime = function() {
//   return getTimezoneOffsetAsTime(this);
// };

// module.exports = {
//   BlankDate,
//   getTimezoneOffsetAsTime,
//   toISOLocalString,
// };
