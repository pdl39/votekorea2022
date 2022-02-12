const router = require('express').Router();
const Choice = require('../../db/models/Choice');
const Item = require('../../db/models/Item');
const hexToDec = require('../../utils/hexToDec');


//GET /api/result_data/:postId -> get processed result data to display as chart
router.get('/:postId', async (req, res, next) => {
	try {
		const choices = await Choice.findAll({
			where: {
				postId: req.params.postId
			}
		});

		const items = await Item.findAll({
			where: {
				postId: req.params.postId,
				isValid: true
			}
		});

		const resultData = {
			items: {},
			totalChoiceCount: choices.length
		};

		for (let i = 0; i < items.length; i++) {
			resultData.items[items[i].id] = {};
			resultData.items[items[i].id].itemId = items[i].itemId;
			resultData.items[items[i].id].itemOrder = items[i].itemOrder;
			resultData.items[items[i].id].name = items[i].name;
			resultData.items[items[i].id].choiceCount = 0;

			// Convert item's hex color to individual decimal R, G, B
			const hexColorR = items[i].bgColor.substring(1, 3);
			const hexColorG = items[i].bgColor.substring(3, 5);
			const hexColorB = items[i].bgColor.substring(5);

			resultData.items[items[i].id].colorR = hexToDec(hexColorR);
			resultData.items[items[i].id].colorG = hexToDec(hexColorG);
			resultData.items[items[i].id].colorB = hexToDec(hexColorB);
		}

		// Get choice count for each item.
		choices.forEach(choice => resultData.items[choice.chosenItemId].choiceCount++);

		// Convert items object to array before sending.
		resultData.items = Object.values(resultData.items).sort((a, b) => a.itemOrder - b.itemOrder);

    res.json(resultData);
	} catch (error) {
		next(error);
	}
});

module.exports = router;
