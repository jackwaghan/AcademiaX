let hour = new Date().getHours();
const date = new Date().getMinutes();

if (hour >= 12) {
  hour = hour - 12;
} else {
  hour = hour;
}
console.log(hour + ":" + date);
