This is a sample application that doesn't need `magic-script-cli` or even node.js at all to build.

It does require Linux os MacOS and doesn't support importing node modules at all.

The purpose is to document the minimal requirements for apps independent of the rollup parts of the build system.

To test, simply open two terminals, and on one run `make log` to keep a persistent log open.  In another run `make run` to build, install 
and run the application.

If you wish to use inspector, run the `make debug` command and paste the url printed into chrome.

Also since this uses the same port as node.js, you can go to chrome://inspect and click on "Use dedicated DevTools for Node" for a more 
seamless debugging experience.