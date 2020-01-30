import React from 'react'
import { connect } from 'react-redux'
import { Container, Row, Col, Image } from 'react-bootstrap'


const ContactsView = () => {

	const respStyle = {
		height:'auto',
		width:'100%',
		maxWidth: '500px'
	}

	return (
		<Container className="text-center">
			<h1 className="custom-font py-3">Контакти</h1>
			<Row className="p-0 d-flex justify-content-center">
				<Col xs={12} md={6} className="p-0">
					<Image
						src="img/map.png"
						style={respStyle}
					/>
				</Col>
				<Col xs={12} md={6}className="p-0 text-left d-flex justify-content-center align-items-center">
					<ul className="contacts-list">
						<li>08122, Київська обл.,</li>
						<li>Києво-Святошинський район,</li>
						<li>село Шпитьки,</li>
						<li>вулиця Господарська,</li>
						<li>будинок 3</li>
						<li>+38(044)555-55-55</li>
						<li>
							<a href="mailto:info@artviva.school?subject=Лист з сайту школи">info@artviva.school</a>
						</li>
					</ul>
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
)(ContactsView)
