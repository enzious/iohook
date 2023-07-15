console.log('fug');

const iohook = require('./index');
iohook.start(true);

iohook.on('keydown', (event) => {
  console.log('keydown', event);
});

console.log('fug');
