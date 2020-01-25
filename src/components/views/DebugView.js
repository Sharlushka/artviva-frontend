import React from 'react'
import { connect } from 'react-redux'
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
		<Container style={borderPink}>
			<Row className="d-flex justify-content-center align-items-center" style={borderBlue}>
				<Col xs={12} style={borderGreen}>
					<h1>Debug!</h1>
					<Image src="img/schoolLogo-transparent.png" style={respStyle}/>
					<p>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
						incididunt ut labore et dolore magna aliqua. Quisque sagittis purus sit amet.
						Mauris vitae ultricies leo integer. Accumsan lacus vel facilisis volutpat est
						velit egestas dui. Metus dictum at tempor commodo ullamcorper a lacus. Arcu
						bibendum at varius vel pharetra vel turpis nunc. Enim facilisis gravida neque
						convallis a cras semper auctor neque. Nibh tortor id aliquet lectus proin nibh.
						Mauris vitae ultricies leo integer malesuada nunc. Augue neque gravida in
						fermentum et sollicitudin ac orci phasellus. Ultrices neque ornare aenean
						euismod elementum nisi quis eleifend. Sem fringilla ut morbi tincidunt augue
						interdum. Vitae auctor eu augue ut lectus arcu bibendum at varius. Commodo quis
						imperdiet massa tincidunt nunc pulvinar sapien et. Enim neque volutpat ac
						tincidunt vitae semper quis lectus. Vulputate enim nulla aliquet porttitor
						lacus luctus accumsan tortor. Netus et malesuada fames ac turpis egestas
						maecenas pharetra. Duis ut diam quam nulla porttitor massa id.
					</p>
				</Col>
			</Row>
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
