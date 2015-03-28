var headlight = require('../index.js');

if (headlight.start(__dirname,__dirname +'/app.js')) {
	console.log("Started..");

	// We Force Kill The Process Here In About 3 Seconds To Break out of our Child Task Runner
	setTimeout(function() {process.exit(1);},3000);
} else {
	console.log("Start Failed..");
}