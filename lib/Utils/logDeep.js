const util = require('util')

module.exports = function logDeep(obj = {}) {
  console.log(util.inspect(obj, false, null, true /* enable colors */))
}
