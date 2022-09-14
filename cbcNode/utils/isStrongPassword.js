function isStrongPassword(password) {
  return password.match(
    /^(?=.*\d+)(?=.*[A-Z]+)(?=.*[!@#$%^&*()_=+-[\]{};':"\\|,.<>/?]+).{8,}$/
  );
}

module.exports = isStrongPassword;
