import React, { useState } from 'react'
import Basic from './Basic'
import Counter from './Counter'
import TestHook from '../hooks/TestHook'
import TestHookContext from './TestHookContext'
import Context from '../store/context'

const TestParent = () => {
	const [state, setState] = useState('Some Text')
	const [name, setName] = useState('Moe')

	const changeText = () => {
		setState('Some Other Text')
	}

	const changeName = () => {
		setName('Steve')
	}

	return (
		<>
			<div className="App">
				<Basic />
			</div>
			<h1> Counter </h1>
			<Counter />
			<h1> Basic Hook useState </h1>
			<TestHook name={name} changeName={changeName}/>
			<h1>Basic hook useContext</h1>
			<Context.Provider
				value={{ changeTextProp: changeText,
					stateProp: state
				}} >
				<TestHookContext />
			</Context.Provider>
		</>
	)
}

export default TestParent
