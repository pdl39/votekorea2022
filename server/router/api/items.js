const router = require('express').Router();
const {
	models: { Item },
} = require('../../db');

// // GET /api/items/?postId={postId}&isRequested=true
// router.get('/', async (req, res, next) => {
// 	const postId = req.query.postId;
// 	const isRequested = req.query.isRequested;

// 	try {
// 		const requestedItems = await Item.findAll({
// 			where: {
// 				postId,
// 				isRequested,
// 			},
// 		});
// 		res.send(requestedItems);
// 	} catch (error) {
// 		next(error);
// 	}
// });

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

// PUT /api/items/:postId
router.put('/:postId', async (req, res, next) => {
	try {
		// Get single item
		const item = await Item.findByPk(req.body.id);
		// Update single item
		await item.update({
			isRequested: req.body.isRequested,
		});
		res.sendStatus(200);
	} catch (error) {
		next(error);
	}
});

module.exports = router;
