#!/usr/bin/env node

const { execSync } = require('child_process');

const command = `cd ${__dirname} && pod install`;
console.log(`Directory: ${__dirname}`);
execSync(command);
