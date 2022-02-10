const router = require('express').Router();
const {
	models: { Choice, User },
} = require('../../db');

module.exports = router;

//POST /api/choices -> create choice for specified user and item
router.post('/', async (req, res, next) => {
	try {
		const choice = await Choice.create(req.body);
		res.send(choice);
	} catch (e) {
		next(e);
	}
});

//GET /api/choices/:postId
router.get('/:postId', async (req, res, next) => {
	try {
		const choices = await Choice.findAll({
			where: { postId: req.params.postId },
			include: User,
		});
		sortedChoices = choices.sort((a, b) => a.id - b.id);
		res.send(sortedChoices);
	} catch (e) {
		next(e);
	}
});
