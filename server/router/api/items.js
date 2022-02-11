const router = require('express').Router();
const {
	models: { Item },
} = require('../../db');

// GET /api/items/:postId
router.get('/:postId', async (req, res, next) => {
	try {
		const items = await Item.findAll({
			where: {
				postId: req.params.postId,
			},
		});
		sortedItems = items.sort((a, b) => a.itemOrder - b.itemOrder);
		res.send(sortedItems);
	} catch (error) {
		next(error);
	}
});

module.exports = router;
