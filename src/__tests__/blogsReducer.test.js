import blogsReducer from '../reducers/blogsReducer'
import blogsData from '../__mocks__/testBlogs'
import singleBlog from '../__mocks__/singleTestBlog'


describe('Blogs reducer', () => {
	test('returns default state', () => {
		const defaultState = blogsReducer(undefined, {})

		expect(defaultState).toEqual([])
	})

	test('returns new state if receiving type', () => {
		const newState = blogsReducer(undefined, {
			type: 'INIT_BLOGS',
			data: blogsData
		})

		expect(newState).toHaveLength(2)
	})

	test('increases the amount of likes for the given blog', () => {
		const changedState = blogsReducer(blogsData, {
			type: 'ADD_LIKE',
			data: blogsData[0] // first blog in the array
		})

		// first blog in array with increased number of likes
		expect(changedState[0].likes).toEqual(1)
	})

	test('adds new blog', () => {
		const newState = blogsReducer(blogsData, {
			type: 'CREATE_BLOG',
			data: singleBlog
		})

		expect(newState.length).toBe(blogsData.length + 1)
	})

	test('deletes blog', () => {
		// id of the blog to delete
		// first blog in the array in this case
		const id = blogsData[0].id
		const newState = blogsReducer(blogsData, {
			type: 'DELETE_BLOG',
			data: id
		})

		expect(newState.length).toBe(blogsData.length - 1)
	})

	test('adds comment to the blog', () => {
		const newComment = {
			blog: blogsData[0].id,
			content: 'New Jest test comment'
		}

		const newState = blogsReducer(blogsData, {
			type: 'COMMENT',
			data: newComment
		})

		// length of the comments array has increased
		expect(newState[0].comments).toHaveLength(1)
		// comment is added correctly
		expect(newState[0].comments[0].content).toBe(newComment.content)
	})
})
