import { useState, useRef } from 'react'

export const useField = (type) => {
	const [value, setValue] = useState('')

	const onChange = (event) => {
		setValue(event.target.value)
	}

	const reset = () => {
		setValue('')
	}

	return {
		type,
		value,
		onChange,
		reset
	}
}

export const useScroll = () => {
	const htmlElRef = useRef(null)
	const executeScroll = () => htmlElRef.current.scrollIntoView()

	return [executeScroll, htmlElRef]
}
