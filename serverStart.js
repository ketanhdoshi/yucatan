// Skip the first two arguments (ie. "node" and "serverStart.js")
// Pass the 'app' argument when starting the server module
var args = process.argv.slice(2);
var app = args[0];

require('@babel/register');
require('./server')(app);
