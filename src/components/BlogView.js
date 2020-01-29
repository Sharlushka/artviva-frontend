import React from 'react'
import { connect } from 'react-redux'
import { FacebookProvider, Page } from 'react-facebook'
import { Container } from 'react-bootstrap'

const BlogView = () => {
	const windowWidth = window.innerWidth

	return (
		<Container className="p-0 text-center">
			<h1 className="custom-font py-3 m-0">Наш Фейсбук</h1>
			<FacebookProvider appId="2185912735037143">
				<Page href="https://www.facebook.com/myz.shpytky" tabs="timeline"
					width={windowWidth} // max 500px
					height="700" // fullscreen desktop height
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
)(BlogView)
