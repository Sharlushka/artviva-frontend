import React from 'react'
import { connect } from 'react-redux'
// import { Container, Row, Col, Image } from 'react-bootstrap'

import MainViewCarousel from '../common/MainViewCarousel'

const DebugView = () => {
	/*
	const respStyle = {
		height:'auto',
		width:'50%',
		maxWidth: '20em',
		float: 'left'
	}

	const borderPink = {
		border: '1px solid pink'
	}

	const borderGreen = {
		border: '1px solid green'
	}

	const borderBlue = {
		border: '1px solid blue'
	}*/

	return (
		<MainViewCarousel />
	)
}

const mapStateToProps = (state) => {
	return {
		user: state.user
	}
}

export default connect(
	mapStateToProps
)(DebugView)
