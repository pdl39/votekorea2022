const router = require('express').Router();
const {
	models: { Choice, Post, User },
} = require('../../db');

//GET /api/choices/?userId={userId}&postId={postId} -> get a user's choice for a post.
router.get('/', async (req, res, next) => {
  console.log('FETCH_CHOICE_API_CALL. USERID: ', req.query);
  try {
    const choice = await Choice.findOne({
      where: {
        userId: req.query.userId,
        postId: req.query.postId
      },
      include: User,
      include: Post
    });
    res.send(choice);
  } catch (error) {
    next(error);
  }
});

//GET /api/choices/:postId -> get all choices across all users for a post
router.get('/:postId', async (req, res, next) => {
	try {
		const choices = await Choice.findAll({
			where: { postId: req.params.postId },
			include: User,
      include: Post
		});
		sortedChoices = choices.sort((a, b) => a.chosenItemId - b.chosenItemId);
    res.send(sortedChoices);
	} catch (error) {
		next(error);
	}
});

//POST /api/choices -> create choice for specified user and post combination
router.post('/', async (req, res, next) => {
	try {
		const choice = await Choice.create(req.body);
		res.send(choice);
	} catch (error) {
		next(error);
	}
});

//DELETE /api/choices/?userId={userId}&postId={postId}
router.delete('/', async (req, res, next) => {
  console.log('PARAMS: ', req);
  try {
    await Choice.destroy({
      where: {
        userId: req.query.userId,
        postId: req.query.postId
      },
    });
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
