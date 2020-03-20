import React from 'react'
import { connect } from 'react-redux'
import { Container, Row, Col } from 'react-bootstrap'
import * as data from '../../data/teachers.json'
import TeacherCard from '../teachers/TeacherCard'
import DepartmentsAccordion from '../teachers/DepartmentsAccordion'

const TeachersView = () => {
	const { administration, departments } = data

	return (
		<Container className="pt-5">
			<h3 className="text-center custom-font pt-4 pb-2">
				Адміністрація
			</h3>
			<Row className="p-2 d-flex justify-content-center">
				<Col xs={12} className="p-0">
					{administration.map(person =>
						<TeacherCard key={person.id} person={person} />
					)}
				</Col>
				<h3 className="text-center custom-font pt-4 pb-2">
					Наші вчітели
				</h3>
				<Col xs={12} className="p-0">
					<DepartmentsAccordion departments={departments}/>
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
