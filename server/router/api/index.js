const router = require('express').Router();
module.exports = router;

// Route Middlewares
router.use('/items', require('./items'));
router.use('/posts', require('./posts'));

// ERROR HANDLER
router.use((req, res, next) => {
  const err = new Error('404: Not Found');
  err.status = 404;
  next(err);
});
