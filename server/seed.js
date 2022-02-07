
const {
	db,
	models: { User, Category, Post, Item },
} = require('./db');
const { users, categories, posts, items } = require('./seedData');

const seed = async () => {
	try {
		if (process.env.NODE_ENV === 'production') {
			await db.sync();
		}
    else {
      await db.sync({ force: true });
    }

		const userInstances = [];
		const categoryInstances = [];
		const postInstances = [];
		const itemInstances = [];

    // CREATE MODEL INSTANCES
		//create users
		for (const userInstance of users) {
			try {
				const newUserInstance = await User.create(userInstance);
				userInstances.push(newUserInstance);
			} catch (err) {
				console.log(err);
			}
		}

		//create categories
		for (const categoryInstance of categories) {
			try {
				const newCategoryInstance = await Category.create(categoryInstance);
				categoryInstances.push(newCategoryInstance);
			} catch (err) {
				console.log(err);
			}
		}

		//create posts
		for (const postInstance of posts) {
			try {
				const newPostInstance = await Post.create(postInstance);
				postInstances.push(newPostInstance);
			} catch (err) {
				console.log(err);
			}
		}

		// create items
		for (const itemInstance of items) {
			try {
				const newItemInstance = await Item.create(itemInstance);
				itemInstances.push(newItemInstance);
			} catch (err) {
				console.log(err);
			}
		}

    // CREATE ASSOCIATIONS
		//category-post associations
		try {
			await categoryInstances[0].setPost(postInstances[0]);
		} catch (err) {
			console.log(err);
		}
		//post-item associations
		try {
      const post1Items = [];
      for (let i = 0; i < 5; i++) {
        post1Items.push(itemInstances[i]);
      };

			await postInstances[0].setItems(post1Items);
		} catch (err) {
			console.log(err);
		}
	} catch (err) {
		console.log(err);
	}
};

module.exports = seed;
// If this module is being required from another module, then we just export the
// function, to be used as necessary. But it will run right away if the module
// is executed directly (e.g. `node seed.js` or `npm run seed`)
if (require.main === module) {
	seed()
		.then(() => {
			console.log('Seeding success!');
			db.close();
		})
		.catch(err => {
			console.error('Oh no! Something went wrong!');
			console.error(err);
			db.close();
		});
}
