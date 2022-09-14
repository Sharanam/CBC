function sendEmail(payload, res = null) {
  console.clear();
  console.log("email to: ", payload);
  if (!res) return true;
  return res.json({ msg: "Email sent" });
}

module.exports = {
  sendEmail,
};
