if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const app = require('./app');
const { db } = require('./db');
// const HOST = process.env.HOST ?? '127.0.0.1';
// const PORT = process.env.PORT ?? 8085;

const startServer = async () => {
  // START EXPRESS SERVER
  try {
    await db.sync();

    app.listen(() => {
      // console.log(`Express Server listening at https://${HOST}:${PORT}\n...`);
      console.log('Express Server listening on Elastic Beanstalk instance...');
    });
  }
  catch (err) {
    console.log(err.stack);
  }
};

startServer();
