module.exports = (distance, type = 0) => {
  // pending
  let price = distance * (process.env.PPK || 2); // price per kilometer is a global factor
  price += type * 5;
  return price;
};
