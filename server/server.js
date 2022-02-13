if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const app = require('./app');
const { db } = require('./db');

const startServer = async () => {
  // START EXPRESS SERVER
  try {
    await db.sync();

    app.listen(8080, () => {
      console.log('Express Server listening on Elastic Beanstalk instance...');
    });
  }
  catch (err) {
    console.log(err.stack);
  }
};

startServer();
