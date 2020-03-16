import React from 'react'
import { connect } from 'react-redux'
import { Container, Row, Col, Tabs, Tab, ListGroup } from 'react-bootstrap'

const ProfileView = ({ user }) => {
	console.log('Profile')
	return (
		<>
			<h1 className="pt-5">Profile</h1>
			{ user ?
				<Container className="pt-4">
					<Row className="pt-4">
						<Col xs={12}>
							<h1 className="text-center custom-font py-4">
								Ваш профіль, {user.name}.
							</h1>
							<Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
								<Tab eventKey="profile" title="Профіль" className="profile-tab">
									<ListGroup variant="flush">

										<ListGroup.Item>
											{user.name} {user.middlename} {user.lastname}
										</ListGroup.Item>
										<ListGroup.Item>
											{user.email}
										</ListGroup.Item>
										<ListGroup.Item>
											{user.id}
										</ListGroup.Item>
									</ListGroup>
								</Tab>
								<Tab eventKey="contact" title="Contact">
									<p>
										Something Something
									</p>
								</Tab>
							</Tabs>
						</Col>
					</Row>
				</Container>
				: null
			}
		</>
	)
}

const mapStateToProps = (state) => {
	return {
		user: state.user
	}
}

export default connect(
	mapStateToProps
)(ProfileView)
