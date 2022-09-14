console.clear();
// fetch("localhost:3000").then(console.log);
//   .then((response) => response)

// const { isEmail } = require("validator");
// console.log(isEmail("sh@gmail.com"));

// Object.keys({ name, email, password }).forEach((element) => {
//   if (isEmpty(req.body[element])) errors[element] = element + " is required";
// });

const User = require("./models/User");

const newUser = new User({
  name: "sharanam",
  email: "s@mom",
  phone: "1212121212",
  password: 123,
});

newUser
  .save()
  .then((USER) => {
    console.log("success");
    console.log("then", USER);
  })
  .catch(function (err) {
    console.log({ success: false, err: err.message });
  });
