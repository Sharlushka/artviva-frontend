import React from 'react'
import { connect } from 'react-redux'
import { Redirect, Route } from 'react-router-dom'
import authService from '../services/authService'
// import { useEffect } from 'react'

// import { setUserFromLocalStorage } from '../reducers/loginReducer'

const PrivateRoute = ({ user, component: Component, ...rest }) => {

	const isLoggedInMK1 = authService.isLoggedIn()
	// const isLoggedIn = true

	/*
	useEffect(() => {
		console.log('Private route effect 111111111111111', isLoggedInMK1)
	}, [isLoggedInMK1])*/

	return (
		<Route
			{...rest}
			render={props =>
				isLoggedInMK1 ? (
					<Component {...props} />
				) : (
					<Redirect to={{ pathname: '/login', state: { from: props.location } }} />
				)
			}
		/>
	)
}

const mapStateToProps = (state) => {
	return {
		user: state.user
	}
}
/*
const mapDispatchToProps = {
	setUserFromLocalStorage
}*/

export default connect (
	mapStateToProps,
	// mapDispatchToProps
)(PrivateRoute)
