require("dotenv").config();

const wrapAsync = (func) => {
  return function (req, res, next) {
    func(req, res, next).catch(next);
  };
};

module.exports = {
    wrapAsync
}
