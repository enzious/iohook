const fs = require('fs');
const path = require('path');
const pump = require('pump');
const tfs = require('tar-fs');
const zlib = require('zlib');

// Passsing directoryPath and callback function
fs.readdir(path.join(__dirname, 'prebuilds'), function (err, files) {
    // Handling error
    if (err) {
        throw new Err('Unable to scan directory: ' + err);
    }

    const regex = new RegExp(/^iohook-v[0-9]+\.[0-9]+\.[0-9]+(?:-dev)-(electron|node)-(v[0-9]+)-([a-zA-Z0-9]+-x64).tar.gz$/);

    // Listing all files using forEach
    files.forEach(function (file) {
        const matches = file.match(regex)

        if (!matches) {
            return;
        }

        const buildName = `${matches[1]}-${matches[2]}-${matches[3]}`;

        // Do whatever you want to do with the file
        console.log(file, '>', buildName);

        let options = {
          readable: true,
          writable: true,
          hardlinkAsFilesFallback: true
        };

        let targetFile = path.join(__dirname, 'builds', buildName);
        console.log('Destination:', targetFile);
        let extract = tfs.extract(targetFile, options);
        pump(
            fs.createReadStream(path.join(__dirname, 'prebuilds', file)),
            zlib.createGunzip(),
            extract,
            function(err) {
                if (err) {
                    console.log('Error:', err);
                }
            }
        );
    });
});