if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const app = require('./app');
const HOST = process.env.HOST ?? '127.0.0.1';
const PORT = process.env.PORT ?? 8085;
const { db } = require('./db');

const startServer = async () => {
  // START EXPRESS SERVER
  try {
    await db.sync();

    app.listen(PORT, () => {
      console.log(`Express Server listening at http://${HOST}:${PORT}\n...`);
    });
  }
  catch (err) {
    console.log(err);
    console.log(err.stack);
  }
};

startServer();
