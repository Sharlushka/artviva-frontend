import React from 'react'
import { connect } from 'react-redux'
import { FacebookProvider, Page } from 'react-facebook'
import { Container, Row, Col, Image } from 'react-bootstrap'


const DebugView = () => {

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
	}

	return (
		<Container className="p-0">
			<h1 className="custom-font py-3 m-0">Наш Фейсбук</h1>
			<FacebookProvider appId="2185912735037143">
				<Page href="https://www.facebook.com/myz.shpytky" tabs="timeline"
					width="500"
					height="520"
					small-header="true"
					adapt-container-width="true"
					hide-cover="true"
					show-facepile="false"
				/>
			</FacebookProvider>
		</Container>
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
