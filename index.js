var npid = require('npid'),
    system = require('shelljs'),
    fs = require('fs'),
    path = require('path');

var isWin = /^win/.test(process.platform);

module.exports = {

		"start": function(appdir,cmd) {
			return headlight(appdir,'start',cmd);
		},

		"stop":  function(appdir) {
			return headlight(appdir,'stop');
		},

		"status": function(appdir) {
			var pidfile = path.resolve(appdir +'/app.pid');
			var expid = require('rpid')(pidfile);
			if (expid>0) {
				return "Running On Pid "+ expid +"";
			} else {
				return "Not Running..";
			}
		}

}

function headlight(appdir,flag,cmd) {
	if (typeof cmd ==="undefined") {
		cmd = "";
	}
	var processpid = "";
	var pidfile = path.resolve(appdir +'/app.pid');

	if (flag=="start") {
		return start(appdir,pidfile,cmd);
	} else if (flag=="stop") {
		if (stop(appdir,pidfile)) {
			return true;
		} else {
			return false;
		}
	} else if (flag=="restart") {
		return restart(appdir,pidfile,cmd);
	} else {
		return "";
	}
}

function start(appdir,pidfile,cmd) {
	try {
		var spawn = require('child_process').spawn;
		var argument = path.resolve(cmd);
		var headlight = path.resolve(__dirname +'/lib/headlight.js');
		var child = spawn('node', [headlight, argument],  {
		    cwd: path.dirname(argument),
		    detached: true,
		    silent: true
		});

		child.unref();
		return true;
	} catch (err) {
		console.log("Error: ", err);
		var pidpid = require('rpid')(pidfile);
		if (pidpid>1) {
			console.log("Error: "+ appdir +" is  already running on pid", pidpid);
			process.exit(1);
		} else {
			console.log("Missing Pid: Clearing The Pid File");
			fs.unlink(pidfile);
		}
	}
	return false;
}

function stop(appdir,pidfile) {
	var tokill = require('rpid')(pidfile);
	if (tokill<0) {
		console.log("Error: is "+ appdir +" running? Try status", pidfile);
	} else {
		if (!isWin) {
			system.exec('ps -o pid --no-headers --ppid '+ tokill +'', {async:true});
		} else {
			system.exec('taskkill /T /F /pid '+ tokill +'', {async:true});
		}
		fs.unlinkSync(pidfile);
		return true;
	}
	return false;
}
