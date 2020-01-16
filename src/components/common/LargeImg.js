import React from 'react'
import { Container, Row, Col, Image } from 'react-bootstrap'

const LargeImg = () => {
	const respStyle = {
		height:'auto',
		width:'100%'
	}
	return (
		<Container fluid className="mx-0">
			<Row>
				<Col className="p-0 m-0">
					<Image src="img/mainSchool.jpg" style={respStyle}/>
				</Col>
			</Row>
		</Container>
	)
}

export default LargeImg
