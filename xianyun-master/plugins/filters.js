function dateformat(time) {
  var newDate = new Date(time);
  let year = newDate.getFullYear();
  let month = newDate.getMonth();
  month = month < 10 ? "0" + month : month;
  let day = newDate.getDate();
  day = day < 10 ? "0" + day : day;
  let hour = newDate.getHours();
  hour = hour < 10 ? "0" + hour : hour;
  let minute = newDate.getMinutes();
  minute = minute < 10 ? "0" + +minute : minute;
  return year + "-" + month + "-" + day + "  " + hour + ":" + minute;
}

export default dateformat;
