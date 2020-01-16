import React, { useState } from 'react'

const Counter = (props) => {

	const [count, setCount] = useState(0)

	const increment = () => {
		setCount(count++)
	}

	return (
			<div>
				<button className="counter-button" onClick={() => increment()}>
					Clicked: {count}
				</button>
			</div>
	)
}

export default Counter
