export default function getDateInFormat(date, options = {}) {
  if (options.days) {
    return getTotalDays(date);
  }
  date = new Date(date);
  return /invalid/gi.test(date.toString())
    ? ""
    : date.toLocaleDateString("en-CA").toString().replace(/-/gi, "/");
}

function getTotalDays(date) {
  const formatter = new Intl.RelativeTimeFormat("en");
  const diff = new Date() - new Date(date);
  let x = formatter.format(-diff / (1000 * 60 * 60 * 24), "days");
  return x;
}
