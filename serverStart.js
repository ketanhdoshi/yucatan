// Skip the first two arguments (ie. "node" and "serverStart.js")
// Pass the 'app' argument when starting the server module
var args = process.argv.slice(2);
var app = args[0];

// !!!!!! Comment out now for apisrv. Otherwise the code becomes totally different
// after babel and debugging breakpoints shift to different lines of code. 
// We do need babel for websrv. So Need a better way to start two servers
// require('@babel/register');
require('./server')(app);
