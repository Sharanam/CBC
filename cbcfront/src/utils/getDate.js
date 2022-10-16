export default function getDateInFormat(date) {
  date = new Date(date);
  return /invalid/ig.test(date.toString()) ? "" :
    date
      .toLocaleDateString("en-CA")
      .toString()
      .replace(/-/gi, "/");
}
