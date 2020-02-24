import React from 'react'
import { connect } from 'react-redux'
import { Container, Row, Col } from 'react-bootstrap'
import * as data from '../../data/teachers.json'
import TeacherCard from '../common/TeacherCard.jsx'

const TeachersView = () => {
	const { teachers } = data

	return (
		<Container className="pt-5">
			<h1 className="text-center custom-font pt-4 pb-2">
				Наші вчітели
			</h1>
			<Row className="p-2 d-flex justify-content-center">
				<Col xs={12} sm={10} className="p-0">
					{teachers.map(teacher =>
						<TeacherCard key={teacher.id} teacher={teacher} />
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
