const fs = require('fs-extra');

async function copySharedStyles() {
  try {
    await fs.copy('./public', './apps/westfield-rise/public');
    console.log('Shared styles have been copied successfully.');
  } catch (err) {
    console.error(err);
  }
}

copySharedStyles();