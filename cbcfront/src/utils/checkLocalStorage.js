import setAuthToken from "./setAuthToken";
const checkLocalStorage = (jwtDecode) => {
  let decoded;
  if (localStorage.getItem("jwtToken")) {
    setAuthToken(localStorage.getItem("jwtToken"));
    decoded = jwtDecode(localStorage.getItem("jwtToken")) || false;
  }
  return { decoded, expired: decoded?.exp < Date.now() / 1000 };
};

export default checkLocalStorage;
