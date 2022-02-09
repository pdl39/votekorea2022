const util = require('util');
const exec = util.promisify(require('child_process').exec);

const runCommand = async (command) => {
  try {
    const response = await exec(command);
    return response.stdout;
  }
  catch (err) {
    throw err;
  }
};

module.exports = runCommand;
