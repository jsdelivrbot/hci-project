var Stream = require('stream-browserify')
var Writable = require("./lib/_stream_writable.js")

if (process.env.READABLE_STREAM === 'disable') {
  module.exports = Stream && Stream.Writable || Writable
} else {
  module.exports = Writable
}
