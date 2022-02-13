const path = require('path');
const express = require('express');
const logger = require('morgan')('dev');
const app = express();
const appDir = require('fs').realpathSync(process.cwd());


// MIDDLEWARES
app.use(logger); // logging
app.use(express.json()); // body-parsing
app.use(express.urlencoded({ extended: false }));

// ROUTES
// Add your routes here and uncomment. For example:
app.use('/api', require('./router/api'));
app.use('/kakaoauth', require('./router/kakaoauth'));
// ...
// */

app.get('/', (req, res, next) => {
  try {
    res.sendFile(path.join(appDir, 'dist/index.html'));
  }
  catch (err) {
    next(err);
  }
});

// STATIC-FILE SERVE
app.use(express.static(path.resolve(appDir, 'dist')));
app.use(express.static(path.resolve(appDir, 'src')));

// any remaining requests with an extension (.js, .css, etc.) send 404
app.use((req, res, next) => {
	if (path.extname(req.path).length) {
		const err = new Error('Not found');
		err.status = 404;
		next(err);
	} else {
		next();
	}
});

// FALLBACK HANDLER
app.get('*', (req, res, next) => {
  try {
    const indexHtml = path.resolve(appDir, 'dist/index.html');
    const fallbackHtml = path.resolve(appDir, 'src/fallback.html');

    if (indexHtmlPath) {
      res.sendFile(indexHtml);
    }
    else {
      res.sendFile(fallbackHtml);
    }
  }
  catch (err) {
    next(err);
  }
});

// ERROR HANDLER
app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(err.status ?? 500).send(err.message ?? 'Internal server error.');
});


module.exports = app;
