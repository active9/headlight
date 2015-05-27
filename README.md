#Headlight
![enter image description here](https://raw.githubusercontent.com/active9/headlight/master/headlight.png)

Start, Stop, & Status For NodeJS Apps.

#FEATURES
 - Pid based application runner
 - start / stop node js apps
 - app running status
 - command line tty
 - works as a module

#INSTALLING
Using Git:
```bash
git clone https://github.com/active9/headlight
cd headlight
npm install
```

Using NPM:
```bash
npm install headlight -g
```

Once installed headlight has a few command line switches to help get your app running.

App Start
```bash
headlight start 
```

App Stop
```bash
headlight stop
```

App Status
```bash
headlight status
```

The easiest way to start an appliction would be to change to the directory where your nodejs application
resides and type the following:

```bash
headlight start
```

Then to stop your script while within the same directory type in:

```bash
headlight stop
```

You can also run scripts from other directories like this:

```bash
headlight start /path/to/my/app
```

Or like this:

```bash
headlight start /path/to/my/app myscript.js
```

Note: If you do not specify a third argument headlight will attempt to read the package.json file within the directory and load the main script.


#MODULE

Headlight can be included as a nodejs module. The examples folder on the github repo will show you how to programmatically use headlight in your own modules or scripts.

#CONTRIB

Headlight is not designed to replace existing application runners instead you can use it with existing ones or stand-alone. We encourage forking.

#LICENSE
MIT

