const authenticate = (req, res, next) => {
  console.log('Authenicating....');
  next();
}

module.exports = authenticate;