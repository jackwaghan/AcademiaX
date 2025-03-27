export function getCurrentDate() {
  return new Date().getDate().toString().padStart(2, "0"); // Ensure "02" instead of "2"
}
