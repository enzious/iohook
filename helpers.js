const path = require('path');
const process = require('process');
const fs = require('fs');

/**
 * Return options for iohook from package.json
 * @return {Object}
 */
function optionsFromPackage(attempts) {
  attempts = attempts || 2;
  let mainPath = Array(attempts).join('../');
  const nextPath = path.join(process.cwd(), mainPath, 'package.json');
  //const nextPath = path.join(__dirname, mainPath, 'package.json');
  if (attempts > 5) {
    console.log("Can't resolve main package.json file from", __dirname, '- to', nextPath);
    return {
      targets: [],
      platforms: [process.platform],
      arches: [process.arch],
    };
  }
  try {
    const content = fs.readFileSync(
      nextPath,
      'utf-8'
    );
    const packageJson = JSON.parse(content);
    const opts = packageJson.iohook || {};
    if (!opts.targets) {
      opts.targets = [];
    }
    if (!opts.platforms) opts.platforms = [process.platform];
    if (!opts.arches) opts.arches = [process.arch];
    return opts;
  } catch (e) {
    return optionsFromPackage(attempts + 1);
  }
}

function printManualBuildParams() {
  const runtime = process.versions['electron'] ? 'electron' : 'node';
  const essential =
    runtime +
    '-v' +
    process.versions.modules +
    '-' +
    process.platform +
    '-' +
    process.arch;
  const modulePath = path.join(
    __dirname,
    'builds',
    essential,
    'build',
    'Release',
    'iohook.node'
  );
  console.info(
    `Runtime: ${runtime} ABI: ${process.versions.modules} Platform: ${process.platform} ARCH: ${process.arch}`
  );
  console.info('The path is:', modulePath);
}

module.exports = { optionsFromPackage, printManualBuildParams };
