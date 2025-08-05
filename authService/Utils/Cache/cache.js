const Nodechace = require('node-cache')

const cache = new Nodechace({stdTTL: 300})

module.exports = cache