import React from 'react'
import { connect } from 'react-redux'
import { Container, Row, Col, Card, Image } from 'react-bootstrap'
import { ReactComponent as FbIcon } from '../../svg/facebook.svg'
import * as data from '../../data/teachers.json'

const TeachersView = () => {
	const { teachers } = data

	return (
		<Container>
			<h1 className="text-center custom-font py-3">
				Наші вчітели
			</h1>
			<Row className="p-2 d-flex justify-content-center">
				<Col xs={12} sm={10} className="p-0">
					{teachers.map(teacher =>
						<Card key={teacher.image} className="my-4">
							<Card.Body>
								<Row className="d-flex align-items1-center">
									<Col xs={4} sm={2}>
										<Image
											src={`img/teachers/${teacher.image}`}
											className="teacher-avatar"
										/>
									</Col>
									<Col xs={8} sm={10}>
										<ul className="teacher-specs-list">
											<li>
												<strong className="custom-font">{teacher.name}</strong>
											</li>
											<li>
												<span className="text-muted">Освіта: </span>{teacher.education}
											</li>
											<li>
												<span className="text-muted">Викладання предметів: </span>{teacher.speciality}
											</li>
										</ul>
										{ teacher.social
											?
											teacher.social.map(social =>
												<a key={social.link} href={social.link}>
													<FbIcon className="teacher-social-icon" />
												</a>
											)
											: null
										}
									</Col>
								</Row>
							</Card.Body>
						</Card>
					)}
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
)(TeachersView)
