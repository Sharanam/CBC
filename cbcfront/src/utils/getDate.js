export default function getDateInFormat(date) {
  return new Date(date)
    .toLocaleDateString("en-CA")
    .toString()
    .replace(/-/gi, "/");
}
