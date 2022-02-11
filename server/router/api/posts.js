const router = require('express').Router();
const {
	models: { Post },
} = require('../../db');

// GET /api/posts/:postId
router.get('/:id', async (req, res, next) => {
	try {
		const post = await Post.findOne({
			where: {
				id: req.params.id,
			},
		});
		res.send(post);
	} catch (error) {
		next(error);
	}
});

module.exports = router;
