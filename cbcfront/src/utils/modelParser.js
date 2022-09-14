export default function modelParser(model) {
  return JSON.parse(window.sessionStorage.getItem(model));
}
