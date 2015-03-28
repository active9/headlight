var npid = require('npid'),
    fs = require('fs'),
    path = require('path'),
    child_process = require('child_process');

var cmd = process.argv.slice(2,process.argv.length);
console.log("CMD:",cmd);
    
	var pidfile = path.resolve(path.dirname(cmd) +'/app.pid');
	try {
		var pid = npid.create(pidfile);
		var expid = require('rpid')(pidfile);
		pid.removeOnExit();

		var spawn = require('child_process').spawn;
		var child = spawn('node', cmd,  {
		    cwd: path.resolve(path.dirname(cmd)),
		    detached: false
		});

	} catch (err) {
		console.log("Error: ", err);
		var pidpid = require('rpid')(pidfile);
		if (pidpid>1) {
			console.log("Error: "+ cmd +" is  already running on pid", pidpid);
			process.exit(1);
		} else {
			console.log("Missing Pid: Clearing The Pid File");
			fs.unlink(pidfile);
		}
	}