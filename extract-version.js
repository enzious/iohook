const process = require('process');
const { exec } = require("child_process");

const packageVersion = process.argv[2].substr(1);

exec('npm version "' + packageVersion + '" --no-git-tag-version');
