import React, { useState, useEffect } from 'react'
import axios from 'axios'

//<TestAxios url='https://jsonplaceholder.typicode.com/posts/1' />

const TestAxios = (props) => {
	const [state, setState] = useState()

	useEffect(() => {
		axios.get(props.url)
			.then(res => setState(res.data))
	}, [])


	return (
		<div>
			<h1>Axios Test</h1>
			{state
				? <p data-cy="title">{state.title}</p>
				: <p>...Loading</p>
			}
		</div>
	)
}

export default TestAxios