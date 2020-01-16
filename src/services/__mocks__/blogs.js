const blogs = [
	{
		"comments": [],
		"title": "Test title one",
		"author": "Hank \'tester\' Hill",
		"url": "other.url",
		"likes": 0,
		"user": {
				"_id": "5dfcda4e43b3bd1e4c39ed06",
				"username": "Hank 'tester' Hill",
				"id": "5dfcda4e43b3bd1e4c39ed06"
		},
		"id": "5e021b34a225dc2d48382543"
	},
	{
		"comments": [],
		"title": "Test title two",
		"author": "John Doe",
		"url": "some.url",
		"likes": 0,
		"user": {
				"_id": "5e023a913298240004fdc978",
				"username": "John \'Default\' Doe",
				"id": "5e023a913298240004fdc978"
		},
		"id": "5e023afc3298240004fdc97a"
	}
]

const getAll = () => {
	return Promise.resolve(blogs)
}

export default { getAll }
