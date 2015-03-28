var headlight = require('../index.js');

if (headlight.stop(__dirname)) {
	console.log("Stopped..");
} else {
	console.log("Stop Failed. Is the application running?");
}

